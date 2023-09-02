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
let menu = new Countainer(0, 0, 300, cnv.height, "black");
let bPlay = new Button("Play", 0, 0, menu.width, 30);

// default settings
function setDefaultSettings() {
    console.log("width: " + cnv.width + ", height: " + cnv.height);
    bPlay.background.color = "red";
}

// Game Functions
function start() {
    //drawIntro();
    gameInterval = setInterval(loop, 1000/fps);
}

function draw() {
    fillCanvas("blue");
    createText("Bem-Vindo!", px, cnv.height/2);
    menu.draw();
    bPlay.draw();
}

function update() {
    if(previewedIntro) {
        console.log("Terminou");
        px += 10;
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

function drawIntro() {
    let time = getTime();
    let textTrasparence = 0;
    let intro = setInterval(() => {
        textTrasparence += 0.005;
        fillCanvas();
        createText(
            "Football Legends",
            cnv.width/2,
            cnv.height/2,
            "rgba(255, 255, 255, " + textTrasparence + ")"
        );
        if(getTime() - time >= 4000) {
            clearInterval(intro);
            previewedIntro = true;
            gameInterval = setInterval(loop, 1000/fps);
        }
    }, 1000/fps);
}

function drawMenu() {
    // Background
}

// Objects
class Player {
    constructor(x, y, width, speed, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.speed = speed;
        this.speedX = this.speed;
        this.speedY = this.speed;
        this.color = color || "red";
    }

    draw() {
        creatBall(this.x, this.y, this.radius, this.color);
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.collision();
    }

    collision() {
        if(this.x < 0 || this.x >= cnv.width) this.speedX *= -1;
        if(this.y < 0 || this.y >= cnv.height) this.speedY *= -1;
    }
}

// Start Game
setDefaultSettings();
let px = cnv.width/2;
start();