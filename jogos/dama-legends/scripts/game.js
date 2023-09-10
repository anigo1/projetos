// DOM
const cnv = document.getElementById("canvas");
const ctx = cnv.getContext('2d');

// Screen Sizes
const DEVICE = { width: window.screen.width, height: window.screen.height }
const SD = { width: 720, height: 480}
const HD = { width: 1280, height: 720 }
const FHD = { width: 1920, height: 1080 }
cnv.x = 0;
cnv.y = 0;
cnv.width = HD.width;
cnv.height = HD.height;

// Game Variables
let fps = 60;
let gameAnimation = new Animacao();
let keyPressed = undefined;
let blockSize = 60;
let map = [
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1]
];

// Object Settings
let bPlay = new Button("Jogar", 0, cnv.height/2-80, cnv.width/3, 80);
let bSettings = new Button("Configurações", 0, cnv.height/2, cnv.width/3, 80);

// Load Request
let background = new Imagem("media/images/background.png", 0, 0, cnv.width, cnv.height);
let music = loadAudio("media/audios/Here it Comes - TrackTribe.mp3");

// default settings
function setDefaultSettings() {
    bPlay.background.color = "#111";
    bSettings.background.color = "#111";
}

// Game Functions
function start() {
    gameAnimation.loop = function() {
        loop();
    };
    gameAnimation.play();
}

function draw() {
    drawGame(
        cnv.width/2 - (blockSize*8/2),
        cnv.height/2 - (blockSize*8/2),
        blockSize
    );
}

function update() {
    // Todo
}

function loop() {
    draw();
    update();
}

// Draws
function fillCanvas(color) {
    createRect(0, 0, cnv.width, cnv.height, color || "black");
}

function drawLoading() {
    let progressBar = new ProgressBar(30, cnv.height-50, cnv.width-60, 20);
    let texto = new Texto();
    let animation = new Animacao();
    animation.loop = function() {
        progressBar.progress++;
        fillCanvas();
        progressBar.draw();
        texto.text = "Carregando " + Number.parseInt(progressBar.progress) + "%";
        texto.x = progressBar.x;
        texto.y = progressBar.y-25;
        texto.align = "left";
        texto.baseline = "top";
        texto.draw();
    };
    animation.onfinish = function() {
        drawIntro();
    }
    animation.condition = function() {
        return progressBar.progress >= 100;
    }
    animation.play();
}

function drawIntro() {
    let trasparence = 0;
    let texto = new Texto("Dama Legends", cnv.width/2, cnv.height/2);

    let animation = new Animacao();
    animation.loop = function() {
        trasparence += 0.005;
        fillCanvas();
        texto.color = "rgba(255, 255, 255, " + trasparence + ")";
        texto.draw();
    }
    animation.onfinish = function() {
        drawPressStart();
    }
    animation.setTimeout(4);
    animation.play();
}

function drawPressStart() {
    let animation = new Animacao();
    let namegame = new Texto("Dama Legends", cnv.width/2, cnv.height/2);
    let texto = new Texto("Pressione qualquer tecla", cnv.width/2, cnv.height-100);
    let speedAnimation = 0.012;
    let trasparence = 0;
    let showText = true;
    namegame.size = 90;
    namegame.fontFamily = "Cinzel";
    texto.size = 30;
    
    animation.loop = function() {
        if(showText) {
            trasparence += speedAnimation;
        } else {
            trasparence -= speedAnimation;
        }
        if(trasparence >= 1) {
            showText = false;
        }
        if(trasparence <= .2) {
            showText = true;
        }
        background.draw();
        texto.color = "rgba(255, 255, 255, " + trasparence + ")";
        namegame.draw();
        texto.draw();
    };
    animation.onfinish = function() {
        drawMenu();
        music.loop = true;
        music.play();
    };
    animation.condition = function() { return keyPressed != undefined };
    animation.play();
}

function drawMenu() {
    let animation = new Animacao();
    animation.loop = function() {
        background.draw();
        bPlay.draw();
        bSettings.draw();
    };
    animation.onfinish = function() {
        start();
    };
    animation.condition = function() {
        return bPlay.clicked;
    }
    animation.play();
}

function drawGame(x, y) {
    let gradient = new Gradiente(0, 0, cnv.width, cnv.height);
    let gradient2 = new Gradiente(0, 0, cnv.width, cnv.height);

    gradient.addColorStop(0, "black");
    gradient.addColorStop(.5, "red");
    gradient.addColorStop(1, "black");
    gradient.draw();

    gradient2.linearGradient(cnv.width/2, 0, cnv.width/2, cnv.height);
    gradient2.addColorStop(0, "black");
    gradient2.addColorStop(.5, "rgba(0,0,0,0)");
    gradient2.addColorStop(1, "black");
    gradient2.draw();

    createRect(x-20, y-20, blockSize*8+40, blockSize*8+40, "white");
    strokeGame(x, y, blockSize)
    for(let i = 0; i < map.length; i++) {
        for(let j = 0; j < map[i].length; j++) {
            if(map[i][j] == 1) {
                createRect(
                    x + j * blockSize,
                    y + i * blockSize,
                    blockSize,
                    blockSize,
                    "#171717"
                );
            }
        }
    }
}

function strokeGame(x, y) {
    ctx.save();
    ctx.fillStyle = "#171717";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, blockSize*8, blockSize*8);
    ctx.restore();
}

// Start Game
setDefaultSettings();
drawLoading();