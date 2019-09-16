// the `global pathExists` comment directive (on line 6) tells certain linters
// that these variables come from other files
// the `eslint-disable id-length` comment directive (on line 7) tells certain
// linters not to enforce maximum/minimum length variable names

/* global pathExists */
/* eslint-disable id-length */

describe('`pathExists`', function(){
  var binaryTree, generalTree, graph, graphWithCycles;

  // Your function, `pathExists`, must determine if a path exists between two nodes
  // in a tree or graph

  describe('given a binary tree', function(){
    beforeEach(function(){
      /*        Binary Tree

                      +-+
                      |A|
                      +-+
                       |
                 +-----+-----+
                 |           |
                 v           v
                +-+         +-+
                |B|         |C|
                +-+         +-+
                 |           |
              +--+--+     +--+---+
              |     |     |      |
              v     v     v      v
             +-+   +-+   +-+    +-+
             |D|   |E|   |F|    |G|
             +-+   +-+   +-+    +-+
              |           |      |
              |           |      |
           +--+        +--+--+   +--+
           |           |     |      |
           v           v     v      v
          +-+         +-+   +-+    +-+
          |H|         |I|   |J|    |K|
          +-+         +-+   +-+    +-+

      This binary tree is similar to the binary search tree (BST) that you
      worked on in the workshop, but there are two key differences:

      1.  Here (line 68), it is represented as an "adjacency list."  All of the
      information about the nodes and and their child nodes is stored in a
      single object.  The keys of this adjacency list are the nodes and
      the values represent the corresponding left and right child nodes
      (the 1st element of the array being the left child, and the 2nd element
      being the right child).  For example, node 'b's left child is 'd' and
      right child is 'e.'

      2. Unlike the BST in the workshop, this binary tree is also unordered
      (there is nothing that actually determines what goes left or right to a
      node).  BST's are a subset of binary trees, and while the former has
      implied ordering, the latter does not (necessarily).
      NOTE: While this unordered binary tree happens to be represented as an
      adjacency list, this does not mean they all have to be!

      Because of these differences, you're going to have to take a different
      approach here than what you did for the BST prototypal "contains" method.

      */

      binaryTree = {
        a: ['b', 'c'],
        b: ['d', 'e'],
        c: ['f', 'g'],
        d: ['h'],
        e: [],
        f: ['i', 'j'],
        g: ['k'],
        h: [],
        i: [],
        j: [],
        k: [],
      };
    });

    it('returns true for paths that exist', function(){
      expect(pathExists(binaryTree, 'a', 'h')).toBe(true);
      expect(pathExists(binaryTree, 'c', 'j')).toBe(true);
    });

    it('returns false for paths that do not exist', function(){
      expect(pathExists(binaryTree, 'b', 'j')).toBe(false);
      expect(pathExists(binaryTree, 'c', 'h')).toBe(false);
    });
  });

  describe('given a tree with more than two children', function(){
    beforeEach(function(){
      /* General Tree

               +-+
               |A|
               +-+
                |
          +-----+---------+
          |     |         |
          v     v         v
         +-+   +-+       +-+
         |B|   |C|       |D|
         +-+   +-+       +-+
          |     |         |
       +--+-+   |     +---+-+---+---+
       |    |   |     |     |   |   |
       v    v   v     v     v   v   v
      +-+  +-+ +-+   +-+   +-+ +-+ +-+
      |E|  |G| |H|   |I|   |J| |K| |L|
      +-+  +-+ +-+   +-+   +-+ +-+ +-+
            |         |
            |      +--+---+
            |      |      |
            v      v      v
           +-+    +-+    +-+
           |M|    |N|    |O|
           +-+    +-+    +-+

      This tree is like the binary tree in the spec above, except there is no
      limit to how many children each node can have!

      */
      generalTree = {
        a: ['b', 'c', 'd'],
        b: ['e', 'g'],
        c: ['h'],
        d: ['i', 'j', 'k', 'l'],
        e: [],
        g: ['m'],
        h: [],
        i: ['n', 'o'],
        j: [],
        k: [],
        l: [],
        m: [],
        n: [],
        o: [],
      };
    });

    it('returns true for paths that exist', function(){
      expect(pathExists(generalTree, 'a', 'n')).toBe(true);
      expect(pathExists(generalTree, 'b', 'm')).toBe(true);
    });

    it('returns false for paths that do not exist', function(){
      expect(pathExists(generalTree, 'b', 'n')).toBe(false);
      expect(pathExists(generalTree, 'c', 'm')).toBe(false);
    });
  });

  describe('given an acyclic graph', function(){
    beforeEach(function(){
      /* Graph (no cycles)

                +-+
                |A|
                +-+
                 |
             +---+---+
             |       |
             v       v
            +-+     +-+
            |B|     |C|
            +-+     +-+
             |       |
             |       |
             +---+---+
                 |
                 v
                +-+
                |D|
                +-+

      Notice that for this spec, multiple parents can now reach the same child!
      ('b' and 'c' can both reach 'd'). This means the data structure can no
      longer be called a *tree*, but rather a *graph*!  All trees are
      technically a subset of graphs, but trees cannot have multiple roots
      or multiple paths to any node.  Therefore, we cannot call this
      data structure a tree.

      Thankfully, you most likely will not need to change much of your code to
      have `pathExists` work here: if it worked for the `generalTree`, it would
      likely work for this graph as well.

      */
      graph = {
        a: ['b', 'c'],
        b: ['d'],
        c: ['d'],
        d: [],
      };
    });

    it('returns true for paths that exist', function(){
      expect(pathExists(graph, 'a', 'd')).toBe(true);
      expect(pathExists(graph, 'b', 'd')).toBe(true);
    });

    it('returns false for paths that do not exist', function(){
      expect(pathExists(graph, 'a', '!@#$')).toBe(false);
      expect(pathExists(graph, 'd', 'a')).toBe(false);
    });
  });

  xdescribe('given a graph with cycles', function(){
    beforeEach(function(){

      /* Graph (with cycles!)

                    +-+
                    |D|--+
                    +-+  |
                         v
                        +-+
                 +----->|A|
                 |      +-+
                 |       |
                 |       |
                 |       v
                +-+     +-+   +-+
                |S|<--->|C|<--|B|
                +-+     +-+   +-+
                         |
                       +-+-+
                       |   |
                       v   v
                      +-+ +-+
                      |R| |T|
                      +-+ +-+

      Here comes the fun part!!!

      This graph now contains cycles.  There is no concept of parent-child
      relationships now, as any node can loop back and connect to an earlier
      (previously traversed) node.  There are no "parent" nodes or "child"
      nodes, only nodes and neighboring nodes.

      The links between nodes and neighboring nodes are called "edges", and can
      be bi-directional (between nodes S and C for example) or one way
      (everywhere else).

      (FYI the term "neighbor" may not mean what you think. In computer science
      it only refers to a possible next destination, not whether 2 nodes are
      "next" to each other.  In the graph below, for example, A has C as
      a neighbor, but C does not have A as a neighbor).

      Final note: A cyclic graph will probably result in an infinite loop if
      you haven't changed your code yet to deal with cycles.
      REMOVE THE X BEFORE DESCRIBE (on line 210) TO RUN THIS TEST, BUT ONLY DO
      SO WHEN YOU ARE READY TO TACKLE THIS PROBLEM.
      */

      graphWithCycles = {
        a: ['c'],
        b: ['c'],
        c: ['s', 'r', 't'],
        d: ['a'],
        s: ['a', 'c'],
        r: ['d'],
        t: [],
        z: ['z'],
      };

    });

    it('returns true for paths that exist', function(){
      expect(pathExists(graphWithCycles, 'a', 'c')).toBe(true);
      expect(pathExists(graphWithCycles, 'a', 'd')).toBe(true);
      expect(pathExists(graphWithCycles, 'r', 'd')).toBe(true);
      expect(pathExists(graphWithCycles, 'r', 'a')).toBe(true);
      expect(pathExists(graphWithCycles, 'r', 's')).toBe(true);
    });

    it('returns false for paths that do not exist', function(){
      expect(pathExists(graphWithCycles, 'a', 'b')).toBe(false);
      expect(pathExists(graphWithCycles, 'c', 'z')).toBe(false);
      expect(pathExists(graphWithCycles, 'r', 'o')).toBe(false);
    });

  });

});
