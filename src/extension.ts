'use strict';

import * as vscode from 'vscode';

import { SnippetView } from './snippetView';

export function activate(context: vscode.ExtensionContext) {
	// const rootPath = (vscode.workspace.workspaceFolders && (vscode.workspace.workspaceFolders.length > 0))
	// 	? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;

	new SnippetView(context);
	vscode.commands.registerCommand('snippetView.insertCode', (node) => {
		vscode.window.showInformationMessage(`Successfully called edit entry on ${node}.`);
		console.log(`Successfully called edit entry on`,node)
	});
}