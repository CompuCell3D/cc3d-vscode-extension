'use strict';

import * as vscode from 'vscode';

import { SnippetView } from './snippetView';

const ZERO_DATE = new Date(0);
var doubleClickAction: string = "";
var doubleClickStartDate: Date = ZERO_DATE;


async function pasteSnippet(snippetText: string) {
    try {
        var langId = vscode.window.activeTextEditor?.document.languageId;
        var snippetName:string = "CC3D: " + snippetText;
        await vscode.commands.executeCommand("editor.action.insertSnippet", { "langId": langId, "name": snippetName});
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
        //Is it a double click?
        var now: Date = new Date();
        if (now.getTime() - doubleClickStartDate.getTime() < 500) {
            if (doubleClickAction === label) { //ensure they didn't click on multiple things
                pasteSnippet(label);
                doubleClickStartDate = ZERO_DATE;
            }
        }
        else {
            doubleClickStartDate = now;
            doubleClickAction = label;
        }
    });
}