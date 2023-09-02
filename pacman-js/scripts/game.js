// DOM
const cnv = document.getElementById("canvas");
const ctx = cnv.getContext("2d");
const pacmanFrames = document.getElementById("animations");
const ghostFrames = document.getElementById("ghosts");
const bPlay = document.getElementById("bPlay");

// Game Constants
const DIRECTION_RIGHT = 4;
const DIRECTION_UP = 3;
const DIRECTION_LEFT = 2;
const DIRECTION_DOWN = 1;

const pacman_beginning = loadAudio("audios/pacman_beginning.wav");
const pacman_chomp = loadAudio("audios/pacman_chomp.wav");
const pacman_death = loadAudio("audios/pacman_death.wav");

// Context Tools
function createRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

// Game Variables
let map = ""; resetMap();
let fps = 30;
let wallColor = "#342DCA";
let wallInnerColor = "black";
let foodColor = "#FEB897";
let fontColor = "white";
let blockSize = 20;
let wallSpaceWidht = blockSize / 1.5;
let wallOffset = (blockSize - wallSpaceWidht) / 2;
let foodCount = 0;
let score = 0;
let lives = 3;
let gameInterval = "";

let pacman = "";
let ghosts = [];
let ghostCount = 4;
let ghostRandomTargets = [
    {x: 1 * blockSize, y: 1 * blockSize},
    {x: 1 * blockSize, y: (map.length-2) * blockSize},
    {x: (map[0].length-2) * blockSize, y: blockSize},
    {x: (map[0].length-2) * blockSize, y: (map.length-2) * blockSize}
];
let ghostLocations = [
    {x:0, y:0},
    {x:176, y:0},
    {x:0, y:121},
    {x:176, y:121}
];

for(let i = 0; i < map.length; i++) {
    for(let j = 0; j < map[0].length; j++) {
        if(map[i][j] == 2) {
            foodCount++;
        }
    }
}

// Game Functions
function loadAudio(src) {
    let audio = new Audio();
    audio.src = src;
    audio.load();
    audio.volume = 0.2;
    return audio;
}

function resetMap() {
    map = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
        [1,2,1,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,1,2,1],
        [1,2,1,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,1,2,1],
        [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
        [1,2,1,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,1,2,1],
        [1,2,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,2,1],
        [1,1,1,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,1,1,1],
        [0,0,0,0,1,2,1,2,2,2,2,2,2,2,1,2,1,0,0,0,0],
        [1,1,1,1,1,2,1,2,1,1,2,1,1,2,1,2,1,1,1,1,1],
        [1,2,2,2,2,2,2,2,1,2,2,2,1,2,2,2,2,2,2,2,1],
        [1,1,1,1,1,2,1,2,1,2,2,2,1,2,1,2,1,1,1,1,1],
        [0,0,0,0,1,2,1,2,1,1,1,1,1,2,1,2,1,0,0,0,0],
        [0,0,0,0,1,2,1,2,2,2,2,2,2,2,1,2,1,0,0,0,0],
        [1,1,1,1,1,2,2,2,1,1,1,1,1,2,2,2,1,1,1,1,1],
        [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
        [1,2,1,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,1,2,1],
        [1,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,1],
        [1,1,2,2,1,2,1,2,1,1,1,1,1,2,1,2,1,2,2,1,1],
        [1,2,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,2,1],
        [1,2,1,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,1,2,1],
        [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];
}

function createPacman() {
    pacman = new Pacman(blockSize, blockSize, blockSize, blockSize, blockSize / 5);
}

function createGhosts() {
    ghosts = [];
    for(let i = 0; i < ghostCount; i++) {
        let newGhost = new Ghost(
            9 * blockSize + (i % 2 == 0 ? 0 : 1) * blockSize,
            10 * blockSize + (i % 2 == 0 ? 0 : 1) * blockSize,
            blockSize,
            blockSize,
            pacman.speed / 2,
            ghostLocations[i % 4].x,
            ghostLocations[i % 4].y,
            124,
            116,
            6 + i
        );
        ghosts.push(newGhost);
    }
}

function gameLoop() {
    draw();
    update();
}

function start() {
    resetMap();
    createPacman();
    createGhosts();
    pacman_beginning.play();
    bPlay.style.display = "none";
    gameInterval = setInterval(gameLoop, 1000/fps);
}

function update() {
    pacman.moveProcess();
    pacman.eat();
    for(let i = 0; i < ghosts.length; i++) {
        ghosts[i].moveProcess();
    }

    if (score == foodCount) {
        draw();
        clearInterval(gameInterval);
        drawWin();
        bPlay.style.display = "block";
    }

    if(pacman.checkGhostCollision()) {
        restartGame();
    }
}

function draw() {
    createRect(0, 0, cnv.width, cnv.height, "black")
    drawWalls();
    drawFoods();
    pacman.draw();
    drawScore();
    drawLives();
    drawGhosts();
}

function restartGame() {
    if(lives == 0) {
        gameOver();
        return;
    }
    createPacman();
    createGhosts();
    lives--;
}

function gameOver() {
    clearInterval(gameInterval);
    drawGameOver();
    resetMap();
    score = 0;
    lives = 3;
    bPlay.style.display = "block";
}

function drawScore() {
    ctx.font = "20px Emulogic";
    ctx.fillStyle = "white";
    ctx.fillText(
        "Score:" + score,
        15,
        blockSize * (map.length + 1) + 10
    );
}

function drawLives() {
    ctx.save();
    ctx.font = "20px Emulogic";
    ctx.fillStyle = "white";
    ctx.fillText(
        "Lives: ",
        220,
        blockSize * (map.length + 1) + 10
    );
    for(let i = 0; i < lives; i++) {
        ctx.drawImage(
            pacmanFrames,
            2 * blockSize,
            0,
            blockSize,
            blockSize,
            342 + i * blockSize,
            blockSize * map.length + 10,
            blockSize,
            blockSize
        );
    }
    ctx.restore();
}

function drawGameOver() {
    ctx.save();
    let text = "Game Over!",
        textX = cnv.width/2,
        textY = 150;
    ctx.textAlign = "center";
    ctx.font = "30px Emulogic";
    ctx.fillStyle = "red";
    ctx.strokeStyle = "black"
    ctx.lineWidth = 2;
    ctx.fillText(text, textX, textY);
    ctx.strokeText(text, textX, textY);
    ctx.restore();
}

function drawWin() {
    ctx.save();
    let text = "Winner!",
        textX = cnv.width/2,
        textY = 150;
    ctx.textAlign = "center";
    ctx.font = "30px Emulogic";
    ctx.fillStyle = "yellow";
    ctx.strokeStyle = "black"
    ctx.lineWidth = 2;
    ctx.fillText(text, textX, textY);
    ctx.strokeText(text, textX, textY);
    ctx.restore();
}

function drawGhosts() {
    for(let i = 0; i < ghosts.length; i++) {
        ghosts[i].draw();
    }
}

function drawWalls() {
    for(let i = 0; i < map.length; i++) {
        for(let j = 0; j < map[0].length; j++) {
            if(map[i][j] == 1) {
                // then it is a wall
                createRect(
                    j*blockSize,
                    i*blockSize,
                    blockSize,
                    blockSize,
                    wallColor
                );
            }
            if(j>0 && map[i][j-1] == 1) {
                createRect(
                    j*blockSize,
                    i*blockSize + wallOffset,
                    wallSpaceWidht + wallOffset,
                    wallSpaceWidht,
                    wallInnerColor
                );
            }
            if(j<map.length-1 && map[i][j+1] ==1){
                createRect(
                    j*blockSize + wallOffset,
                    i*blockSize + wallOffset,
                    wallSpaceWidht + wallOffset,
                    wallSpaceWidht,
                    wallInnerColor
                );
            }
            if(i>0 && map[i-1][j] == 1) {
                createRect(
                    j*blockSize + wallOffset,
                    i*blockSize,
                    wallSpaceWidht,
                    wallSpaceWidht + wallOffset,
                    wallInnerColor
                );
            }
            if(i < map.length-1 && map[i+1][j] == 1){
                createRect(
                    j*blockSize + wallOffset,
                    i*blockSize + wallOffset,
                    wallSpaceWidht,
                    wallSpaceWidht + wallOffset,
                    wallInnerColor
                );
            }
        }
    }
}

function drawFoods() {
    for(let i = 0; i < map.length; i++) {
        for(let j = 0; j < map[0].length; j++) {
            if(map[i][j] == 2) {
                createRect(
                    j * blockSize + blockSize / 3,
                    i * blockSize + blockSize /3,
                    blockSize / 3,
                    blockSize / 3,
                    foodColor
                );
            }
        }
    }
}

// key Events
window.addEventListener("keydown", (e) => {
    let k = e.keyCode;

    setTimeout(() => {
        if(k == 37 || k == 65) {
            // Left
            pacman.nextDirection = DIRECTION_LEFT;
        } else if(k == 38 || k == 87) {
            // Up
            pacman.nextDirection = DIRECTION_UP;
        } else if(k == 39 || k == 68) {
            // Right
            pacman.nextDirection = DIRECTION_RIGHT;
        } else if(k == 40 || k == 83) {
            // Down
            pacman.nextDirection = DIRECTION_DOWN;
        }
    });
});