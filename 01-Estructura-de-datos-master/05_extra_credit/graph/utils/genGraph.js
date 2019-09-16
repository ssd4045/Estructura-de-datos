/* global createArrIncrementedLetters getRandomInt graphDeepClone */

function graphGen (maxNeighbors, totalVertices) {
  var graph = {};
  var verticesArr = createArrIncrementedLetters(totalVertices);// ['a', 'b', 'c'... 'h']
  verticesArr.forEach((vertex) => {
    graph[vertex] = [];
  });// graph -> {a: [], b: [], c: [], ... h: []}
  var connectedGraph = connectAllVertices(graph, verticesArr, maxNeighbors); // connectedGraph -> {a: ['b', 'c', 'd', 'e'], b: ['f', 'g', 'h'], c: ['a'], d: ['a'], ... h: ['b']}
  var connectedGraphwithLoop = connectLeaves(connectedGraph); // connectedGraphwithLoop -> {a: ['b', 'c', 'd', 'e'], b: ['f', 'g', 'h'], c: ['a', 'd', 'h'], d: ['a', 'c', 'e'], ... h: ['b', 'g', 'b']}
  return connectedGraphwithLoop;
}

function connectAllVertices (graph, verticesToBranch, maxNeighbors) {
  // connectAllVertices returns a graph (variable 'connectedGraph' on line 9) that is "tree-like", with no loops!
  var newGraph = graphDeepClone(graph);
  var unexploredVertices = verticesToBranch.slice(1, verticesToBranch.length);
  var start = true;
  while (unexploredVertices.length) {
    var currentVertex = verticesToBranch.splice(0, 1)[0];
    var numNewNeighbors = start ? maxNeighbors : getRandomInt(2, maxNeighbors);//starts out max, but later in while loop it's random (between 2 and max)
    start = false;
    var neighbors = unexploredVertices.splice(0, numNewNeighbors);
    connectMultipleVertices(newGraph, currentVertex, neighbors);
  }
  return newGraph;
}

function connectTwoVertices (graph, first, second) {
  graph[first].push(second);
  graph[second].push(first);
}

function connectMultipleVertices (graph, vertex, neighbors) {
  neighbors.forEach(neighboringVertex => {
    connectTwoVertices(graph, vertex, neighboringVertex);
  });
}

function connectLeaves (graph) {
  // connectLeaves takes a graph returned from connectAllVertices, clones
  // it, and returns a new graph (variable 'connectedGraphwithLoop' on line 10)
  // with all the leaf vertices connected, making a single loop through all the
  // outermost vertices.  Vertices that were previously the leaf vertices go
  // from having 1 neighbor, to having 3 neighbors
  //
  // The loop is necessary to test whether a shortest paths function has been
  // optimized

  var newGraph = graphDeepClone(graph);
  var graphKeys = Object.keys(newGraph);
  var connectSwitch = false;
  var firstLeaf;
  for (var i = 0; i < graphKeys.length; i++) {
    var key = graphKeys[i];
    var nextkey = graphKeys[i + 1];
    if (newGraph[key].length === 1) {
      firstLeaf = key;
      connectSwitch = true;
    }
    if (connectSwitch) {
      if (i === graphKeys.length - 1) {
        var finalLeaf = key;
        connectTwoVertices(newGraph, finalLeaf, firstLeaf);
      } else {
        connectTwoVertices(newGraph, key, nextkey);
      }
    }
  }
  return newGraph;
}
