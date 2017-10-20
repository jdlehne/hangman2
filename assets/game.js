var guessed = [];
var dictionary = ["megatron","soundwave","bonecrusher","starscream","hook", "slipstream","tantrum","divebomb","blackout","barricade","onslaught","shockwave","headstrong", "scrapper","cyclonus","mixmaster","rampage","scavenger", "skywarp", "bludgeon","scourge","brawl","kickback"];
var currentWord = " ";
var wordGuessed = " ";
var wins = 0;
var loss = 0;
var guessesLeft = 0;
var gameOver = false;
var rightLetter = new Audio("assets/sounds/rightLetter.mp3");
var wrongLetter = new Audio("assets/sounds/wrongLetter.mp3");


$(function() {
    gameStart();
    console.log(currentWord);

    $(document).on("keyup", function(event) {
            if (!gameOver) {
                if (validate(event.key)) {
                    if (currentWord.includes(event.key)) {
                        rightLetter.play();
                        replaceUnderscore(event.key);
                        $("#currentWord").html("Word: " + wordGuessed);
                        if (currentWord === wordGuessed) {
                            wins += 1;
                            $("#wins").html("wins: " + wins);
                            $("#currentWord").html("Yes!! you revealed the name of " + currentWord + "!!");
                            $("#playAgain").html("press any key to look for another decepticon.");
                            gameOver = true;
                        }
                    } else if (!guessed.includes(event.key)) {
                        wrongLetter.play();
                        guessed.push(event.key);
                        $("#lettersGuessed").html("Letters Guessed so far: " + guessed);
                        if (guessesLeft > 0) {
                            guessesLeft -= 1;
                            $("#guessesLeft").html("Guesses Left: " + guessesLeft);
                            if (guessesLeft === 0) {
                                loss += 1;
                                $("#losses").html("losses: " + loss);
                                $("#currentWord").html("the decepticon you failed miserably to guess was " + currentWord + "!!!!");
                                $("#playAgain").html("press any key to look for another decepticon.");
                                gameOver = true;
                            }
                        }
                    }
                }
            } else { 
            	gameStart();
                gameOver = false;

        }

    });

});


function validate(strValue) {
    var objRegExp = /^[a-z]+$/;
    return objRegExp.test(strValue);
}

function randomWord(dict) {
    var pickedWord = dict[Math.floor(Math.random() * dict.length)];
    return pickedWord;
}

function gameStart() {
	guessed = [];
	wordGuessed= "";
    $("#lettersGuessed").html("Letters Guessed so far: " + guessed);
    currentWord = randomWord(dictionary);
    fillWordWithDashes(currentWord.length);
    $("#currentWord").html("Word: " + wordGuessed);
    guessesLeft = currentWord.length;
    $("#guessesLeft").html("Guesses Left: " + guessesLeft);
    $("#playAgain").html("");
}

function fillWordWithDashes(arrayLength) {
    for (var i = 0; i < arrayLength; i++) {
        console.log(wordGuessed);
        wordGuessed = wordGuessed.concat("-");
    }

}

function replaceUnderscore(letterTOReplace) {
    for (var i = 0; i < currentWord.length; i++) {
        if (currentWord.charAt(i) === letterTOReplace) {
            wordGuessed = replaceAt(wordGuessed, i, letterTOReplace);
        }
    }

}

function replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
}