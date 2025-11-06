const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let board = Array(9).fill('');
let gameActive = true;

const winningCombinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

function handleClick(e) {
  let index = -1;
  for(let i=0; i< cells.length; i++){
    if(cells[i] === e.target){
      index = i;
      break;
    }
  }

  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins! 🎉`;
    gameActive = false;
  } else if (isBoardFull()) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const combo = winningCombinations[i];
    let win = true;
    for (let j = 0; j < combo.length; j++) {
      if (board[combo[j]] !== currentPlayer) {
        win = false;
        break;
      }
    }
    if (win) return true;
  }
  return false;
}

function isBoardFull() {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') return false;
  }
  return true;
}

function resetGame() {
  for (let i = 0; i < board.length; i++) board[i] = '';
  gameActive = true;
  currentPlayer = 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  for (let i = 0; i < cells.length; i++) cells[i].textContent = '';
}

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener('click', handleClick);
}
resetButton.addEventListener('click', resetGame);