"""
This file is not used during the extension runtime. 
Instead, it is used to compile snippets from the Twedit project into snippet files here. 
"""

import os

from SnippetMenuParser import SnippetMenuParser
import json


snippetDictionary = {}

psmp = SnippetMenuParser()

jobs = [
    (
        r'C:\Users\Pete\Documents\cc3d\cc3d-twedit5\cc3d\twedit5\Plugins\CC3DPythonHelper\Snippets.py.template',
        'src/snippets/python-snippets.code-snippets'
    ),
    (
        r'C:\Users\Pete\Documents\cc3d\cc3d-twedit5\cc3d\twedit5\Plugins\CC3DCPPHelper\Snippets.cpp.template',
        'src/snippets/cpp-snippets.code-snippets'
    )
]

for job in jobs:
    snippet_file_path = os.path.abspath(os.path.join(os.path.dirname(__file__),
                                                        job[0]))

    psmp.readSnippetMenu(snippet_file_path)

    snippet_menu_dict = psmp.getSnippetMenuDict()

    jsonData = {}
    for menuName, submenuDict in iter(sorted(snippet_menu_dict.items())):
        for subMenuName, snippet_tuple in iter(sorted(submenuDict.items())):
            if len(snippet_tuple) > 1:
                snippetName = "CC3D: " + subMenuName
                snippetCode = snippet_tuple[0].replace("$", "")
                jsonData[snippetName] = {
                    "prefix": subMenuName,
                    "body": snippetCode,
                    "description": subMenuName
                }
            else:
                print("Malformed snippet under", subMenuName)
            

    with open(job[1], 'w') as f:
        json.dump(jsonData, f)






jobs = [
    (
        r'C:\Users\Pete\Documents\cc3d\cc3d-twedit5\cc3d\twedit5\Plugins\CC3DPythonHelper\Snippets.py.template',
        'src/snippets/python-tree.json'
    ),
    (
        r'C:\Users\Pete\Documents\cc3d\cc3d-twedit5\cc3d\twedit5\Plugins\CC3DCPPHelper\Snippets.cpp.template',
        'src/snippets/cpp-tree.json'
    )
]

psmp = SnippetMenuParser()

for job in jobs:
    snippet_file_path = os.path.abspath(os.path.join(os.path.dirname(__file__),
                                                        job[0]))

    psmp.readSnippetMenu(snippet_file_path)

    snippet_menu_dict = psmp.getSnippetMenuDict()

    jsonData = {}
    for menuName, submenuDict in iter(sorted(snippet_menu_dict.items())):
        submenuJson = {}
        for subMenuName, snippet_tuple in iter(sorted(submenuDict.items())):
            submenuJson[subMenuName.strip()] = {}

        jsonData[menuName.strip()] = submenuJson
            

    with open(job[1], 'w') as f:
        json.dump(jsonData, f)