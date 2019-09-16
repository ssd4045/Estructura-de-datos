/* global graphGen shortestPaths performanceLoop */
/* eslint-disable id-length */

describe('`shortestPaths`', function(){
  var arrayContains = jasmine.arrayContaining;
  var undirectedGraph, largeGraph;

  beforeEach(function(){

    /*
    Your function, `shortestPaths`, must return an array of shortest paths
    between two nodes in an undirected graph (unlike the directed graph in the
    `doesPathExist` problem, all edges in an undirected graph are bidirectional).

    The premade `undirectedGraph` below will be used for most of the test specs,
    and the generated graph (`largeGraph`) will be utilized for the final spec.

    The generated graph is quite big, so think carefully about how you should
    approach this problem!  An unoptimized search may end up taking an
    unnecessarily long time to run.  Carefully consider what you've learned
    in the data structures workshop, and what "type" of search would be most
    suitable for this problem!

    */

    undirectedGraph = {
      a: ['q', 'b', 'c'],
      b: ['a', 'd'],
      c: ['a', 'd', 'y'],
      d: ['b', 'c', 'r', 'x'],
		  q: ['a', 'r', 's', 't', 'u'],
		  r: ['d', 'q', 'z'],
      s: ['v', 'q'],
      t: ['v', 'q'],
      u: ['v', 'q'],
      v: ['s', 't', 'u'],
		  x: ['d'],
		  y: ['c'],
		  z: ['r']
    };

    largeGraph = graphGen(5, 35);
    /*
    `graphGen` here creates a graph with 35 total vertices each connected to a
    random number of neighbors (maximum of 5).

    The graph also contains one giant loop connecting the outermost vertices,
    so once again, make sure your function detects cycles!
    */
  });

  it('returns an array', function(){
    var returnedValue = shortestPaths(undirectedGraph, 'a', '!@#$%');
    expect(returnedValue).toEqual(jasmine.any(Array));
  });

  it('returns an array with length 0 if no path exists', function(){
    var returnedValue = shortestPaths(undirectedGraph, 'a', '!@#$%');
    expect(returnedValue.length).toBe(0);
  });

  it('returns an array of arrays if path exists', function(){
    var returnedValue = shortestPaths(undirectedGraph, 'a', 'a');
    expect(returnedValue).toEqual(jasmine.any(Array));
    for (let element of returnedValue){
      expect(element).toEqual(jasmine.any(Array));
    }
  });

  describe('for starting and ending vertices that only have a single shortest path between them', function(){
    it('returns an array of length 1', function(){
      expect(shortestPaths(undirectedGraph, 'a', 'y').length).toBe(1);
      expect(shortestPaths(undirectedGraph, 'd', 'z').length).toBe(1);
    });
    it('returns the correct shortest path', function(){
      expect(shortestPaths(undirectedGraph, 'a', 'y')[0].toString()).toEqual('a,c,y');
      expect(shortestPaths(undirectedGraph, 'd', 'z')[0].toString()).toEqual('d,r,z');
    });
  });

  describe('for starting and ending vertices that have multiple shortest paths between them', function(){
    it('returns an array with length matching the number of shortest paths', function(){
      expect(shortestPaths(undirectedGraph, 'a', 'd').length).toBe(2);
      expect(shortestPaths(undirectedGraph, 'x', 'a').length).toBe(2);
      expect(shortestPaths(undirectedGraph, 'q', 'v').length).toBe(3);
    });

    it('returns the correct shortest paths', function(){
      expect(shortestPaths(undirectedGraph, 'a', 'd')).toEqual(arrayContains([['a', 'b', 'd'], ['a', 'c', 'd']]));
      expect(shortestPaths(undirectedGraph, 'x', 'a')).toEqual(arrayContains([['x', 'd', 'b', 'a'], ['x', 'd', 'c', 'a']]));
      expect(shortestPaths(undirectedGraph, 'v', 'q')).toEqual(arrayContains([['v', 'u', 'q'], ['v', 't', 'q'], ['v', 's', 'q']]));
    });
  });

  xdescribe('given a graph with over 30 vertices', function(){
    it('should be optimized and complete its computations in a set amount of time (depends on how fast the computer is, but usually less than 50 milliseconds)', function(){
      // This will test whether your function has been written optimally.  It should not perform unnecessary computations.
      // Remove the 'x' before describe (on line 95) to run this test spec.

      var startBaseline = Date.now();
      performanceLoop(); // This is to establish a baseline time to compare with the `shortestPath` time (`performanceLoop` usually takes about 6 milliseconds to run).
      var elapsedTimeBaseline = Date.now() - startBaseline;

      var start = Date.now();
      var shortestPathsArr = shortestPaths(largeGraph, 'a', 'b');
      if (!shortestPathsArr) throw Error('shortestPaths function does not return anything');
      var elapsedTime = Date.now() - start;

      // Implemented correctly, `shortestPaths` should take less time than baseline time. The spec here will test if it at the very least finishes before the baseline time multiplied by 2. A suboptimal `shortestPaths` function will probably take a couple seconds to complete (and fail the spec).

      expect(elapsedTime).toBeLessThan(elapsedTimeBaseline * 2);
    });
  });
});
