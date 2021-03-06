/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { EXTENSION_IDENTIFIER_PATTERN, IExtensionGalleryService } from 'vs/platform/extensionManagement/common/extensionManagement';
import { IWorkspaceContextService, IWorkspaceFolder, IWorkspace, IWorkspaceFoldersChangeEvent } from 'vs/platform/workspace/common/workspace';
import { IFileService } from 'vs/platform/files/common/files';
import { distinct, flatten, coalesce } from 'vs/base/common/arrays';
import { ExtensionRecommendations, ExtensionRecommendation, PromptedExtensionRecommendations } from 'vs/workbench/contrib/extensions/browser/extensionRecommendations';
import { INotificationService } from 'vs/platform/notification/common/notification';
import { IExtensionsConfigContent, ExtensionRecommendationSource, ExtensionRecommendationReason } from 'vs/workbench/services/extensionManagement/common/extensionManagement';
import { parse } from 'vs/base/common/json';
import { EXTENSIONS_CONFIG } from 'vs/workbench/contrib/extensions/common/extensions';
import { ILogService } from 'vs/platform/log/common/log';
import { CancellationToken } from 'vs/base/common/cancellation';
import { localize } from 'vs/nls';
import { Emitter } from 'vs/base/common/event';

export class WorkspaceRecommendations extends ExtensionRecommendations {

	private _recommendations: ExtensionRecommendation[] = [];
	get recommendations(): ReadonlyArray<ExtensionRecommendation> { return this._recommendations; }

	private _onDidChangeRecommendations = this._register(new Emitter<void>());
	readonly onDidChangeRecommendations = this._onDidChangeRecommendations.event;

	private _ignoredRecommendations: string[] = [];
	get ignoredRecommendations(): ReadonlyArray<string> { return this._ignoredRecommendations; }

	constructor(
		promptedExtensionRecommendations: PromptedExtensionRecommendations,
		@IWorkspaceContextService private readonly contextService: IWorkspaceContextService,
		@IExtensionGalleryService private readonly galleryService: IExtensionGalleryService,
		@ILogService private readonly logService: ILogService,
		@IFileService private readonly fileService: IFileService,
		@INotificationService private readonly notificationService: INotificationService,
	) {
		super(promptedExtensionRecommendations);
	}

	protected async doActivate(): Promise<void> {
		await this.fetch();
		this._register(this.contextService.onDidChangeWorkspaceFolders(e => this.onWorkspaceFoldersChanged(e)));
	}

	/**
	 * Parse all extensions.json files, fetch workspace recommendations, filter out invalid and unwanted ones
	 */
	private async fetch(): Promise<void> {

		const extensionsConfigBySource = await this.fetchExtensionsConfigBySource();

		const { invalidRecommendations, message } = await this.validateExtensions(extensionsConfigBySource.map(({ contents }) => contents));
		if (invalidRecommendations.length) {
			this.notificationService.warn(`The ${invalidRecommendations.length} extension(s) below, in workspace recommendations have issues:\n${message}`);
		}

		this._ignoredRecommendations = [];

		for (const extensionsConfig of extensionsConfigBySource) {
			for (const unwantedRecommendation of extensionsConfig.contents.unwantedRecommendations) {
				if (invalidRecommendations.indexOf(unwantedRecommendation) === -1) {
					this._ignoredRecommendations.push(unwantedRecommendation);
				}
			}
			for (const extensionId of extensionsConfig.contents.recommendations) {
				if (invalidRecommendations.indexOf(extensionId) === -1) {
					this._recommendations.push({
						extensionId,
						source: extensionsConfig.source,
						reason: {
							reasonId: ExtensionRecommendationReason.Workspace,
							reasonText: localize('workspaceRecommendation', "This extension is recommended by users of the current workspace.")
						}
					});
				}
			}
		}
	}

	private async fetchExtensionsConfigBySource(): Promise<{ contents: IExtensionsConfigContent, source: ExtensionRecommendationSource }[]> {
		const workspace = this.contextService.getWorkspace();
		const result = await Promise.all([
			this.resolveWorkspaceExtensionConfig(workspace),
			...workspace.folders.map(workspaceFolder => this.resolveWorkspaceFolderExtensionConfig(workspaceFolder))
		]);
		return coalesce(result);
	}

	private async resolveWorkspaceExtensionConfig(workspace: IWorkspace): Promise<{ contents: IExtensionsConfigContent, source: ExtensionRecommendationSource } | null> {
		try {
			if (workspace.configuration) {
				const content = await this.fileService.readFile(workspace.configuration);
				const extensionsConfigContent = <IExtensionsConfigContent | undefined>parse(content.value.toString())['extensions'];
				const contents = this.parseExtensionConfig(extensionsConfigContent);
				if (contents) {
					return { contents, source: workspace };
				}
			}
		} catch (e) { /* Ignore */ }
		return null;
	}

	private async resolveWorkspaceFolderExtensionConfig(workspaceFolder: IWorkspaceFolder): Promise<{ contents: IExtensionsConfigContent, source: ExtensionRecommendationSource } | null> {
		try {
			const content = await this.fileService.readFile(workspaceFolder.toResource(EXTENSIONS_CONFIG));
			const extensionsConfigContent = <IExtensionsConfigContent>parse(content.value.toString());
			const contents = this.parseExtensionConfig(extensionsConfigContent);
			if (contents) {
				return { contents, source: workspaceFolder };
			}
		} catch (e) { /* ignore */ }
		return null;
	}

	private async validateExtensions(contents: IExtensionsConfigContent[]): Promise<{ validRecommendations: string[], invalidRecommendations: string[], message: string }> {

		const validExtensions: string[] = [];
		const invalidExtensions: string[] = [];
		const extensionsToQuery: string[] = [];
		let message = '';

		const allRecommendations = distinct(flatten(contents.map(({ recommendations }) => recommendations || [])));
		const regEx = new RegExp(EXTENSION_IDENTIFIER_PATTERN);
		for (const extensionId of allRecommendations) {
			if (regEx.test(extensionId)) {
				extensionsToQuery.push(extensionId);
			} else {
				invalidExtensions.push(extensionId);
				message += `${extensionId} (bad format) Expected: <provider>.<name>\n`;
			}
		}

		if (extensionsToQuery.length) {
			try {
				const queryResult = await this.galleryService.query({ names: extensionsToQuery, pageSize: extensionsToQuery.length }, CancellationToken.None);
				const extensions = queryResult.firstPage.map(extension => extension.identifier.id.toLowerCase());

				for (const extensionId of extensionsToQuery) {
					if (extensions.indexOf(extensionId) === -1) {
						invalidExtensions.push(extensionId);
						message += `${extensionId} (not found in marketplace)\n`;
					} else {
						validExtensions.push(extensionId);
					}
				}

			} catch (e) {
				this.logService.warn('Error querying extensions gallery', e);
			}
		}

		return { validRecommendations: validExtensions, invalidRecommendations: invalidExtensions, message };
	}

	private async onWorkspaceFoldersChanged(event: IWorkspaceFoldersChangeEvent): Promise<void> {
		if (event.added.length) {
			const oldWorkspaceRecommended = this._recommendations;
			await this.fetch();
			// Suggest only if at least one of the newly added recommendations was not suggested before
			if (this._recommendations.some(current => oldWorkspaceRecommended.every(old => current.extensionId !== old.extensionId))) {
				this._onDidChangeRecommendations.fire();
			}
		}
	}

	private parseExtensionConfig(extensionsConfigContent: IExtensionsConfigContent | undefined): IExtensionsConfigContent | null {
		if (extensionsConfigContent) {
			return {
				recommendations: distinct((extensionsConfigContent.recommendations || []).map(e => e.toLowerCase())),
				unwantedRecommendations: distinct((extensionsConfigContent.unwantedRecommendations || []).map(e => e.toLowerCase()))
			};
		}
		return null;
	}

}

