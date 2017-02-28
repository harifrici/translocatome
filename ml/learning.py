import pandas as pd
from sklearn import tree
from sklearn.neighbors import KNeighborsClassifier
from sklearn.neural_network import MLPClassifier
from sklearn import svm
from sklearn.utils import shuffle
from sklearn.metrics import accuracy_score
from sklearn.metrics import classification_report
from sklearn.preprocessing import StandardScaler

fromFile = False
scaling = True

csvData = pd.read_csv('ml_training_data.csv')
clf = tree.DecisionTreeClassifier(criterion="entropy", min_samples_split=3, max_depth=6)
#clf = KNeighborsClassifier(n_neighbors=5)
#clf = MLPClassifier(solver='lbfgs', activation='logistic', alpha=1e-5, max_iter=500, hidden_layer_sizes=(100), random_state=1)
#clf = svm.SVC()
#clf = svm.NuSVC()
#clf = svm.LinearSVC()

if fromFile:
    testing_data = pd.read_csv('peti_test_data_1.csv')
    testing_names = testing_data['UniProtID']
    testing_data = testing_data.ix[:, testing_data.columns != 'UniProtID']

    df = csvData

    names = df['UniProtID']
    training_data = df.ix[:, df.columns != 'UniProtID']

    X = training_data.ix[:, training_data.columns != 'class']
    Y = training_data['class']

    if scaling:
        scaler = StandardScaler()
        scaler.fit(X)
        X = scaler.transform(X)
        testing_data = scaler.transform(testing_data)

    clf = clf.fit(X, Y)
    #print clf.tree_.max_depth
    result_proba = clf.predict_proba(testing_data)
    result = clf.predict(testing_data)

    print result
    print result_proba

    resultFrame = pd.Series(result).to_frame()
    resultFrame['name'] = testing_names
    resultFrame.to_csv("ml_result.csv", index=False)

else:
    n = 1000
    sumval = 0
    good = []
    bad = []
    for i in range(n):
        df = csvData
        df = shuffle(df)

        names = df['UniProtID']
        df = df.ix[:, df.columns != 'UniProtID']

        training_data = df.head(90)
        testing_data = df.tail(20)
        testing_classes = testing_data["class"].tolist()
        testing_data = testing_data.ix[:, testing_data.columns != 'class']

        X = training_data.ix[:, training_data.columns != 'class']
        Y = training_data['class']

        if scaling:
            scaler = StandardScaler()
            scaler.fit(X)
            X = scaler.transform(X)
            testing_data = scaler.transform(testing_data)

        clf = clf.fit(X, Y)

        # import pydotplus
        dot_data = tree.export_graphviz(clf, feature_names=df.columns, out_file='wnames.dot')
        dot_data = tree.export_graphviz(clf, out_file='wonames.dot')
        # graph = pydotplus.graph_from_dot_data(dot_data)
        # graph.write_pdf("iris.pdf")

        result = clf.predict(testing_data)
        score = accuracy_score(testing_classes, result)

        if score > 0.9:
            if df.columns[clf.tree_.feature[0]] not in good:
                good.append(df.columns[clf.tree_.feature[0]])
        if score < 0.7:
            if df.columns[clf.tree_.feature[0]] not in bad:
                bad.append(df.columns[clf.tree_.feature[0]])

        # target_names = ['class 0', 'class 1']
        # print(classification_report(testing_classes, result, target_names=target_names))

        sumval += score

    print sumval/n
    print good
    print bad
