import * as vscode from 'vscode';
import * as xmlTree from "./snippets/xml-tree.json";
import * as cppTree from "./snippets/cpp-tree.json";
import * as pythonTree from "./snippets/python-tree.json";

export class SnippetView {
    constructor(context: vscode.ExtensionContext) {
        const view = vscode.window.createTreeView('snippetView', { treeDataProvider: new TreeDataProvider(), showCollapseAll: true });
        context.subscriptions.push(view);
    }
}


class TreeItem extends vscode.TreeItem {
    children: TreeItem[]|undefined;
  
    constructor(label: string, children?: TreeItem[]) {
      super(
          label,
          children == null ? vscode.TreeItemCollapsibleState.None :
                                   vscode.TreeItemCollapsibleState.Expanded);
      this.children = children;
      //If this is a leaf node, then `snippetItem`
      //indicates that there should be an icon/button for that item.
      this.contextValue = children == null ? 'snippetItem' : 'treeMenu';

      this.command = {
        command: "snippetView.selectNode",
        title: "Select Node",
        arguments: [label],
      };
    }
}

function createTreeFromJson(jsonData: any, rootLabel: string) {
	var mainChildren: TreeItem[] = [];
	for (const [key, value] of Object.entries(xmlTree)) {
		var children: TreeItem[] = [];
		for (var name of Object.keys(value)) {
			children.push(new TreeItem(name));
		}

		mainChildren.push(new TreeItem(key, children));
	}; 
	return new TreeItem(rootLabel, mainChildren);
}

class TreeDataProvider implements vscode.TreeDataProvider<TreeItem> {
    onDidChangeTreeData?: vscode.Event<TreeItem|null|undefined>|undefined;
  
    treeData: TreeItem[];
  
    constructor() {
        this.treeData = [];
        
        this.treeData = [new TreeItem('Code Snippets', [
			createTreeFromJson(cppTree, 'CC3D C++'),
			createTreeFromJson(xmlTree, 'CC3DML'),
			createTreeFromJson(pythonTree, 'CC3D Python'),
		])];

    }
  
    getTreeItem(element: TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
      return element;
    }
  
    getChildren(element?: TreeItem|undefined): vscode.ProviderResult<TreeItem[]> {
      if (element === undefined) {
        return this.treeData;
      }
      return element.children;
    }
}