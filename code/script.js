// All the DOM selectors stored as short variables
const board = document.getElementById('board')
const questions = document.getElementById('questions')
const restartButton = document.getElementById('restart')
const findOut = document.getElementById('filter')
const winOrLose = document.getElementById('winOrLose')
const winOrLoseText = document.getElementById('winOrLoseText')
const playAgain = document.getElementById('playAgain')
const counter = document.getElementById('counter')
var count = 0;

// Array with all the characters, as objects
const CHARACTERS = [
  {
    name: 'Jabala',
    img: 'images/jabala.svg',
    hair: 'hidden',
    eyes: 'hidden',
    accessories: ['glasses', 'hat'],
    other: []
  },
  {
    name: 'Jack',
    img: 'images/jack.svg',
    hair: 'hidden',
    eyes: 'blue',
    accessories: ['hat'],
    other: []
  },
  {
    name: 'Jacques',
    img: 'images/jacques.svg',
    hair: 'grey',
    eyes: 'blue',
    accessories: ['hat'],
    other: ['smoker']
  },
  {
    name: 'Jai',
    img: 'images/jai.svg',
    hair: 'black',
    eyes: 'brown',
    accessories: [],
    other: []
  },
  {
    name: 'Jake',
    img: 'images/jake.svg',
    hair: 'yellow',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'James',
    img: 'images/james.svg',
    hair: 'brown',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jana',
    img: 'images/jana.svg',
    hair: 'black',
    eyes: 'hidden',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jane',
    img: 'images/jane.svg',
    hair: 'yellow',
    eyes: 'hidden',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jaqueline',
    img: 'images/jaqueline.svg',
    hair: 'orange',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },

  {
    name: 'Jazebelle',
    img: 'images/jazebelle.svg',
    hair: 'purple',
    eyes: 'hidden',
    accessories: ['glasses'],
    other: ['smoker']
  },
  {
    name: 'Jean',
    img: 'images/jean.svg',
    hair: 'brown',
    eyes: 'blue',
    accessories: ['glasses', 'hat'],
    other: ['smoker']
  },
  {
    name: 'Jeane',
    img: 'images/jeane.svg',
    hair: 'brown',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jed',
    img: 'images/jed.svg',
    hair: 'orange',
    eyes: 'green',
    accessories: ['glasses', 'hat'],
    other: ['smoker']
  },
  {
    name: 'Jenni',
    img: 'images/jenni.svg',
    hair: 'white',
    eyes: 'hidden',
    accessories: ['hat'],
    other: []
  },
  {
    name: 'Jeri',
    img: 'images/jeri.svg',
    hair: 'orange',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jerry',
    img: 'images/jerry.svg',
    hair: 'hidden',
    eyes: 'blue',
    accessories: ['hat'],
    other: []
  },
  {
    name: 'Jess',
    img: 'images/jess.svg',
    hair: 'black',
    eyes: 'blue',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jocelyn',
    img: 'images/jocelyn.svg',
    hair: 'black',
    eyes: 'brown',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jon',
    img: 'images/jon.svg',
    hair: 'brown',
    eyes: 'green',
    accessories: ['glasses'],
    other: []
  },
  {
    name: 'Jordan',
    img: 'images/jordan.svg',
    hair: 'yellow',
    eyes: 'hidden',
    accessories: ['glasses', 'hat'],
    other: []
  },
  {
    name: 'Josephine',
    img: 'images/josephine.svg',
    hair: 'grey',
    eyes: 'brown',
    accessories: [],
    other: []
  },
  {
    name: 'Josh',
    img: 'images/josh.svg',
    hair: 'yellow',
    eyes: 'green',
    accessories: [],
    other: []
  },
  {
    name: 'Jude',
    img: 'images/jude.svg',
    hair: 'black',
    eyes: 'green',
    accessories: [],
    other: []
  },
  {
    name: 'Julie',
    img: 'images/julie.svg',
    hair: 'black',
    eyes: 'brown',
    accessories: ['glasses', 'hat'],
    other: []
  },
]

// Global variables
let secret,
 charactersInPlay,
 currentQuestion,
 personToCheck


// Draw the game board
const generateBoard = () => {
  board.innerHTML = ''
  charactersInPlay.forEach((person) => {
    board.innerHTML += `
      <div class="card">
        <p>${person.name}</p>
        <img src=${person.img} alt=${person.name}>
        <div class="guess">
          <span>Guess on ${person.name}?</span>
          <button class="filled-button small" onclick="guess('${person.name}')">Guess</button>
        </div>
      </div>
    `
  })
}


// Randomly select a person from the characters array and set as the value of the variable called secret
const setSecret = () => {
  secret = charactersInPlay[Math.floor(Math.random() * charactersInPlay.length)]
}

  
// This function to start (and restart) the game
const start = () => {
  count = 0
  counter.innerHTML = `Count: 0`
  
  

  // Here we're setting charactersInPlay array to be all the characters to start with
  charactersInPlay = CHARACTERS
  // What else should happen when we start the game?
  generateBoard()  //Invoking the function and displays the board
  winOrLose.style.display = "none";
  setSecret();
  winOrLose.classList.remove('active');
  selectQuestion();
}


// setting the currentQuestion object when you select something in the dropdown
const selectQuestion = () => {
  const category = questions.options[questions.selectedIndex].parentNode.label
  const value = questions.options[questions.selectedIndex].value
  
  // This variable stores what option group (category) the question belongs to.
  // We also need a variable that stores the actual value of the question we've selected.
  // const value =

  currentQuestion = {
    category: category,
    value: value
  }
}

// This function should be invoked when you click on 'Find Out' button.
 
const checkQuestion = () => {
  const { category, value } = currentQuestion;
  if (category === 'eyes') {
    if (value === secret.eyes) {
      filterCharacters(true);
    } else {
      filterCharacters(false);
    }
  } else if (category === 'hair') {
    if (value === secret.hair) {
      filterCharacters(true);
    } else {
      filterCharacters(false);
    }
  } else if (category === 'accessories' || category === 'other') {
    if (secret.accessories.includes(value) || secret.other.includes(value)) {
      filterCharacters(true);
    } else {
      filterCharacters(false);
    }
  }
    }


// It'll filter the characters array and redraw the game board.
const filterCharacters = (keep) => {
  const { category, value } = currentQuestion
  // Show the correct alert message for different categories
  console.log(keep)
  if (category === 'accessories') {
    if (keep) {
      alert(
        `Yes, the person wears ${value}! Keep all people that wears ${value}`
      )
      charactersInPlay = charactersInPlay.filter((person) => person[category].includes(value))
    } else {
      alert(
        `No, the person doesn't wear ${value}! Remove all people that wears ${value}`)
        charactersInPlay = charactersInPlay.filter((person) => !person[category].includes(value))
       }
  } else if (category === 'other') {
    if (keep) {
       alert(`Yes, the person has ${value}! Keep all people with ${value}`)
       charactersInPlay = charactersInPlay.filter((person) => person[category].includes(value))
    } else {
      `No, the person doesnt have ${value}! Remove all people with ${value}`
      charactersInPlay = charactersInPlay.filter((person) => !person[category].includes(value))
    }
      
  } else if (category === 'eyes' || category === 'hair') {

    if (keep) {
       alert(`yes, the person has ${value} ${category}! Keep all people with ${value} ${category}`)
       charactersInPlay = charactersInPlay.filter((person) => person[category] === value)
    } else {
      alert(`No, the person doesnt have ${value} ${category}! Remove all people with ${value} ${category}`)
      charactersInPlay = charactersInPlay.filter((person) => person[category] !== value)
    }
  } 
  generateBoard()
  
  
  

  // Invoke a function to redraw the board with the remaining people.
}

// when clicking guess, the player first have to confirm that they want to make a guess.
  // store the interaction from the player in a variable.
   //remember the confirm() ?
  // If the player wants to guess, invoke the checkMyGuess function.

   const guess = (personToConfirm) => {
   const userGuess = confirm (`Guess on ${personToConfirm}?`)

   if (userGuess) {
   checkMyGuess(personToConfirm)
   } else {
     alert('Ok, let`s go back')
     
   }
  }
  // If you confirm, this function is invoked
  // 1. Check if the personToCheck is the same as the secret person's name
  // 2. Set a Message to show in the win or lose section accordingly
  // 3. Show the win or lose section
  // 4. Hide the game board
const checkMyGuess = (personToCheck) => {
  increaseCount()
  if (personToCheck === secret.name) {
    let displayWinOrLose = () => {
      winOrLose.style.display = "flex";
      winOrLoseText.innerHTML = `Well done ${personToCheck} was correct<br>Took ${count} tries`
    }
    board.innerHTML =''
    displayWinOrLose()
  } else {
    let displayWinOrLose = () => {
      winOrLose.style.display = "flex";
      winOrLoseText.innerHTML = `nope! ${personToCheck} was wrong! ${secret.name} was the correct answer<br>Took ${count} tries`
    }
    board.innerHTML =''
    displayWinOrLose()
  }
}

const increaseCount = () => {
  count++;
  counter.textContent = `Count: ${count}`
}

// Invokes the start function when website is loaded

start()





// All the event listeners
restartButton.addEventListener('click', start)
playAgain.addEventListener('click', start)
findOut.addEventListener('click',() => {
  increaseCount()
  selectQuestion()
  checkQuestion()
})
