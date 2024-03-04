Explanation of file types
----------------------------
Each snippet file is accompanied by a `.json` file that holds a list of all snippet **titles**.
These JSON files tell the TreeView which snippets exist. 
The point is to conserve memory by avoiding loading in the entire `.code-snippets` files.

How to add a new snippet
----------------------------
    * Remember to prepend "CC3D: " to the title--but not the prefix--of your snippet. 
    * For Python/C++: 
        1. First, edit the files in the Twedit++ project on your computer.
        2. Next, run the script `autogen.py` to refresh the `.code-snippets` and `.json` files. 
    * For XML:
        1. Optional: Use a  VSCode extension to prettify JSON while you edit the following files.
        2. Add the snippet to the `xml-snippets.code-snippets` file.
        3. Add the title of the snippet to the `xml-tree.json` file.
