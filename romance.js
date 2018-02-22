function generatePoem() {

  var text = document.getElementsByName("input-text")[0].value;
  var numLines = document.getElementsByName("first_box")[0].value;
  var numWords = document.getElementsByName("second_box")[0].value;

  numLines = parseInt(numLines)
  numWords = parseInt(numWords)
  
  if (isNaN(numLines)) {
    alert("You enterd a number in Total number of Lines when you were supposed to enter an integer(" + numLines + ')\n\nPlease enter new values!')
    return;
  }

  if (isNaN(numWords)) {
    alert("You enterd a number in Total Number of Words when you were supposed to enter an integer(" + numWords + ')\n\nPlease enter new values!')
    return;
  }


  if (numLines > numWords) {
    alert("Total number of lines is greater than total number of words.\n\nPlease enter new values!")
    return;
  }



  var arr = parseText(text)
  var obj = generateWordPairs(arr)
  var randomValueFromObj  = chooseRandom(obj);
  var markov = writeLine(obj, numWords, numLines);

  var doStuffTextArea = document.getElementById('poem-text')
  doStuffTextArea.innerHTML = markov


}

function parseText (corpus) {

  var alpha = ['a', 'b','c', 'd', 'e', 'f', 'g', 'h', 'i',
                'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 
                't', 'u', 'v', 'w', 'x', 'y', 'z', ' '];

  var cleanStr = "";


  var cleaning = corpus.split('\n');
  corpus = cleaning.join(' ');

  for (var i=0; i < corpus.length; i++) {
    var lowerCase = corpus[i].toLowerCase();
    if (alpha.includes(lowerCase) === true) {
      cleanStr+=lowerCase
    }
  }
  
  var sentenceArr = cleanStr.split(' ');
  // remove spaces
  var noSpacesArr = [];
  for (var j=0; j < sentenceArr.length; j++) {
    if (sentenceArr[j] !== '') {
      noSpacesArr.push(sentenceArr[j]);
    }
  }
  return noSpacesArr
  
}

//var arr = parseText(text)
//console.log(arr);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function generateWordPairs(arr) {
  
  
  var obj = {};
  
  var dupesArr = [];
  for (var i=0; i < arr.length; i++) {
    var nextWord = arr[i+1];
    var key = arr[i];
    
    // create normal array for non-duplicated words
    if (i < arr.length-1){
      obj[key] = [nextWord];
    }
    
    // find duplicate words & push value to array...
    if(arr[i] === arr[i+1]) {
      dupesArr.push(arr[i+1]);
      //console.log('in if', arr[i])
      //console.log(obj[key])
    }
  }
    // .. to eventually add to that key.  
  for (var key in obj) {
    if (key === dupesArr[0]) {
      obj[key] = obj[key].concat(dupesArr)
    }
  }
  
  return obj;
}

//var obj = generateWordPairs(arr)
//console.log(obj)
  
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
function chooseRandom(obj) {
  
  var keys= Object.keys(obj);
  var randomAnswer = keys[Math.floor(Math.random() * keys.length)];
  //console.log(randomAnswer)
  
  // this is the value array
  var randWordArr = obj[randomAnswer]
  
  // if value array is > 1, do another random choice
  if (randWordArr.length > 1) {
    var randOfArr = randWordArr[Math.floor(Math.random() * randWordArr.length)];
    //console.log('balls', randOfArr, randWordArr)
    return [randomAnswer, randOfArr]
  } else {
    return [randomAnswer, randWordArr]
  }
}

//var randomValueFromObj  = chooseRandom(obj);
//console.log(randomValueFromObj)
  
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
function writeLine(obj, numWords, numLines) {
  
  var finalStr = ""
  
  var wordsPerLine = Math.floor(numWords / numLines);
  //console.log(wordsPerLine)
  
  var count=0;
  for(var i=0; i < numWords; i++) {
    var word = chooseRandom(obj);
    var wordAppend =  word[0] + ' ';
    finalStr+=wordAppend;
    count+=1
    if (count % wordsPerLine === 0) {
      finalStr+="\n"
    }
    if (count == numWords) {
      //finalStr+= "..."
    }
    
  }
  return finalStr;
} 