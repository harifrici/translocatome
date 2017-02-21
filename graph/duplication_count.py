import csv

#included_cols = [1] + range(3,5) # you can just merge two lists
interaction_list = dict()

with open('graph_input.csv', 'rb') as f:
    reader = csv.reader(f, delimiter=';')

    for row in reader: # skip header row
        if row[0] in interaction_list:
            if row[1] in interaction_list[row[0]]:
                print row[1] + "-" + row[0]
            interaction_list[row[0]].append(row[1])
        else:
            interaction_list[row[0]] = [row[1]]

        if row[1] in interaction_list:
            if row[0] in interaction_list[row[1]]:
                print row[1] + "-" + row[0]
            interaction_list[row[1]].append(row[1])
        else:
            interaction_list[row[1]] = [row[0]]

#print interaction_list
