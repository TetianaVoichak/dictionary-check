class WordTranslate {
  constructor(word, translate) {
    this.word = word;
    this.translate = translate;
  }

  checkWord() {
    let counter = false;
    for (var i = 0; i < allWords.length; i++) {
      if (this.word == "" || this.translate == "") {
        textResult.style.visibility= "visible";
        textResult.textContent = "null";

        return;
      }
      if (
        allWords[i].word.toLowerCase() == this.word.toLowerCase() &&
        allWords[i].translate.toLowerCase() == this.translate.toLowerCase()
      ) {
        textResult.style.visibility= "visible";
        transl.style.background = "#20B2AA";
        textResult.textContent = "RIGHT";
        textResult.style.color = "#20B2AA";
        counter=true;
        return;
      } 
    }
    if(!counter)  
    {textResult.style.visibility= "visible";
    transl.style.background =    "#FA8072";
      textResult.textContent = "WRONG";
      textResult.style.color = "#FA8072";
  }
  } 

}

  //function a word for translate output

let outputWordForTranslate = function()
{

var index = Math.floor(Math.random() * (words.length-1) + 1)
var wordTranslate = words[index];
console.log(wordTranslate);
return wordTranslate;
}
  //show word if you dont know translate
  function showRightWord(word)
  {
    for(var i = 0 ; i < allWords.length;i++)
    {
      if(word == allWords[i].word)
      {
        helpWord.style.visibility = "visible";
        helpWord.textContent = allWords[i].translate;
        return;
      }
    }

  }


let randWord = function()
{
  var index = Math.floor(Math.random() * allWords.length);
return allWords[index].word;
}

//remember all words for a translation
let rememberAllWordsForATranslation = function()
  {
for(var i = 0 ; i < allWords.length;i++)
{
  var index = Math.floor(Math.random() * (allWords.length-1) + 1);
  words[i] = allWords[index].translate;
  allWords[index].translate = allWords[i].translate;
  allWords[i].translate = words[i];
  //console.log(words[i]); 
}
  }

let wordforTranslate = document.querySelector(".word-for-translate");
let textResult = document.querySelector(".result");
let btnCheck = document.querySelector(".check-btn");
const fileSelector = document.querySelector(".input__file");
let btnStart = document.querySelector(".start-btn");
let btnHelp = document.querySelector(".help-btn");
let helpWord = document.querySelector(".help-word");
let allWords = [];//massiv with 2 words(a word and his translate)
let words = [];
let infoErrFile = document.querySelector(".error-file");
let moreInfo = document.querySelector(".btn-instr");
let transl = document.querySelector(".input-translate");

moreInfo.addEventListener("click", () => {
  let instruction  = document.querySelector(".instruction");
  let textBtnInstr = document.querySelector(".btn-instr");

  if(instruction.style.visibility == "visible")
  {
    instruction.style.visibility = "hidden";
    textBtnInstr.textContent = "Instruction click here";
  document.querySelector(".infoInst").style.height = "190px";


  }
  else{
    instruction.style.visibility = "visible";
textBtnInstr.textContent = "Hide information";
document.querySelector(".infoInst").style.height = "390px";
  }

})

//check word with translate

btnCheck.addEventListener("click",() => {
  let firstWord = document.querySelector(".word-for-translate").value;
  let ansverWord = document.querySelector(".input-translate").value;
  let words = new WordTranslate(firstWord, ansverWord);
  words.checkWord();
});


//select a file and load info from this file

fileSelector.addEventListener("change", (event) => {
  const fileWithWords = event.target.files;

let file = document.querySelector(".input__file").files[0];
let reader = new FileReader();
reader.readAsText(file, "UTF-8");
reader.onload = function() {

let str = reader.result;

document.querySelector(".input-translate").value = ""; 
document.querySelector(".help-word").textContent = "";
document.querySelector(".result").textContent = "";
 funcPutWordsFromFileInVariable(str);
 wordforTranslate.value =  randWord();

}
reader.onerror = function() {
infoErrFile.textContent ="File upload error";
  console.log(reader.error);

    }
});


//write info from file in a massiv with words

let funcPutWordsFromFileInVariable = function(str) {
   allWords.length = 0;
  let strSplit = str.split('\n');
  for (var i = 0; i < strSplit.length; i++) {
    let temp = strSplit[i].split(' - ');
    let coupleWords = new WordTranslate();
    coupleWords.translate = temp[0];
    coupleWords.word = temp[1].split('\r')[0];
    allWords.push(coupleWords);
  }
}

transl.addEventListener("click", () =>{
  document.querySelector(".input-translate").value = ""; 
  transl.style.background = "#fff";
})

//function shows next word

btnStart.addEventListener("click",() =>{
  transl.style.background = "#fff";
  document.querySelector(".input-translate").value = ""; 
  textResult.textContent = "";
  helpWord.textContent = "";
  wordforTranslate.value =  randWord();
 })

 //show word if you dont know his translate
btnHelp.addEventListener("click",() =>{
showRightWord( document.querySelector(".word-for-translate").value)
})