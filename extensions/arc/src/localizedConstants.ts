/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as nls from 'vscode-nls';
import { getErrorMessage } from './common/utils';
const localize = nls.loadMessageBundle();

export const arcDeploymentDeprecation = localize('arc.arcDeploymentDeprecation', "The Arc Deployment extension has been replaced by the Arc extension and has been uninstalled.");
export function arcControllerDashboard(name: string): string { return localize('arc.controllerDashboard', "Azure Arc Data Controller Dashboard (Preview) - {0}", name); }
export function miaaDashboard(name: string): string { return localize('arc.miaaDashboard', "SQL managed instance - Azure Arc Dashboard (Preview) - {0}", name); }
export function postgresDashboard(name: string): string { return localize('arc.postgresDashboard', "PostgreSQL Hyperscale - Azure Arc Dashboard (Preview) - {0}", name); }

export const dataControllersType = localize('arc.dataControllersType', "Azure Arc Data Controller");
export const pgSqlType = localize('arc.pgSqlType', "PostgreSQL Hyperscale - Azure Arc");
export const miaaType = localize('arc.miaaType', "SQL managed instance - Azure Arc");

export const overview = localize('arc.overview', "Overview");
export const connectionStrings = localize('arc.connectionStrings', "Connection Strings");
export const networking = localize('arc.networking', "Networking");
export const properties = localize('arc.properties', "Properties");
export const settings = localize('arc.settings', "Settings");
export const security = localize('arc.security', "Security");
export const computeAndStorage = localize('arc.computeAndStorage', "Compute + Storage");
export const compute = localize('arc.compute', "Compute");
export const backup = localize('arc.backup', "Backup");
export const newSupportRequest = localize('arc.newSupportRequest', "New support request");
export const diagnoseAndSolveProblems = localize('arc.diagnoseAndSolveProblems', "Diagnose and solve problems");
export const supportAndTroubleshooting = localize('arc.supportAndTroubleshooting', "Support + troubleshooting");
export const resourceHealth = localize('arc.resourceHealth', "Resource health");

export const newInstance = localize('arc.createNew', "New Instance");
export const deleteText = localize('arc.delete', "Delete");
export const resetPassword = localize('arc.resetPassword', "Reset Password");
export const openInAzurePortal = localize('arc.openInAzurePortal', "Open in Azure Portal");
export const resourceGroup = localize('arc.resourceGroup', "Resource Group");
export const region = localize('arc.region', "Region");
export const subscriptionId = localize('arc.subscriptionId', "Subscription ID");
export const state = localize('arc.state', "State");
export const connectionMode = localize('arc.connectionMode', "Connection Mode");
export const namespace = localize('arc.namespace', "Namespace");
export const externalEndpoint = localize('arc.externalEndpoint', "External Endpoint");
export const name = localize('arc.name', "Name");
export const type = localize('arc.type', "Type");
export const status = localize('arc.status', "Status");
export const miaaAdmin = localize('arc.miaaAdmin', "Managed instance admin");
export const controllerEndpoint = localize('arc.controllerEndpoint', "Controller endpoint");
export const dataController = localize('arc.dataController', "Data controller");
export const kibanaDashboard = localize('arc.kibanaDashboard', "Kibana Dashboard");
export const grafanaDashboard = localize('arc.grafanaDashboard', "Grafana Dashboard");
export const kibanaDashboardDescription = localize('arc.kibanaDashboardDescription', "Dashboard for viewing logs");
export const grafanaDashboardDescription = localize('arc.grafanaDashboardDescription', "Dashboard for viewing metrics");
export const serviceEndpoints = localize('arc.serviceEndpoints', "Service endpoints");
export const databases = localize('arc.databases', "Databases");
export const endpoint = localize('arc.endpoint', "Endpoint");
export const description = localize('arc.description', "Description");
export const yes = localize('arc.yes', "Yes");
export const no = localize('arc.no', "No");
export const feedback = localize('arc.feedback', "Feedback");
export const selectConnectionString = localize('arc.selectConnectionString', "Select from available client connection strings below.");
export const vCores = localize('arc.vCores', "vCores");
export const ram = localize('arc.ram', "RAM");
export const refresh = localize('arc.refresh', "Refresh");
export const troubleshoot = localize('arc.troubleshoot', "Troubleshoot");
export const clickTheNewSupportRequestButton = localize('arc.clickTheNewSupportRequestButton', "Click the new support request button to file a support request in the Azure Portal.");
export const running = localize('arc.running', "Running");
export const pending = localize('arc.pending', "Pending");
export const failed = localize('arc.failed', "Failed");
export const unknown = localize('arc.unknown', "Unknown");
export const direct = localize('arc.direct', "Direct");
export const indirect = localize('arc.indirect', "Indirect");
export const loading = localize('arc.loading', "Loading...");
export const refreshToEnterCredentials = localize('arc.refreshToEnterCredentials', "Refresh node to enter credentials");
export const noInstancesAvailable = localize('arc.noInstancesAvailable', "No instances available");
export const connectToController = localize('arc.connectToController', "Connect to Existing Controller");
export function connectToSql(name: string): string { return localize('arc.connectToSql', "Connect to SQL managed instance - Azure Arc ({0})", name); }
export const passwordToController = localize('arc.passwordToController', "Provide Password to Controller");
export const controllerUrl = localize('arc.controllerUrl', "Controller URL");
export const serverEndpoint = localize('arc.serverEndpoint', "Server Endpoint");
export const controllerName = localize('arc.controllerName', "Name");
export const defaultControllerName = localize('arc.defaultControllerName', "arc-dc");
export const username = localize('arc.username', "Username");
export const password = localize('arc.password', "Password");
export const rememberPassword = localize('arc.rememberPassword', "Remember Password");
export const connect = localize('arc.connect', "Connect");
export const cancel = localize('arc.cancel', "Cancel");
export const ok = localize('arc.ok', "Ok");
export const notConfigured = localize('arc.notConfigured', "Not Configured");

// Database States - see https://docs.microsoft.com/sql/relational-databases/databases/database-states
export const online = localize('arc.online', "Online");
export const offline = localize('arc.offline', "Offline");
export const restoring = localize('arc.restoring', "Restoring");
export const recovering = localize('arc.recovering', "Recovering");
export const recoveryPending = localize('arc.recoveringPending', "Recovery Pending");
export const suspect = localize('arc.suspect', "Suspect");
export const emergency = localize('arc.emergency', "Emergency");

// Postgres constants
export const coordinatorEndpoint = localize('arc.coordinatorEndpoint', "Coordinator endpoint");
export const postgresAdminUsername = localize('arc.postgresAdminUsername', "Admin username");
export const nodeConfiguration = localize('arc.nodeConfiguration', "Node configuration");
export const postgresVersion = localize('arc.postgresVersion', "PostgreSQL version");
export const serverGroupType = localize('arc.serverGroupType', "Server group type");
export const serverGroupNodes = localize('arc.serverGroupNodes', "Server group nodes");
export const fullyQualifiedDomain = localize('arc.fullyQualifiedDomain', "Fully qualified domain");
export const postgresArcProductName = localize('arc.postgresArcProductName', "Azure Database for PostgreSQL - Azure Arc");
export const coordinator = localize('arc.coordinator', "Coordinator");
export const worker = localize('arc.worker', "Worker");
export const monitor = localize('arc.monitor', "Monitor");
export const newDatabase = localize('arc.newDatabase', "New Database");
export const databaseName = localize('arc.databaseName', "Database name");
export const enterNewPassword = localize('arc.enterNewPassword', "Enter a new password");
export const confirmNewPassword = localize('arc.confirmNewPassword', "Confirm the new password");
export const learnAboutPostgresClients = localize('arc.learnAboutPostgresClients', "Learn more about Azure PostgreSQL Hyperscale client interfaces");
export const node = localize('arc.node', "node");
export const nodes = localize('arc.nodes', "nodes");
export const storagePerNode = localize('arc.storagePerNode', "storage per node");
export const arcResources = localize('arc.arcResources', "Azure Arc Resources");
export const enterANonEmptyPassword = localize('arc.enterANonEmptyPassword', "Enter a non empty password or press escape to exit.");
export const thePasswordsDoNotMatch = localize('arc.thePasswordsDoNotMatch', "The passwords do not match. Confirm the password or press escape to exit.");
export const passwordReset = localize('arc.passwordReset', "Password reset successfully");
export const podOverview = localize('arc.podOverview', "Pod overview");
export const condition = localize('arc.condition', "Condition");
export const details = localize('arc.details', "Details");
export const lastUpdated = localize('arc.lastUpdated', "Last updated");
export const noExternalEndpoint = localize('arc.noExternalEndpoint', "No External Endpoint has been configured so this information isn't available.");
export const podsReady = localize('arc.podsReady', "pods ready");

export function databaseCreated(name: string): string { return localize('arc.databaseCreated', "Database {0} created", name); }
export function deletingInstance(name: string): string { return localize('arc.deletingInstance', "Deleting instance '{0}'...", name); }
export function instanceDeleted(name: string): string { return localize('arc.instanceDeleted', "Instance '{0}' deleted", name); }
export function copiedToClipboard(name: string): string { return localize('arc.copiedToClipboard', "{0} copied to clipboard", name); }
export function clickTheTroubleshootButton(resourceType: string): string { return localize('arc.clickTheTroubleshootButton', "Click the troubleshoot button to open the Azure Arc {0} troubleshooting notebook.", resourceType); }
export function numVCores(vCores: string | undefined): string {
	if (vCores && +vCores > 0) {
		if (+vCores === 1) {
			return localize('arc.numVCore', "{0} vCore", vCores);
		} else {
			return localize('arc.numVCores', "{0} vCores", vCores);
		}
	} else {
		return '-';
	}
}
export function updated(when: string): string { return localize('arc.updated', "Updated {0}", when); }

// Errors
export const connectionRequired = localize('arc.connectionRequired', "A connection is required to show all properties. Click refresh to re-enter connection information");
export const couldNotFindControllerRegistration = localize('arc.couldNotFindControllerRegistration', "Could not find controller registration.");
export function refreshFailed(error: any): string { return localize('arc.refreshFailed', "Refresh failed. {0}", getErrorMessage(error)); }
export function openDashboardFailed(error: any): string { return localize('arc.openDashboardFailed', "Error opening dashboard. {0}", getErrorMessage(error)); }
export function instanceDeletionFailed(name: string, error: any): string { return localize('arc.instanceDeletionFailed', "Failed to delete instance {0}. {1}", name, getErrorMessage(error)); }
export function databaseCreationFailed(name: string, error: any): string { return localize('arc.databaseCreationFailed', "Failed to create database {0}. {1}", name, getErrorMessage(error)); }
export function connectToControllerFailed(url: string, error: any): string { return localize('arc.connectToControllerFailed', "Could not connect to controller {0}. {1}", url, getErrorMessage(error)); }
export function connectToSqlFailed(serverName: string, error: any): string { return localize('arc.connectToSqlFailed', "Could not connect to SQL managed instance - Azure Arc Instance {0}. {1}", serverName, getErrorMessage(error)); }
export function fetchConfigFailed(name: string, error: any): string { return localize('arc.fetchConfigFailed', "An unexpected error occurred retrieving the config for '{0}'. {1}", name, getErrorMessage(error)); }
export function fetchEndpointsFailed(name: string, error: any): string { return localize('arc.fetchEndpointsFailed', "An unexpected error occurred retrieving the endpoints for '{0}'. {1}", name, getErrorMessage(error)); }
export function fetchRegistrationsFailed(name: string, error: any): string { return localize('arc.fetchRegistrationsFailed', "An unexpected error occurred retrieving the registrations for '{0}'. {1}", name, getErrorMessage(error)); }
export function fetchDatabasesFailed(name: string, error: any): string { return localize('arc.fetchDatabasesFailed', "An unexpected error occurred retrieving the databases for '{0}'. {1}", name, getErrorMessage(error)); }
export function instanceDeletionWarning(name: string): string { return localize('arc.instanceDeletionWarning', "Warning! Deleting an instance is permanent and cannot be undone. To delete the instance '{0}' type the name '{0}' below to proceed.", name); }
export function invalidInstanceDeletionName(name: string): string { return localize('arc.invalidInstanceDeletionName', "The value '{0}' does not match the instance name. Try again or press escape to exit", name); }
export function couldNotFindAzureResource(name: string): string { return localize('arc.couldNotFindAzureResource', "Could not find Azure resource for {0}", name); }
export function passwordResetFailed(error: any): string { return localize('arc.passwordResetFailed', "Failed to reset password. {0}", getErrorMessage(error)); }
export function errorConnectingToController(error: any): string { return localize('arc.errorConnectingToController', "Error connecting to controller. {0}", getErrorMessage(error, true)); }
export function passwordAcquisitionFailed(error: any): string { return localize('arc.passwordAcquisitionFailed', "Failed to acquire password. {0}", getErrorMessage(error)); }
export const invalidPassword = localize('arc.invalidPassword', "The password did not work, try again.");
export function errorVerifyingPassword(error: any): string { return localize('arc.errorVerifyingPassword', "Error encountered while verifying password. {0}", getErrorMessage(error)); }
export const onlyOneControllerSupported = localize('arc.onlyOneControllerSupported', "Only one controller connection is currently supported at this time. Do you wish to remove the existing connection and add a new one?");
