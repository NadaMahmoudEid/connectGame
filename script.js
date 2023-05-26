// Define the grid size and characters
const gridSize = 5;
const characters = [
  ['ا', 'ب', 'ي', ],
  ['ج', 'ح', 'خ', 'د', 'ذ'],
  ['ر', 'ز', 'س', 'ش', 'ص']
];

// Define the list of valid words for each level
const validWords = [
  ['باب', 'تمر', 'جسم', 'حقل', 'دمعة', 'سماء', 'شجرة', 'صدقة', 'ضوء', 'طائر'],
  ['دقيقة', 'خضراء', 'عقل', 'قهوة', 'عقد', 'ضحكة', 'صمت', 'ظلام', 'طريق', 'شمس'],
  ['شجاعة', 'صبر', 'طائرة', 'ضوء', 'ظروف', 'عاطفة', 'قرار', 'خيال', 'دعاء', 'مشاعر']
];

// Generate the game grid
const gameGrid = document.querySelector('.game-grid');
const formedWordDisplay = document.getElementById('formed-word');
const wordListDisplay = document.getElementById('word-list');
let formedWord = '';
let wordsFound = [];

let currentLevel = 0;
let currentCharacters = characters[currentLevel];

function generateGameGrid(characters) {
  gameGrid.innerHTML = '';

  for (let i = 0; i < currentLevel+3;i++) {
    const rowIndex = Math.floor(i / gridSize);
    const colIndex = i % gridSize;
    const character = characters[colIndex];

    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = '';

    const characterSpan = document.createElement('span');
    characterSpan.classList.add('character');
    characterSpan.textContent = character;

    cell.appendChild(characterSpan);
    gameGrid.appendChild(cell);

    // Add click event listener to each cell
    cell.addEventListener('click', function() {
      formedWord += character;
      formedWordDisplay.textContent = formedWord;
    });

    // Add double click event listener to each cell
    cell.addEventListener('dblclick', function() {
      checkWord();
    });
  }
}

function checkWord() {
  if (validWords[currentLevel].includes(formedWord)) {
    wordsFound.push(formedWord);
    const wordItem = document.createElement('li');
    wordItem.textContent = formedWord;
    wordListDisplay.appendChild(wordItem);
    wordItem.classList.add("correct-word");
  } else {
    wordsFound.push(formedWord);
    const wordItem = document.createElement('li');
    wordItem.textContent = formedWord;
    wordListDisplay.appendChild(wordItem);
    wordItem.classList.add("incorrect-word");
  }

  resetWord();
}

function resetWord() {
  formedWord = '';
  formedWordDisplay.textContent = '';
}

// Level switch function
function switchLevel(levelIndex) {
  currentLevel = levelIndex;
  formedWord = '';
  wordsFound = [];
  formedWordDisplay.textContent = '';
  wordListDisplay.innerHTML = '';

  currentCharacters = characters[currentLevel];
  generateGameGrid(currentCharacters);
}

// Character switch button click event
const switchButton = document.getElementById('switch-button');
switchButton.addEventListener('click', function() {
  switchCharacters();
});

function switchCharacters() {
  const newCharacters = [];
  for (let i = 0; i < currentCharacters.length; i++) {
    const charSet = characters[currentLevel];
    const charIndex = (charSet.indexOf(currentCharacters[i]) + 1) % charSet.length;
    newCharacters.push(charSet[charIndex]);
  }
  currentCharacters = newCharacters;
  generateGameGrid(currentCharacters);
}

// Next Level button click event
const nextLevelButton = document.getElementById('next-level-button');
nextLevelButton.addEventListener('click', function() {
  if (currentLevel < validWords.length - 1) {
    switchLevel(currentLevel + 1);
  } else {
    alert('Congratulations! You have completed all levels.');
  }
});

// Initial level setup
switchLevel(currentLevel);
