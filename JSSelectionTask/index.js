// Variable to track which player's turn it is to play.
let currentPlayer = 1;

// Object to keep track of healths of each player.
// Initial healths are 100 each.
let currentHealth = {
  player1: 100,
  player2: 100
};

// Object that stores healths of each player.
// When health of either player becomes 3 or more, it wins the game.
let scores = {
  player1: 0,
  player2: 0
};

/*
  Function: playGame
  Description: Called everytime user hits 'Start Game' button.
               Randomly generates power for each player alternatively and updates healths.
               Also determines which player has won the current round and current game.
  Args: --
  Returns: --
*/
function playGame() {
  // If some player has already won previously, reset everything for next round.
  if (checkIfWon ()) {
    resetGame()
    return
  }

  // For each round, each player has a default health of 100
  currentHealth = { player1: 100, player2: 100 };

  while (true) {
    if (checkIfWon ()) {
      resetGame ()
      return
    }

    // Get the name of player being attacked and their new power.
    const currentPlayerName = playerFromId(3 - currentPlayer);
    const newPlayerPower =
      currentHealth[currentPlayerName] - Math.floor(Math.random() * 5);

    // Update the health of player being hit by opponent.
    currentHealth = { ...currentHealth, [currentPlayerName]: newPlayerPower };

    // If this player has lost the round, increment score of player who fired.
    // Also check if the game is over
    if (newPlayerPower <= 0) {
      updateScore (currentPlayerName)
      checkIfWon ()
      break
    }

    if (checkIfWon ()) {
      break
    }

    // Toggle current player so that he fires next.
    toggleCurrentPlayer();
  }
}

/*
  Function: toggleCurrentPlayer
  Description: Updates currentPlayer so that he can fire in the next round
  Args: --
  Returns: --
*/
function toggleCurrentPlayer() {
  currentPlayer = 3 - currentPlayer;
}

/*
  Function: updateScore
  Description: Increments score of given player by 1. Also updates the view.
  Args: playerName (string) -> player whose score needs to be incremented
  Returns: --
*/
function updateScore (playerName) {
  scores = {
    ...scores,
    [playerName]: scores[playerName] + 1
  };

  // Mark this new score in HTML
  document.getElementById (`${playerName}Score`).innerText = scores[playerName]
}

/*
  Function: playerFromId
  Description: Takes the player number and convert to id.
               Ex. 1 becomes 'player1'. Useful for DOM manipulation
  Args: id (number) -> Id of player
  Returns: (string)
*/
function playerFromId(id) {
  return `player${id}`;
}

/*
  Function: markAsWinner
  Description: Marks the given player as winner by updating the DOM.
  Args: playerId (string) -> player id in the form 'player1' or 'player2'
  Returns: --
*/
function markAsWinner(playerId) {
  const resultHolder = document.getElementById("gameResult");

  resultHolder.innerText = `Player${playerId} won the match!`;
}

/*
  Function: checkIfWon
  Description: Checks if either of the player has won. A player wins if score is 3 or more.
  Args: --
  Returns: (bool) -> true if either player won, false otherwise
*/
function checkIfWon() {

  if (scores["player1"] == 3) {
    markAsWinner(1)
    return true
  } else if (scores["player2"] == 3) {
    markAsWinner(2)
    return true
  }

  return false
}

/*
  Function: resetGame
  Description: Resets the game by updating the DOM and resetting all variables to their default values
  Args: --
  Returns: --
*/
function resetGame() {
  document.getElementById ('player1Score').innerText = 0
  document.getElementById ('player2Score').innerText = 0
  document.getElementById ('gameResult').innerText = ""

  scores = {
    player1: 0,
    player2: 0
  }

  currentHealth = {
    player1: 100,
    player2: 100
  }
}
