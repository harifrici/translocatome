import pandas as pd
import numpy as np

a = pd.read_csv("annotation.csv")
learnprot = pd.read_csv("learning_proteins.csv", sep=';', header=None);

#b = pd.read_csv("network_output.csv")
#merged = a.merge(b, on='UniProtID')
#merged.to_csv("ml_data.csv", index=False)

a = a.replace(np.nan,'noData', regex=True)
learnprot = learnprot[0]
learnData = a.loc[a["UniProtID"].isin(learnprot)]

learnFunctions = learnData["function"]
learnFunctions = learnFunctions.str.split("///").tolist()
learnFunctions = list(set([val for sublist in learnFunctions for val in sublist]))

learnProcess = learnData["process"]
learnProcess = learnProcess.str.split("///").tolist()
learnProcess = list(set([val for sublist in learnProcess for val in sublist]))

learnComponents = learnData["component"]
learnComponents = learnComponents.str.split("///").tolist()
learnComponents = list(set([val for sublist in learnComponents for val in sublist]))

df = a["UniProtID"]

def removeNeedlesFunctions(row):
    row = filter(lambda x: x in learnFunctions, row)
    if (len(row) == 0): row = ['noData']
    return row

def removeNeedlesProcesses(row):
    row = filter(lambda x: x in learnProcess, row)
    if (len(row) == 0): row = ['noData']
    return row

def removeNeedlesComponents(row):
    row = filter(lambda x: x in learnComponents, row)
    if (len(row) == 0): row = ['noData']
    return row

def getAnnotLengths(row):
    return len(row)


c = a["process"]
c = c.str.split("///")
df['process_count'] = c.apply(getAnnotLengths)
c = c.apply(removeNeedlesProcesses)
c = pd.get_dummies(c.apply(pd.Series).stack()).sum(level=0)
df = pd.concat([df, c], axis=1);

c = a["function"]
c = c.str.split("///")
df['function_count'] = c.apply(getAnnotLengths)
c = c.apply(removeNeedlesFunctions)
c = pd.get_dummies(c.apply(pd.Series).stack()).sum(level=0)
df = pd.concat([df, c], axis=1);

c = a["component"]
c = c.str.split("///")
df['component_count'] = c.apply(getAnnotLengths)
c = c.apply(removeNeedlesComponents)
c = pd.get_dummies(c.apply(pd.Series).stack()).sum(level=0)
df = pd.concat([df, c], axis=1);

#df = df.replace(np.nan,'noData', regex=True)
df.to_csv("clean_annot.csv", index=False)
