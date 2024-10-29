const cells = document.querySelectorAll('[data-cell]');
const messageDisplay = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(e) {
    const cell = e.target;
    const index = [...cells].indexOf(cell);

    if (board[index] !== '' || !isGameActive) {
        return;
    }

    board[index] = currentPlayer;
    // Substituindo as imagens das cartas
    cell.innerHTML = currentPlayer === 'X' 
        ? '<img src="card-coração.png" alt="Coração" />' 
        : '<img src="card-espadas.png" alt="Espadas" />';

    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            isGameActive = false;
            messageDisplay.textContent = `Jogador ${board[a]} venceu!`;
            restartButton.style.display = 'block';
            return;
        }
    }

    if (!board.includes('')) {
        isGameActive = false;
        messageDisplay.textContent = 'Empate!';
        restartButton.style.display = 'block';
    }
}

function restartGame() {
    isGameActive = true;
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    messageDisplay.textContent = '';
    restartButton.style.display = 'none';

    cells.forEach(cell => {
        cell.innerHTML = '';
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);

