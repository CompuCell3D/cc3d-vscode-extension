import os
import json


jobs = [
    (
        './xml-source.xml',
        'snippets/xml-snippets.code-snippets'
    ),
]

for job in jobs:
    snippet_file_path = os.path.abspath(os.path.join(os.path.dirname(__file__),
                                                        job[0]))

    jsonData = {}
    counter = 1
    
    codeLog = []
    with open(job[0], 'r') as inFile:
        for line in inFile:
            if len(line.strip()) < 1:
                if codeLog:
                
                    if '"' in codeLog[0]:
                        i = codeLog[0].index('"')
                        j = codeLog[0][i+1:].index('"') + i
                        pluginName = codeLog[0][i+1:j+1]
                    else:
                        i = codeLog[0].index('<')
                        j = codeLog[0].index('>')
                        pluginName = codeLog[0][i+1:j]
                    
                    if len(pluginName) < 2:
                        pluginName = "plugin" + str(counter)
                        print(codeLog[0], "was assigned an incorrect name:", pluginName)
                        counter += 1

                    jsonData[pluginName] = {
                        "prefix": pluginName,
                        "body": codeLog,
                        "description": ""
                    }
                    codeLog = []
            else:
                line = line.replace("\n", "")
                codeLog.append(line)

    with open(job[1], 'w') as outFile:
        json.dump(jsonData, outFile)
