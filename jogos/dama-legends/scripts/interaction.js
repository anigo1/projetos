// DOM
const body = document.getElementsByTagName("body")[0];

// Mouse Postions
let mouse = {
    x: 0,
    y: 0,
    down: false,
    up: true,
    click: function() {
        return true;
    }
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
    onMouseDown(e);
    mouse.click();
    mouse.down = true;
    mouse.up = false;
}

cnv.onmouseup = (e) => {
    mouse.down = false;
    mouse.up = true;
}

// KEYBOARD
document.onkeydown = (e) => {
    keyPressed = e.key;
}

document.onkeyup = (e) => {
    keyPressed = undefined;
}