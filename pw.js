// Set the date we're counting down to
var countDownDate = new Date("Aug 5, 2023 10:30:27").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the countdown to wedding day!
  document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "We're married! #SohWongSuckers";
  }
}, 1000);

// Add event listener for the password button
var input = document.getElementById("codeword");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("pwbutton").click();
  }
});

// Check which part of wed they are invited for
function checkPassword() {
	var codeword = document.getElementById("codeword").value;
	var result = document.getElementById("result");
	if (codeword === "ironman" || codeword === "wedding" || codeword === "thanos") {
	  document.getElementById("password-overlay").style.display = "none";
	  setWedDetails(codeword);
	} else {
	  result.innerHTML = "Oh no. You're not recognized! Are you a panda?";
	  document.getElementById("codeword").value = "";
	}
  }

function setWedDetails(codeword) {
	if (codeword === "ironman") {
		// Invited to both
		document.getElementById("wed-date").innerHTML = "5 & 6 August 2023";
		document.getElementById("rsvp-form").src = "https://docs.google.com/forms/d/e/1FAIpQLSeRoLTM8QEt5WcnHre_gAoA887KZkIzZ7ibyJTmsWiEBxcnXA/viewform?usp=sf_link";
		
	} else if (codeword === "wedding") {
		// Invited to banquet only
		document.getElementById("wed-date").innerHTML = "6 August 2023";
		document.getElementById("church-deets").style.display = "none";
		document.getElementById("church-loc").style.display = "none";
		document.getElementById("rsvp-form").src = "https://docs.google.com/forms/d/e/1FAIpQLSdrfhy0iPpJP_alynr6wH-y5M9SwsKtUUeAxh9uX1Aor_H67g/viewform?usp=sf_link";
	} else if (codeword === "thanos") {
		// Invited to church only
		document.getElementById("wed-date").innerHTML = "5 August 2023";
		document.getElementById("din-loc").style.display = "none";
		document.getElementById("din-deets").style.display = "none";
		document.getElementById("rsvp-form").src = "https://docs.google.com/forms/d/e/1FAIpQLSek7SrmK713Hu5JKctDbtUowTdTm6gr7eoQkU2rOuDmj7DxSA/viewform?usp=sf_link";
	}

}


//tic tac toe https://www.codebrainer.com/blog/tic-tac-toe-javascript-game
const PLAYER_X_CLASS = 'x'
const PLAYER_O_CLASS = 'circle'
const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]

const cellElements = document.querySelectorAll('[data-cell]')
const boardElement = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.getElementById('winningMessageText')
let isPlayer_O_Turn = false

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
	isPlayer_O_Turn = false
	cellElements.forEach(cell => {
		cell.classList.remove(PLAYER_X_CLASS)
		cell.classList.remove(PLAYER_O_CLASS)
		cell.removeEventListener('click', handleCellClick)
		cell.addEventListener('click', handleCellClick, { once: true })
	})
	setBoardHoverClass()
	winningMessageElement.classList.remove('show')
}

function handleCellClick(e) {
	const cell = e.target
	const currentClass = isPlayer_O_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS
	placeMark(cell, currentClass)
	if (checkWin(currentClass)) {
		endGame(false)
	} else if (isDraw()) {
		endGame(true)
	} else {
		swapTurns()
		setBoardHoverClass()
	}
}


function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "Draw!"
    } else {
        winningMessageTextElement.innerText = `${isPlayer_0_Turn ? "J" : "R"} wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
	return [...cellElements].every(cell => {
		return cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_O_CLASS)
	})
}
function placeMark(cell, currentClass) {
	cell.classList.add(currentClass)
}

function swapTurns() {
	isPlayer_O_Turn = !isPlayer_O_Turn
}

function setBoardHoverClass() {
	boardElement.classList.remove(PLAYER_X_CLASS)
	boardElement.classList.remove(PLAYER_O_CLASS)
	if (isPlayer_O_Turn) {
		boardElement.classList.add(PLAYER_O_CLASS)
	} else {
		boardElement.classList.add(PLAYER_X_CLASS)
	}
}
function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some(combination => {
		return combination.every(index => {
			return cellElements[index].classList.contains(currentClass)
		})
	})
}