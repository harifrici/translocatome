import pandas as pd

allData = pd.read_csv("ml_data_1.csv")
learnprot = pd.read_csv("learning_proteins.csv", sep=';', header=None, names=['UniProtID', 'class'])

learnprotUni = learnprot['UniProtID']
trainingData = allData.loc[allData["UniProtID"].isin(learnprotUni)]

trainingDataWithClass = trainingData.merge(learnprot, on='UniProtID');

trainingDataWithClass.to_csv("ml_training_data.csv", index=False)

test_data = pd.read_csv("test_data_uni.csv", header=None, names=['UniProtID'])
test_data = test_data.merge(allData, on='UniProtID')
test_data.to_csv("test_data.csv", index=False)
