var Game = {
    numGuessCount: 0,
    wins: 0,
    losses: 0,
    guessedLetters: [],
    guessingWord: [],
    incorrectGuesses: [],
    challengeWords:           
    [   
        "GIBSON",
        "FENDER",
        "PRS",
        "GRETSCH",
        "NOVO",
        "ANDERSON",
        "NASH",
        "EPIPHONE",
        "IBANEZ"],
   
    didWin : function (keyPress) {
        console.log("numGuesses=" + Game.numGuessCount);
        console.log("How many guesses do you get=" + Game.guessingWord.length * 2);
        if (Game.numGuessCount < (Game.guessingWord.length * 2)) {
            if(Game.guessedLetters.indexOf("_ ") === -1) {
                Game.wins++;
                Game.guessedLetters = [];
                Game.guessingWord = [];
                Game.incorrectGuesses = [];
                Game.numGuessCount = 0;
                initializeGame();
            } 
        } else {
            Game.losses++;
            Game.numGuessCount = 0;
            console.log("You've run out of guesses.  You lose.")
        }
        //if we got here we've traversed the entire array and had matches in both colums meaning the user guessed all letters.  Otherwise
        // we'd have returned false already (above)
        return true;
    },

    recordGuess : function (keyPress) {
        for (var i=0; i < Game.guessingWord.length; i++) {
            if (Game.guessingWord[i] === keyPress) {
                Game.guessedLetters[i] = keyPress;
            } else {           
                //only add if the guess is not already in the array AND also not in the word we are trying to guess  
                if((Game.incorrectGuesses.indexOf(keyPress) == -1) && (Game.guessingWord.indexOf(keyPress) == -1)) { 
                    Game.incorrectGuesses[Game.incorrectGuesses.length] = keyPress;   
                }
            }
            Game.displayIncorrectGuesses();    // console.log("Game.guessedLetters[i]=" + Game.guessedLetters[i]);
        }
    },

    hasPreviouslyMadeThisGuess : function (keyPress) {  
        console.log("hasPreviouslyMadeThisGuess();= " + keyPress);
        if (Game.guessedLetters.indexOf(keyPress) === -1) {
            return false;
        }
        return true;
    },

    displayIncorrectGuesses : function () {
        var incorrectLettersStr = "";

        for (var i = 0; i < Game.incorrectGuesses.length; i++) {
            if (Game.incorrectGuesses === 0) {
                incorrectLettersStr = Game.incorrectGuesses[i] + " ";
            } else {
                incorrectLettersStr += Game.incorrectGuesses[i] + " ";
            }
        } 
        document.getElementById("wrongLetters").innerHTML = "Incorrect Guesses: " + incorrectLettersStr;
    },

    selectChallengeWord : function (index) {
        var currentWordIndex = Math.floor(Math.random() * Game.challengeWords.length);
        Game.guessingWord =  Game.challengeWords[currentWordIndex];
        console.log("guessingWord:" + Game.guessingWord);
    }
};

function initializeGame() {
    console.log("Initialize();");
    Game.selectChallengeWord();

    for (var i = 0; i < Game.guessingWord.length; i++) {
        Game.guessedLetters[i] = "_ ";
    } 
    updateDisplay();
   
    console.log("Selected Word: " + Game.guessingWord);
   // Game.displayIncorrectGuesses();
    console.log("Guessing Letters Len: " + Game.guessedLetters.length);
}   

document.onkeyup = function(event) {
    var keyPress = event.key.toUpperCase();
    console.log(keyPress)
    Game.numGuessCount++;   
   // while (Game.numGuessCount < (Game.guessingWord.length * 2)) {
        if (!Game.hasPreviouslyMadeThisGuess(keyPress)) {
            Game.recordGuess(keyPress);
            Game.didWin(keyPress);   
        } else {
            console.log("You've already guessed this. Try another letter.");
        }   
        updateDisplay();
}

 function updateDisplay() {
    console.log("updateDisplay");
    var displayGuessesString = "";

    for (var x = 0; x < Game.guessedLetters.length; x++) {
        displayGuessesString = displayGuessesString + Game.guessedLetters[x];
    }

    document.getElementById("numberOfAttemptsLbl").innerHTML = "Max Attempts: " + Game.guessingWord.length * 2;
    document.getElementById("attemptsMade").innerHTML = "Attempts Made: " + Game.numGuessCount;
    document.getElementById("guessesLbl").innerHTML = "Guesses: " + displayGuessesString;
    document.getElementById("wins").innerHTML = "Total Wins: " + Game.wins;
    document.getElementById("losses").innerHTML = "Total Losses: " + Game.losses;
    Game.displayIncorrectGuesses(); 
}



