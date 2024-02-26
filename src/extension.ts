'use strict';

import * as vscode from 'vscode';

import { SnippetView } from './snippetView';

function pasteSnippet(snippetText: string) {
    try {
        const editor = vscode.window.activeTextEditor;
        editor?.edit(TextEditorEdit => {
            TextEditorEdit.insert(editor.selection.active, snippetText);
        });
    }
    catch {
        vscode.window.showInformationMessage(`Error: Couldn't paste that snippet.`);
    }
}

export function activate(context: vscode.ExtensionContext) {

    new SnippetView(context);
    vscode.commands.registerCommand('snippetView.insertCode', (node) => {
        pasteSnippet(node?.label);
    });
    vscode.commands.registerCommand("snippetView.selectNode", (label: string) => {
        pasteSnippet(label);
    });
}