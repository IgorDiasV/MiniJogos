width = 10;

const ricky = [
    [0, width, width*2, 1],
    [0, 1, 2, width+2],
    [0, width, width*2, width*2-1],
    [0, width, width+1, width+2]
];

const z = [
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1]
];

const teewee = [
    [1, width, width+1, width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1, width, width+1, width*2+1]
];

const smashboy = [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1]
];

const hero = [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3]
];

const pieces = [ricky, z, teewee, smashboy, hero]

currentPiece = getPiece()
currentPosition = 4
currentRotation = 0


function startBoard(){
    let board = document.getElementById("board");

    for(let i = 0; i < 20; i++){
        for(let j=0 ; j< 10; j ++){
            let div = document.createElement("div");
            board.appendChild(div);
        }      
    }
}

startBoard();

let squares = Array.from(document.querySelectorAll('.grid div'));

function getPiece(){
    posPiece =  Math.floor(Math.random() * pieces.length);
    currentRotation = 0;
    return pieces[posPiece][currentRotation]
}

function rotation(){
    undraw();
    currentRotation = (currentRotation+1)%4
    currentPiece = pieces[posPiece][currentRotation];
    draw()
}

function undraw(){
    currentPiece.forEach(index => {
        squares[currentPosition + index].style.backgroundColor = "";
    });
}

function draw(){
    currentPiece.forEach(index => {
        squares[currentPosition + index].style.backgroundColor = "white";
    });
}

function possibleMovementDown(){
    let auxCurrentPosition = currentPosition + width;

    if(currentPiece.some(index => Math.ceil((auxCurrentPosition + index)/10) > 20)){
        return false;
    }

    return !currentPiece.some(index => squares[auxCurrentPosition + index].style.backgroundColor == "white");
}

function possibleMovementLeft(){
    if(currentPiece.some(index => (currentPosition + index)%10 == 0)){
        return false;
    }

    return !currentPiece.some(index => squares[currentPosition + index].style.backgroundColor == "white");
}

function possibleMovementRight(){
    if(currentPiece.some(index => (currentPosition + index)%10 == 9)){
        return false;
    }

    return !currentPiece.some(index => squares[currentPosition + index].style.backgroundColor == "white");
}

function moveDown(){
    undraw();
    
    if(!possibleMovementDown()){
        draw();
        currentPosition = 4;
        currentPiece = getPiece()
        return;
    }

    currentPosition += width
    draw();
}

function moveLeft(){
    undraw();
    if(!possibleMovementLeft()){
        draw();
        return;
    }
    currentPosition -= 1;
    draw();
}

function moveRight(){
    undraw();

    if(!possibleMovementRight()){
        draw();
        return;
    }

    currentPosition += 1;
    draw();
}

function control(e) {
    if(e.keyCode === 37) {
        moveLeft();
    } else if (e.keyCode === 38) {
        rotate();
    } else if (e.keyCode === 39) {
        moveRight();
    } else if (e.keyCode === 40) {
        moveDown();
    }else if(e.keyCode == 32){
        rotation();
    }
}

document.addEventListener('keyup', control);

setInterval(moveDown, 800);
