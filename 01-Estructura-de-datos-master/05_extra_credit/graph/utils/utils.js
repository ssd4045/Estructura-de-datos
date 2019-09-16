
// 5 -> ["a", "b", "c", "d", "e"]
function createArrIncrementedLetters26 (number){
  var arr = [];
  for (var i = 97; i < number + 97; i++){
    arr.push(String.fromCharCode(i));
  }
  return arr;
}

// ('a', 5) -> ["aa", "ab", "ac", "ad", "ae"]
function attachIncrementedLetters (baseLetter, number){
  return createArrIncrementedLetters26(number).map(letter => baseLetter + letter);
}

// 30 -> ["a", "b", "c", ... "z", "aa", "ab", "ac", "ad"]
function createArrIncrementedLetters (number){
  if (number > 26){
    var results = createArrIncrementedLetters26(26);
    var index = 0;
    while (results){
      var letter = results[index];
      if (results.length === number) break;
      var remaining = number - results.length;
      var numParam = remaining < 26 ? remaining : 26 ;
      results = results.concat(attachIncrementedLetters(letter, numParam));
      index += 1;
    }
    return results;
  }
  else {
    return createArrIncrementedLetters26(number);
  }
}

// for the baseline
function performanceLoop (){
  var total = 0;
  for (var i = 0; i < 3000; i++){
    total += 1;
    for (var j = 0; j < 3000; j++){
      total += 1;
    }
  }
}

function getRandomInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


function graphDeepClone(graph){
  var newGraph = Object.assign({}, graph);
  Object.keys(newGraph).forEach(key => {
    newGraph[key] = newGraph[key].slice();
  });
  return newGraph;
}
