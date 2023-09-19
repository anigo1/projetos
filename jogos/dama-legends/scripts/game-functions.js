// DOM
const body = document.getElementsByTagName("body")[0];

// Mouse Postions
let state = 1;
let mouse = {
    x: 0,
    y: 0,
    down: false,
    up: true
}

let mouseScreen = { x: 0, y: 0 }

// Mouse Events
function onMouseMove(e) {
    mouseScreen.x = e.clientX;
    mouseScreen.y = e.clientY;

    mouse.x = (mouseScreen.x - cnv.getClientRects().item(0).x) * (cnv.width/cnv.getClientRects().item(0).width);
    mouse.y = (mouseScreen.y - cnv.getClientRects().item(0).y) * (cnv.height/cnv.getClientRects().item(0).height);
}

function onMouseDown(e) {
    mouse.down = true;
    mouse.up = false;
}

function onMouseUp(e) {
    mouse.down = false;
    mouse.up = true;
}

// Useful
function fillCanvas(color) {
    createRect(0, 0, cnv.width, cnv.height, color || "black");
}

function createPecas(colorPecaBlack, colorPecaWhite) {
    for(let i=0; i<map.length; i++) {
        for(let j=0; j<map[i].length; j++) {
            if(map[i][j] == 0) {
                if(i < 3) {
                    let peca = new Peca(
                        tabuleiro.x + blockSize/2 + j * blockSize,
                        tabuleiro.y + blockSize/2 + i * blockSize,
                        blockSize/2-4,
                        colorPecaBlack || "black"
                    );
                    peca.type = "black";
                    pecas.push(peca);
                }
                if(i > 4) {
                    let peca = new Peca(
                        30 + tabuleiro.x + j * blockSize,
                        30 + tabuleiro.y + i * blockSize,
                        blockSize/2-4,
                        colorPecaWhite || "white"
                    );
                    peca.type = "white";
                    pecas.push(peca);
                }
            }
        }
    }
}

function getPeca(lin, col) {
    let p = undefined;
    for(peca of pecas) {
        if(peca.getLine() == lin && peca.getColumn() == col) {
            p = peca
        }
    }
    return p;
}

function changeTurn() {
    picked = false;
    (turno == "white") ? turno = "black" : turno = "white";
}

function removePeca(lin, col) {
    picked = true;
    for(peca of pecas) {
        if(peca.getLine() == lin && peca.getColumn() == col) {
            pecas.splice(pecas.indexOf(peca), 1);
        }
    }
}

function movePeca(index, lin, col) {
    pecas[index].moveTo(lin, col);
}

// default settings
function setDefaultSettings() {
    createPecas();
}

// Telas
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

function drawPecas() {
    for(peca of pecas) {
        peca.draw();
        if(peca.selected) selectedPecaIndex = pecas.indexOf(peca);
        if(peca.mouseFocus) focusPecaIndex = pecas.indexOf(peca);
    }
}

function drawInfos() {
    let pretas = 0;
    let brancas = 0;
    for(peca of pecas) {
        if(peca.type == "black") pretas++;
        if(peca.type == "white") brancas++;
    }
    createText("Pretas: " + pretas, 80, 120, "white", "left");
    createText("Brancas: " + brancas, 80, 140, "white", "left");
    createText("Selected: " + selectedPecaIndex, 80, 180, "white", "left");
    createText("Focus: " + focusPecaIndex, 80, 200, "white", "left");
    createText("Turno: " + turno, 80, 240, "white", "left");
}

// Animation Functions
function start() {
    gameAnimation.loop = function() {
        loop();
    };
    gameAnimation.play();
}

function loop() {
    draw();
    update();
}