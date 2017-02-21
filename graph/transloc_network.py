import networkx as nx
import csv

outputFile = open('output.csv', 'wb')
outputWriter = csv.writer(outputFile)
degrees = {}

G = nx.read_edgelist("graph_input.csv", delimiter=';', nodetype=str)

for e in G.nodes():
    degrees[e] = G.degree(e)

bc = nx.betweenness_centrality(G)
cc = nx.clustering(G)

outputWriter.writerow(["UniProtID", "degree", "betweenness_centrality", "clustering_coefficent"])
for key in bc:
    outputWriter.writerow([key, degrees[key], bc[key], cc[key]])


#nx.draw_spring(G)
#plt.show()
