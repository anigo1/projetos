// DOM
const body = document.getElementsByTagName("body")[0];

// Mouse Postions
let mouse = {
    x: 0,
    y: 0,
    clicked: false
}
let mouseScreen = { x: 0, y: 0 }

// MOUSE
window.onmousemove = (e) => {
    // Todo
    mouseScreen.x = e.clientX;
    mouseScreen.y = e.clientY;

    mouse.x = (mouseScreen.x - cnv.getClientRects().item(0).x) * (cnv.width/cnv.getClientRects().item(0).width);
    mouse.y = (mouseScreen.y - cnv.getClientRects().item(0).y) * (cnv.height/cnv.getClientRects().item(0).height);
}

cnv.onmousedown = (e) => {
    mouse.clicked = true;
}

cnv.onmouseup = (e) => {
    mouse.clicked = false;
}

// KEYBOARD
document.onkeydown = (e) => {
    keyPressed = e.key;
}

document.onkeyup = (e) => {
    keyPressed = undefined;
}