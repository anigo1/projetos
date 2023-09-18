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
let fundo = new Fundo("", "", "", "", "purple");
let tabuleiro = new Tabuleiro(
    (cnv.width/2) - (blockSize*8/2),
    (cnv.height/2) - (blockSize*8/2),
    blockSize
);
let pecas = [];
let turno = "white";
let picked = false;
let focusPecaIndex = undefined;
let selectedPecaIndex = undefined;
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
bPlay.background.color = "#111";
bSettings.background.color = "#111";

// Load Request
let background = new Imagem("media/images/background.png", 0, 0, cnv.width, cnv.height);
let music = loadAudio("media/audios/Here it Comes - TrackTribe.mp3");

// Game Functions
function draw() {
    fundo.draw();
    tabuleiro.draw();
    //tabuleiro.drawMouseBlockPos();
    drawPecas();
    drawInfos();
}

function update() {
    focusPecaIndex = undefined;
    checkPecas();
    if(
        mouse.x >= tabuleiro.x && mouse.x <= tabuleiro.x + tabuleiro.width &&
        mouse.y >= tabuleiro.y && mouse.y <= tabuleiro.y + tabuleiro.height &&
        selectedPecaIndex != undefined
    ) {
        let pecaSelected = pecas[selectedPecaIndex];
        let tl = tabuleiro.getLine();
        let tc = tabuleiro.getColumn();
        let pl = pecaSelected.getLine();
        let pc = pecaSelected.getColumn();

        if(
            mouse.down && // Mouse Pressionado?
            selectedPecaIndex != undefined && // Há peça seleciona?
            pecaSelected.type == turno && // É o turno da peça selecionada?
            getPeca(tl, tc) == undefined && // Mover peça para um espaço vazio?
            tabuleiro.getBlockType(tl, tc) == "black" // Mover para epaços pretos?
        ) {
            // Movimento normal
            if(
                Math.abs(tl-pl) == 1 && Math.abs(tc-pc) == 1 && // Movendo 1 espaço na diagonal
                (turno == "black" && tl > pl || turno == "white" && tl < pl) // Não podem voltar de acordo com o tipo
            ) {
                movePeca(selectedPecaIndex, tl, tc);
                changeTurn();
            }
            // Movimento com remoção de peças
            if(
                Math.abs(tl-pl) == 2 && Math.abs(tc-pc) == 2 &&
                getPeca((tl+pl)/2, (tc+pc)/2) != undefined &&
                getPeca((tl+pl)/2, (tc+pc)/2).type != pecaSelected.type
            ) {
                movePeca(selectedPecaIndex, tl, tc);
                removePeca((tl+pl)/2, (tc+pc)/2);
                pecaSelected = pecas[selectedPecaIndex];
                pl = pecaSelected.getLine();
                pc = pecaSelected.getColumn();

                // HERE
                /*
                try {
                    if(
                        picked && (
                            getPeca(pl+2, pc+2) != undefined ||
                            getPeca(pl-2, pc-2) != undefined ||
                            getPeca(pl+2, pc-2) != undefined ||
                            getPeca(pl-2, pc+2) != undefined
                        ) && (
                            getPeca(pl+1, pc+1).type != pecaSelected.type ||
                            getPeca(pl-1, pc-1).type != pecaSelected.type ||
                            getPeca(pl+1, pc-1).type != pecaSelected.type ||
                            getPeca(pl-1, pc+1).type != pecaSelected.type
                        )
                    ) {
                        changeTurn();
                    }
                } catch (error) {
                    log(error)
                } */
            }
        }
    }
}

// Start Game
setDefaultSettings();
//drawLoading();
start();