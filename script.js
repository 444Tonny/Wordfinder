import { WORDS } from "./fourwords.js";

let WORD_LENGTH = (sessionStorage.wordLength === undefined) ? 4 : sessionStorage.wordLength;
const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]

// console.log(rightGuessString)
function rgbExtract(s) {
    var match = /^\s*rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\)\s*$/.exec(s);
    if (match === null) {
      return null;
    }
    return { r: parseInt(match[1], 10),
             g: parseInt(match[2], 10),
             b: parseInt(match[3], 10) };
    }
  
function rgbMatches(sText, tText) {
    var sColor = rgbExtract(sText),
        tColor = rgbExtract(tText);
    if (sColor === null || tColor === null) {
      return false;
    }
    var componentNames = [ 'r', 'g', 'b' ];
    for (var i = 0; i < componentNames.length; ++i) {
      var name = componentNames[i];
      if (sColor[name] != tColor[name]) {
        return false;
      }
    } 
    return true;
}

function initBoard() {
    let board = document.getElementById("game-board");

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"
        
        for (let j = 0; j < WORD_LENGTH; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}

function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("vi-keyboard-button")) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor
            
            /* already green */
            if (rgbMatches(oldColor, 'rgb(75,177,75)') == true) {
                return
            }
            
            /* already yellow but not green */
            if(rgbMatches(oldColor, 'rgb(222,187,0)') == true && rgbMatches(color, 'rgb(75,177,75)') == false) {
                return
            }

            /* color keyboard to gray */
            if(rgbMatches(color, 'rgb(27,27,39)') == true)
            {
                elem.style.backgroundColor = 'rgb(98,98,102)';
                return
            }

            elem.style.backgroundColor = color
            break
        }
    }
}

function deleteLetter () {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter - 1]
    box.textContent = ""
    box.classList.remove("filled-box")
    currentGuess.pop()
    nextLetter -= 1
}

function checkGuess () {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let guessString = ''
    let rightGuess = Array.from(rightGuessString)

    for (const val of currentGuess) {
        guessString += val
    }

    if (guessString.length != WORD_LENGTH) {
        toastr.error("Not enough letters!")
        return
    }

    if (!WORDS.includes(guessString)) {
        toastr.error("Your word is not in list!")
        return
    }

    
    for (let i = 0; i < WORD_LENGTH; i++) {
        let letterColor = ''
        let box = row.children[i]
        let letter = currentGuess[i]
        
        let letterPosition = rightGuess.indexOf(currentGuess[i])
        
        // check if letter is in the correct guess
        
        // NOT IN  
        if (letterPosition === -1) 
        {
            letterColor = "rgb(27,27,39)"
        } 

        // IN
        else 
        {
            if (currentGuess[i] === rightGuess[i]) {
                // box = green, in right position
                letterColor = 'rgb(75,177,75)'
            } else {
                // box = yellow, in wrong position
                letterColor = 'rgb(222,187,0)'
            }

            rightGuess[letterPosition] = "#"
        }

        let delay = 250 * i
        setTimeout(()=> {
            // flip the box
            animateCSS(box, 'flipInX')
            // change box background color
            box.style.backgroundColor = letterColor
            shadeKeyBoard(letter, letterColor)
        }, delay)
    }

    if (guessString === rightGuessString) {
        toastr.success("Congratulations!")
        guessesRemaining = 0
        return
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            toastr.error("Game over!")
            toastr.info(`The right word was: "${rightGuessString}"`)
        }
    }
}

function insertLetter (pressedKey) {
    if (nextLetter === WORD_LENGTH) {
        return
    }
    pressedKey = pressedKey.toLowerCase()

    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter]
    animateCSS(box, "pulse")
    box.textContent = pressedKey
    box.classList.add("filled-box")
    currentGuess.push(pressedKey)
    nextLetter += 1
}

const animateCSS = (element, animation, prefix = 'animate__') =>
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = element
    node.style.setProperty('--animate-duration', '0.3s');
    
    node.classList.add(`${prefix}animated`, animationName);

    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
});

document.addEventListener("keyup", (e) => {

    if (guessesRemaining === 0) {
        return
    }

    let pressedKey = String(e.key)
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter()
        return
    }

    if (pressedKey === "Enter") {
        checkGuess()
        return
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})

document.getElementById("virtual-keyboard").addEventListener("click", (e) => {
    const target = e.target
    
    if (!target.classList.contains("vi-keyboard-button")) {
        return
    }
    let key = target.textContent

    if (key === "Del") {
        key = "Backspace"
    } 

    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})

initBoard();


/*************** GAME SETTINGS */

const letterLengthSelector = document.querySelector('.letter-length')

letterLengthSelector.addEventListener('change', (event) => {
    WORD_LENGTH = event.target.value;
    sessionStorage.wordLength = WORD_LENGTH;
    location.reload(); 
});