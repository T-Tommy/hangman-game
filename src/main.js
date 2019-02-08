import alphabet from './letters.js';
import wordList from './words.js';

// Generate random word from array
const randomNumber = getRandomIntInclusive(0, wordList.length);
const randomWord = wordList[randomNumber];
console.log(randomWord);

const buttons = document.getElementById('buttons');
const picture = document.getElementById('picture');

// Counter for wrong answers, used to change picture
let counter = 0;
for(let i = 0; i < alphabet.length; i++) {
    // Create letter buttons
    let guessLetter = alphabet[i];
    const letterButton = document.createElement('button');
    letterButton.textContent = guessLetter;
    letterButton.classList.add('button-class', guessLetter);
    
    // This whole section is run everytime a button a clicked
    letterButton.addEventListener('click', function() {
        //Black out clicked letter
        letterButton.classList.add('clicked');

        // Checks for correct letters, if a correct letter is found, hit++
        let hit = 0;
        for(let i = 0; i < randomWord.length; i++) {
            let wordLetter = randomWord[i];
            if(guessLetter === wordLetter) {
                const test = document.querySelectorAll('.underline');
                test[i].textContent = ' ' + guessLetter;
                hit++;
            } 
        }

        // If no correct letters are found, hit should be 0 and will trigger picture change
        if(hit === 0) {
            counter++;
            picture.src = 'assets/hangman' + counter + '.png';
            console.log(counter);
            
            // Losing conditions
            if(counter === 4) {
                // Make losing message 
                const winLose = document.getElementById('win-lose');
                winLose.textContent = 'You done died anyway'

                // Clear letter buttons
                const allButtons = document.querySelectorAll('.button-class');
                for(let i = 0; i < allButtons.length; i++) {
                    allButtons[i].classList = 'clicked';
                }
            }
        }
    }, { once : true });

    buttons.appendChild(letterButton);
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max));
}


const phrase = document.getElementById('phrase');
for(let i = 0; i < randomWord.length; i++) {
    const underLine = document.createElement('span');
    underLine.classList.add('underline');
    underLine.textContent = ' _';

    phrase.appendChild(underLine);
}
