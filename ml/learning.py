import pandas as pd
from sklearn import tree
from sklearn.utils import shuffle
from sklearn.metrics import accuracy_score
from sklearn.metrics import classification_report

csvData = pd.read_csv('ml_training_data.csv')
clf = tree.DecisionTreeClassifier(min_samples_split=3)
n = 1000
sumval = 0
for i in range(n):
    df = csvData
    df = shuffle(df)

    names = df['UniProtID']
    df = df.ix[:, df.columns != 'UniProtID']

    training_data = df.head(45)
    testing_data = df.tail(25)

    X = training_data.ix[:, training_data.columns != 'class']
    Y = training_data['class']

    clf = clf.fit(X, Y)

    # import pydotplus
    # dot_data = tree.export_graphviz(clf, feature_names=df.columns)
    # graph = pydotplus.graph_from_dot_data(dot_data)
    # graph.write_pdf("iris.pdf")


    # testing_data = pd.read_csv('test_data.csv')
    #testing_names = test_data['UniProtID']
    testing_classes = testing_data["class"].tolist()
    testing_data = testing_data.ix[:, testing_data.columns != 'class']

    result = clf.predict(testing_data)

    # target_names = ['class 0', 'class 1']
    # print(classification_report(testing_classes, result, target_names=target_names))

    sumval += accuracy_score(testing_classes, result)
    # resultFrame = pd.Series(result).to_frame()
    # resultFrame['name'] = test_names
    # resultFrame.to_csv("ml_result.csv", index=False)

print sumval/n
