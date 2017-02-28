import pandas as pd

allData = pd.read_csv("ml_data_1.csv")
srcFile = "petiIdk1.csv"
targetFile = "peti_test_data_1.csv"

data = pd.read_csv(srcFile, header=None, names=['UniProtID'])
data = data.merge(allData, on='UniProtID')
data.to_csv(targetFile, index=False)
