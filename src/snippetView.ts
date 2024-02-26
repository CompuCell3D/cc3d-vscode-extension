import * as vscode from 'vscode';
import * as xmlTree from "./snippets/xml-tree.json";

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

class TreeDataProvider implements vscode.TreeDataProvider<TreeItem> {
    onDidChangeTreeData?: vscode.Event<TreeItem|null|undefined>|undefined;
  
    treeData: TreeItem[];
  
    constructor() {
        this.treeData = [];
        for (const [key, value] of Object.entries(xmlTree)) {
            var children: TreeItem[] = [];
            for (var name of Object.keys(value)) {
                children.push(new TreeItem(name));
            }

            this.treeData.push(new TreeItem(key, children));
        };
        this.treeData = [new TreeItem('XML Plugins', this.treeData)]; //set root

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