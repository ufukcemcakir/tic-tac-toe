document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    const playerx = document.querySelector('.px');
    const playero = document.querySelector('.po');
    const pxx = document.querySelector('.pxx');
    const poo = document.querySelector('.poo');

    playerx.addEventListener('click', () => updateName(pxx));
    playero.addEventListener('click', () => updateName(poo));
    
    function updateName(p) {
        const name = prompt('Enter a new name');
        p.textContent = `${name}`;
    }

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('button');
        cell.classList.add('cell');
        cell.setAttribute('data-cell-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }

    function handleCellClick(e) {
        const cell = e.target;
        const cellIndex = parseInt(cell.getAttribute('data-cell-index'));

        if (gameState[cellIndex] !== '' || !gameActive) return;

        gameState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        
        checkResult();
    }

    function checkResult() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            if(currentPlayer === 'X'){
                announceWinner(pxx.textContent);
            }else if(currentPlayer === 'O'){
                announceWinner(poo.textContent);
            }
            gameActive = false;
            return;
        }

        if (!gameState.includes('')) {
            announceDraw();
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function announceWinner(player) {
        alert(`${player} wins!`);
    }

    function announceDraw() {
        alert("It's a draw!");
    }

    document.getElementById('reset-button').addEventListener('click', resetGame);

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
    });
}
});