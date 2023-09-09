// DOM
const cnv = document.getElementById("canvas");
const ctx = cnv.getContext('2d');

// Screen Sizes
const DEVICE = { width: window.screen.width, height: window.screen.height }
const SD = { width: 720, height: 480}
const HD = { width: 1280, height: 720 }
const FHD = { width: 1920, height: 1080 }
cnv.width = HD.width;
cnv.height = HD.height;

// Game Variables
let fps = 60;
let gameAnimation = new Animacao();
let keyPressed = undefined;
let blocSize = 50;
let map = [
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1],
];

// Object Settings
let menu = new Countainer(0, 0, 300, cnv.height, "rgba(50, 50, 50, .5)");
let bPlay = new Button("Jogar", menu.x, cnv.height/2-80, menu.width, 80);
let bSettings = new Button("Configurações", menu.x, cnv.height/2, menu.width, 80);

// Load Request
let music = loadAudio("media/audios/Here it Comes - TrackTribe.mp3");

// default settings
function setDefaultSettings() {
    bPlay.background.color = "rgb(10, 50, 200)";
    bSettings.background.color = "rgb(10, 50, 200)";
}

// Game Functions
function start() {
    gameAnimation.loop = function() {
        loop();
    };
    gameAnimation.play();
}

function draw() {
    fillCanvas();
    createText("Bem-Vindo!", cnv.width/2, cnv.height/2);
    drawMenu();
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
    creatRect(0, 0, cnv.width, cnv.height, color || "black");
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
        console.log(animation.getElapsedTime());
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
        fillCanvas();
        createLinearGradient(0,0,cnv.width, cnv.height);
        texto.color = "rgba(255, 255, 255, " + trasparence + ")";
        namegame.draw();
        texto.draw();
    };
    animation.onfinish = function() {
        start();
        music.loop = true;
        music.play();
    };
    animation.condition = function() { return keyPressed != undefined };
    animation.play();
}

function drawMenu() {
    // Background
    menu.draw();
    bPlay.draw();
    bSettings.draw();
}

function drawGame() {
    fillCanvas();
    for(let i=0; i<map.length; i++) {
        console.log(map[i]);
    }
}

// Start Game
setDefaultSettings();
drawPressStart();