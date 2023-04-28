import { exportExcel, rightWord } from "./aalbe-excel.js";

// Mot à deviner
let word;

// Récupération des éléments HTML
let emptySquares;
let letterSquares;
let emptySpace = document.querySelector('#empty-space');

// Initialisation d'un tableau pour stocker les lettres déjà sélectionnées
const selectedLetters = [];
const lockedLetters = [];

// Initialisation variable derniere lettre clique
let lastLetter;

function fillDivWithSpan(word) {
  const divLettersSquares = document.querySelector('.letters-squares');
  const divEmptySquares = document.querySelector('.empty-squares');
  divLettersSquares.innerHTML = ''; 
  divEmptySquares.innerHTML = ''; 
  
  for (let i = 0; i < word.length; i++) {
    const letterSquare = document.createElement('span');
    const emptySquare = document.createElement('span');
    letterSquare.classList.add('letter-square');
    letterSquare.setAttribute('data-indexletter', i);
    emptySquare.setAttribute('data-index', i);
    emptySquare.setAttribute('data-indexletter', 999);
    emptySquare.classList.add('empty-square');
    divLettersSquares.appendChild(letterSquare);
    divEmptySquares.appendChild(emptySquare);
  }
}

function fillLettersRandomly(word) {
  
  const shuffledLetters = shuffleArray(word.split(''));

  letterSquares.forEach((square, index) => {
    square.textContent = shuffledLetters[index];
  });
}

// Fonction pour mélanger les lettres dans le mot
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Fonction pour remplir une case vide avec la lettre sélectionnée
function fillEmptySquare(emptySquare, letterSquare, lock = false) {

  emptySquare.textContent = letterSquare.textContent;
  emptySquare.classList.remove('empty-square');
  emptySquare.classList.add('filled-square');
  // letterSquare.classList.add('used-letter');

  let idLetter = letterSquare.dataset.indexletter;

  // Si lettre locke est deja rempli, re enable lettre
  if(emptySquare.dataset.indexletter != 999 )
  {
    let idToFree = emptySquare.dataset.indexletter;
    letterSquares[idToFree].classList.remove('used-letter');

    for (let i = 0; i < selectedLetters.length; i++) {
      if (selectedLetters[i].dataset.indexletter === idToFree) {
        selectedLetters.splice(i, 1);
        break;
      }
    }
  }

  emptySquare.dataset.indexletter = idLetter;

  lastLetter = letterSquare;

  if (lock == true) {

    const lastLockedSquares = document.querySelectorAll('.last-locked');
    lastLockedSquares.forEach(square => {
      square.classList.remove('last-locked');
      square.classList.add('locked');
    });

    emptySquare.classList.add('locked');
    emptySquare.classList.add('last-locked');
    letterSquare.classList.add('locked');
    lockedLetters.push(letterSquare);
  }
}

function clearEmptySquares(timeout = 1000) {
  
  clearEmptySpace();

  selectedLetters.splice(0, selectedLetters.length);
  lockedLetters.splice(0, selectedLetters.length);

  console.log(selectedLetters);
  console.log(lockedLetters);

    setTimeout(() => {
      for (let i = 0; i < emptySquares.length; i++) {
        const square = emptySquares[i];
        letterSquares[i].classList.remove('used-letter');
        if (!square.classList.contains('locked')) {
          square.classList.remove('filled-square');
          square.classList.add('empty-square');
          square.textContent = '';
        }
      }
    }, timeout);
}

let deleteButton = document.getElementById('delete');
let shuffleButton = document.getElementById('shuffle');

deleteButton.addEventListener('click', clearEmptySquares);
shuffleButton.addEventListener('click', shuffleLetters);

function shuffleLetters() {
  const lettersContainer = document.querySelector('.letters-squares');
  const lettersArray = Array.from(lettersContainer.children);
  for (let i = lettersArray.length; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    lettersContainer.insertBefore(lettersArray[j], lettersArray[i]);
  }
}

function choisirSpanLettre(lettre, spans) {
  // Créer un tableau pour stocker tous les spans correspondants
  const spansLettre = [];

  // Parcourir chaque span
  for (const span of spans) {
    // Vérifier si le span a le contenu texte de la lettre et n'a pas la classe 'used-letter'
    if (span.textContent === lettre && !span.classList.contains('locked')) {
      // Ajouter le span au tableau des spans correspondants
      spansLettre.push(span);
    }
  }

  // Vérifier s'il n'y a qu'un seul span correspondant
  if (spansLettre.length === 1) {
    return spansLettre[0];
  }

  // Mélanger le tableau des spans correspondants aléatoirement
  const spansMelanges = spansLettre.sort(() => Math.random() - 0.5);

  // Retourner le premier span du tableau aléatoire
  return spansMelanges[0];
}

// Boucle pour ajouter un écouteur d'événement "click" à chaque lettre
function addEventListenerToSquares() {

  for (let i = 0; i < letterSquares.length; i++) {
    const letterSquare = letterSquares[i];
    letterSquare.addEventListener('click', function () {

      // Vérification que la lettre n'a pas encore été sélectionnée ou locke
      //if (!(selectedLetters.includes(letterSquare) || letterSquare.classList.contains("locked"))) {
      if(emptySpace.textContent.length < word.length) {
        // Récupération de la première case vide
        const emptySquare = document.querySelector('.empty-square');
        
        // Vérification qu'il y a encore des cases vides disponibles
        // if (emptySquare) {
          
          // Ajout de la lettre au tableau des lettres sélectionnées
          selectedLetters.push(letterSquare);
          
          // Remplissage de la case vide avec la lettre sélectionnée
          // fillEmptySquare(emptySquare, letterSquare);
          this.classList.add('used-letter');
          fillEmptySpace(letterSquare.textContent);
        // }
      }
    });
  }
}

document.addEventListener('keydown', function(event) {
  const codeTouche = event.code;
  if (/^[a-zA-Z]$/.test(event.key)) {
    fillEmptySpace(event.key.toUpperCase());
  } else if (codeTouche === 'Backspace' && emptySpace.textContent.length > 0) {
    emptySpace.textContent = emptySpace.textContent.slice(0, -1);
  }
});

function fillEmptySpace(lettre) {
  const texteActuel = emptySpace.textContent;

  emptySpace.textContent = texteActuel + lettre;

  let playerWord = emptySpace.textContent;

  if(playerWord.length == word.length)
  {
    if(playerWord.toUpperCase() == word.toUpperCase())
    {
      // word is false
      toastr.options = {
        timeOut: 2000,
        extendedTimeOut: 2000,
        positionClass: 'toast-top-center'
      };

      setTimeout(function() {
        toastr.success("Prima, jouw antwoord is goed !");

        clearEmptySquares();
        clearEmptySpace();
      }, 500);  

      finishGame();
    }
    else
    {
      // word is false
      toastr.options = {
        timeOut: 2000,
        extendedTimeOut: 2000,
        positionClass: 'toast-top-center'
      };

      setTimeout(function() {
        toastr.error("Helaas fout !");

        clearEmptySquares();
        clearEmptySpace();
      }, 500);  


    }
  }
}

function clearEmptySpace() {
  emptySpace.textContent = "";
}

let randomCounter = 0;

// Fonction pour choisir une case vide aléatoire et remplir avec une lettre aléatoire du mot
function fillRandomEmptySquare() {

  randomCounter++;

  // Récupération de toutes les cases vides
  const emptySquaresArray = Array.from(emptySquares);

  // Filtre des cases vides pour ne garder que celles qui n'ont pas encore été remplies
  const availableEmptySquares = emptySquaresArray.filter(emptySquare => !emptySquare.classList.contains('locked'));
  // console.log(availableEmptySquares);
  let randomIndex = Math.floor(Math.random() * availableEmptySquares.length);

  console.log("AvailableEmptySquer = " + availableEmptySquares[randomIndex].dataset.index);
  // recuperation index de la case vide aleatoire et la case
  let index = availableEmptySquares[randomIndex].dataset.index;
  const randomEmptySquare = emptySquares[index];
  console.log(randomEmptySquare);

  // prendre la lettre aleatoire a cette case
  const letterAtIndex = (word.charAt(index)).toUpperCase();
  // Remplissage de la case vide avec la lettre sélectionnée
  let span = choisirSpanLettre(letterAtIndex, letterSquares);
  fillEmptySquare(randomEmptySquare, span, true);
}

function checkWord() {
  let word = "";
  for (let i = 0; i < emptySquares.length; i++) {
    const square = emptySquares[i];
    if (square.classList.contains("filled-square")) {
      word += square.textContent;
    } else {
      return false;
    }
  }
  return word.toUpperCase();
}

let stopDisplaying = false;

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', function() {

  if(stopDisplaying == false)
  {
    stopDisplaying = true;
    stopButton.textContent = 'Continue';
  }
  else
  {
    stopDisplaying = false;
    stopButton.textContent = 'Stop';
  }
});

// Boucle pour remplir une case vide aléatoire toutes les 10 secondes
setInterval(function () {
  // Vérification que toutes les cases vides n'ont pas encore été remplies
  if(word.length > randomCounter)
  {
    if(stopDisplaying == false)
    {
      if(emptySpace.textContent == '') fillRandomEmptySquare();
    }
  }
}, parseInt(sessionStorage.delaySeconds));


// TIMER 
const results = document.querySelector("#results");
const timerElement = document.querySelector('#timer');
let timerStarted = false;
let timerIntervalId = null;
let timerInterval;

function startTimer() {
  // mettre à jour le drapeau pour indiquer que le timer est démarré
  timerStarted = true;

  // initialiser la durée à 0
  let durationInSeconds = 0;

  // mettre à jour l'élément HTML avec la durée initiale
  timerElement.textContent = '00:00';

  // démarrer le timer en exécutant la fonction à intervalles réguliers
  timerIntervalId = setInterval(() => {
    durationInSeconds++;

    // calculer les minutes et les secondes
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;

    // mettre à jour l'élément HTML avec la nouvelle durée
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, 1000); // exécuter la fonction toutes les secondes
}

function pauseTimer() {
  clearInterval(timerIntervalId);
  const currentTime = document.getElementById("timer").textContent;
  return currentTime;
}

function resetTimer() {
  let timer = document.querySelector("#timer");
  timer.textContent = "00:00";
  clearInterval(timerIntervalId);
  timerIntervalId = null; // remettre l'identifiant à null pour indiquer que le timer est arrêté
}

// convertir un temps au format "MM:SS" en secondes
function timeToSeconds(time) {
  const [minutes, seconds] = time.split(':');
  return parseInt(minutes) * 60 + parseInt(seconds);
}

// convertir des secondes en temps au format "MM:SS"
function secondsToTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

let TOTAL_GAMES = parseInt(localStorage.getItem('games-aalbe') ?? 0);

// Stats html
let current_time = document.querySelector("#current-time");
let previous_time = document.querySelector("#previous-time");
let average_time = document.querySelector("#average-time");

// Stats values
let PREVIOUS = localStorage.getItem('previous-time-aalbe') ?? 0; // second
let AVERAGE = parseFloat(localStorage.getItem('average-time-aalbe') ?? 0);

function finishGame()
{
    TOTAL_GAMES = TOTAL_GAMES + 1;
    localStorage.setItem('games-aalbe', TOTAL_GAMES);

    // Desactiver tout les boutons pour stopper le jeu
    shuffleButton.disabled = true;
    deleteButton.disabled = true;

    let value = pauseTimer();

    let new_average = Math.round(((localStorage.getItem('average-time-aalbe') * (TOTAL_GAMES - 1)) + timeToSeconds(value)) / TOTAL_GAMES);

    // AVERAGE = new_average;
    localStorage.setItem('average-time-aalbe', new_average); 

    // Mopdifier valeur statistiques dans html
    
    document.querySelector("#right-word").textContent = word;
    current_time.textContent = value;
    previous_time.textContent = localStorage.getItem('previous-time-aalbe');
    average_time.textContent = secondsToTime(localStorage.getItem('average-time-aalbe'));

    localStorage.setItem('previous-time-aalbe', value);

    setTimeout(function() {
      results.style.display = 'flex';
      document.querySelector("#replay-button").style.display = 'flex';
    }, 700);    
}

async function init()
{
  // Afficher stats
  previous_time.textContent = localStorage.getItem('previous-time-aalbe');
  average_time.textContent = secondsToTime(localStorage.getItem('average-time-aalbe'));

  let random_word = await exportExcel();
  word = random_word.toUpperCase();

  fillDivWithSpan(word);

  
  if(localStorage.getItem('mode') == "light") lightdarkmode(false);

  emptySquares = document.querySelectorAll('.empty-square');
  letterSquares = document.querySelectorAll('.letter-square');

  fillLettersRandomly(word);
  addEventListenerToSquares();

  if (!timerStarted) {
    startTimer();
  }
}

init();



// BUTTONS HEADER

document.getElementById('statistics-btn').addEventListener('click', ShowResults);

function HideResults()
{
    document.getElementById('results').style.display = 'none';
}

function ShowResults()
{
    document.getElementById('results').style.display = 'flex';
}


// Dark light mode

document.getElementById('switch-design').addEventListener('click', lightdarkmode);
function lightdarkmode()
{
    var element = document.body;

    let elem = document.getElementsByClassName("letter-square");
    for (let i = 0; i < elem.length; i++) 
    {
        elem[i].classList.toggle("light-square");
    }

    const monElement = document.getElementById("empty-squares");
    for (let i = 0; i < monElement.children.length; i++) {
      monElement.children[i].classList.toggle("light-square");
    }


    // Boutons header
    let btns = document.getElementsByClassName("dropbtn");
    for (let i = 0; i < btns.length; i++) 
    {
        btns[i].classList.toggle("light-btn");
    }

    element.classList.toggle("light-mode");
}