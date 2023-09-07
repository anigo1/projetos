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
let dataLength = 0;

// Object Settings
let menu = new Countainer(0, 0, 300, cnv.height, "rgba(0, 0, 0, .5)");
let bPlay = new Button("Jogar", menu.x, cnv.height/2-80, menu.width, 80);
let bSettings = new Button("Configurações", menu.x, cnv.height/2, menu.width, 80);

let introBackground = new Imagem("media/images/intro-background.jpg", 0, 0, cnv.width, cnv.height);
let menuBackground = new Imagem("media/images/menu-background.jpg", 0, 0, cnv.width, cnv.height);
let Ibrahimovic = new Imagem("media/images/Ibrahimovic.png", cnv.width-550, 32, 550, 650);
let music = loadAudio("media/audio/Here it Comes - TrackTribe.mp3");

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
    menuBackground.draw();
    createText("Bem-Vindo!", cnv.width/2, cnv.height/2);
    drawMenu();
    Ibrahimovic.draw();
}

function update() {
    bPlay.update();
    bSettings.update();
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
        progressBar.update();
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
    let texto = new Texto("Soccer Legends", cnv.width/2, cnv.height/2);

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
    let speedAnimation = 0.012;
    let trasparence = 0;
    let showText = true;
    let texto = new Texto("Pressione qualquer tecla", cnv.width/2, cnv.height-100);
    texto.size = 30;
    let animation = new Animacao();
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
        introBackground.draw();
        texto.color = "rgba(255, 255, 255, " + trasparence + ")";
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

// Start Game
setDefaultSettings();
drawLoading();