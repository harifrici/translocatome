import pandas as pd

a = pd.read_csv("clean_annot.csv")
b = pd.read_csv("network_output.csv")
merged = a.merge(b, on='UniProtID')
merged.to_csv("ml_data_1.csv", index=False)
