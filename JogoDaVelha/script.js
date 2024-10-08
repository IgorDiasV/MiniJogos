class Player  {
    constructor(name, symbol){
        this.name = name;
        this.symbol = symbol;
        this.score = 0;
    }
}

function chageScore(){
    let scorePlayer1 = document.getElementById("scorePlayer1")
    let scorePlayer2 = document.getElementById("scorePlayer2")

    scorePlayer1.textContent = player1.name + ": " + player1.score;
    scorePlayer2.textContent = player2.name + ": " + player2.score;
}
function setPlayers(){
    let namePlayer1 = document.getElementById("namePlayer1").value;
    namePlayer1 = namePlayer1 == "" ? "Jogador1" : namePlayer1;
    player1 =  new Player(namePlayer1, 'X');

    let namePlayer2 = document.getElementById("namePlayer2").value;
    namePlayer2 = namePlayer2 == "" ? "Jogador2" : namePlayer2;
    player2 =  new Player(namePlayer2, 'O');

    chageScore();
}

function startGame(){

    setPlayers();

    document.getElementById('game').classList.remove('d-none');
    document.getElementById('startButton').classList.add('d-none');

    cells = document.querySelectorAll('.cell');

    currentPlayer = player1;
    gameState = ["", "", "", "", "", "", "", "", ""];
    winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
}

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    if (gameState[cellIndex] !== "" || checkWinner()) {
        return;
    }

    gameState[cellIndex] = currentPlayer.symbol;
    cell.textContent = currentPlayer.symbol;

    if (checkWinner()) {
        currentPlayer.score += 1;
        chageScore();
        alert(`Parabens ${currentPlayer.name}, você venceu!`);
    } else if (!gameState.includes("")) {
        alert("Empate!");
    }

    currentPlayer = currentPlayer === player1 ? player2 : player1;
}

function checkWinner() {
    return winningConditions.some(condition => {
        return condition.every(index => gameState[index] === currentPlayer.symbol);
    });
}

function restartGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    currentPlayer = player1;
}

   