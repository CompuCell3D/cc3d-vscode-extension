import * as vscode from 'vscode';
import * as xmlTree from "./snippets/xml-tree.json";
import * as cppTree from "./snippets/cpp-tree.json";
import * as pythonTree from "./snippets/python-tree.json";

export class SnippetView {
    treeDataProvider: TreeDataProvider;

    constructor(context: vscode.ExtensionContext) {
        this.treeDataProvider = new TreeDataProvider();
        const view = vscode.window.createTreeView('snippetView', { treeDataProvider: this.treeDataProvider, showCollapseAll: true });
        context.subscriptions.push(view);

        // Handle the file type change as the user navigates between files
        vscode.window.onDidChangeActiveTextEditor((editor) => {
          if (editor) {
              const languageId = editor.document?.languageId;

              if (languageId === "python") {
                this.treeDataProvider.enablePython();
              }
              else if (languageId === "cpp") {
                this.treeDataProvider.enableCpp();
              }
              else if (languageId === "xml") {
                this.treeDataProvider.enableXml();
              }
          }
      });
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
	for (const [key, value] of Object.entries(jsonData)) {
    var valueAny: any = value; //prevents TypeScript compiler error
		var children: TreeItem[] = [];
		for (var name of Object.keys(valueAny)) {
			children.push(new TreeItem(name));
		}

		mainChildren.push(new TreeItem(key, children));
	}; 
	return new TreeItem(rootLabel, mainChildren);
}

class TreeDataProvider implements vscode.TreeDataProvider<TreeItem> {
    private changeEvent = new vscode.EventEmitter<void>();
    public get onDidChangeTreeData(): vscode.Event<void> {
      return this.changeEvent.event;
    }
    public refresh(): void {
      this.changeEvent.fire();
    }
    
    public enableCpp() {
      this.treeData = [createTreeFromJson(cppTree, 'CC3D C++')];
      this.refresh();
    }
    
    public enablePython() {
      this.treeData = [createTreeFromJson(pythonTree, 'CC3D Python')];
      this.refresh();
    }
    
    public enableXml() {
      this.treeData = [createTreeFromJson(xmlTree, 'CC3DML')];
      this.refresh();
    }

    treeData: TreeItem[];
  
    constructor() {
        this.treeData = [];
        
        // this.treeData = [new TreeItem('Code Snippets', [
        //   createTreeFromJson(cppTree, 'CC3D C++'),
        //   createTreeFromJson(xmlTree, 'CC3DML'),
        //   createTreeFromJson(pythonTree, 'CC3D Python'),
        // ])];
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