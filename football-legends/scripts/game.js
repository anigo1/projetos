// DOM
const cnv = document.getElementById("canvas");
const ctx = cnv.getContext('2d');
const DEVICE_WIDTH = window.screen.width;
const DEVICE_HEIGHT = window.screen.height;

// Game Variables
let fps = 60;
let gameInterval = "";
let previewedIntro = false;
cnv.width = DEVICE_WIDTH;
cnv.height = DEVICE_HEIGHT;

// Object Settings
let menu = new Countainer(0, 0, 300, cnv.height, "blue");
let bPlay = new Button("Play", menu.x, 0, menu.width, 80);
let Ibrahimovic = new Imagem("media/images/Ibrahimovic.png");

// default settings
function setDefaultSettings() {
    bPlay.background.color = "red";
}

// Game Functions
function start() {
    //drawLoading();
    //drawIntro();
    gameInterval = setInterval(loop, 1000/fps);
}

function draw() {
    fillCanvas();
    createText("Bem-Vindo!", cnv.width/2, cnv.height/2);
    drawMenu();
    Ibrahimovic.draw();
}

function update() {
    if(previewedIntro) {
        console.log("Terminou Intro");
    }
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

    conditionalAnimation(
        function() {
            progressBar.progress++;
            fillCanvas();
            progressBar.update();
            progressBar.draw();
            createText(
                "Carregando " + Number.parseInt(progressBar.progress) + "%" ,
                progressBar.x,
                progressBar.y-25,
                "",
                "left",
                "top"
            );
        },
        function() {
            drawIntro();
        },
        function() { return progressBar.progress >= 100 }
    );
}

function drawIntro() {
    let trasparence = 0;
    timedAnimation(
        function() {
            trasparence += 0.005;
            fillCanvas();
            createText(
                "Football Legends",
                cnv.width/2,
                cnv.height/2,
                "rgba(255, 255, 255, " + trasparence + ")"
            );
        },
        function() {
            previewedIntro = true;
            gameInterval = setInterval(loop, 1000/fps);
        },
        4 // Tempo da animação
    );
}

function drawMenu() {
    // Background
    menu.draw();
    bPlay.draw();
}

// Start Game
setDefaultSettings();
start();