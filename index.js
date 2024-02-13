const body = document.querySelector('body'); // Stretch goal #1,2
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const wrongEntryMessage = document.getElementById('wrong-entry'); // Stretch goal #1
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses'); // #1 not used not displaying
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
let wrongAttempts = 1;
const maxNumberOfAttempts = 5;
const maxNumberOfWrongAttempts = 3;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);

  // Wrong entry check added, Stretch goal #1,2
  if (isNaN(guess) || guess < 1 || guess > 99) {
    hideAllMessages();
    wrongEntryMessage.style.display = '';
    if (wrongAttempts === maxNumberOfWrongAttempts) {
      punishment();
    };
    wrongEntryMessage.style.display = 'block';
    wrongAttempts++;
  } else {
    // cosmetic fix ++
    attempts++; 
    hideAllMessages();
    // moved here because to avoid repeating
    numberOfGuessesMessage.style.display = '';

    if (guess === targetNumber) {
      // Stretch goal #3
      numberOfGuessesMessage.innerHTML = `You made ${attempts} ${attempts > 1 ? 'guesses' : 'guess'}`; 

      correctMessage.style.display = '';

      submitButton.disabled = true;
      guessInput.disabled = true;
    } else {
      if (guess < targetNumber) {
        tooLowMessage.style.display = '';
      } else {
         // #2 wrong message displayed
        tooHighMessage.style.display = '';
      };

      const remainingAttempts = maxNumberOfAttempts - attempts;
      numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} ${remainingAttempts > 1 ? 'guesses' : 'guess'} remaining`; // Stretch goal #2, 3
    };

    //#3 wrong operator
    if (attempts === maxNumberOfAttempts) { 
      hideAllMessages();
      // #1 was not used or displayed
      maxGuessesMessage.style.display = ''; 
      submitButton.disabled = true;
      guessInput.disabled = true;
    };
  };

  guessInput.value = '';
  resetButton.style.display = '';
}

function hideAllMessages() {
  //#4 out of bounds
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) { 
    messages[elementIndex].style.display = 'none';
  }
}

//#5 typo
function setup() { 
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  //#6 reset should be for attempts
  attempts = 0; 
  wrongAttempts = 1;

  // Enable the input and submit button
  //#7 typo
  submitButton.disabled = false; 
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
   // added reset for the input on load
  guessInput.value = '';
}

// Stretch goal #1, 2
function punishment() { 
  wrongEntryMessage.innerHTML = `Mess with the best, die like the rest`;
  submitButton.disabled = true;
  guessInput.disabled = true;
  resetButton.disabled = true;
  numberOfGuessesMessage.style.display = 'none';

  let timeleft = 5;
  const countDownTimer = setInterval(function () {
    wrongEntryMessage.innerHTML = `Brute force detected. The system will be destroyed in ${timeleft}`;
    if (timeleft <= 0) {
      clearInterval(countDownTimer);
      body.innerHTML = '';
      body.style.backgroundColor = '#000';
    };
    timeleft -= 1;
  }, 1000);
};

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();
