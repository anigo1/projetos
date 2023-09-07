// DOM
const body = document.getElementsByTagName("body")[0];

// Mouse Postions
let mouseScreenPosition = { x: 0, y: 0 }

let mouseCnvPosition = { x : 0, y: 0 }

// Mouse
window.onmousemove = (e) => {
    // Todo
    mouseScreenPosition.x = e.clientX;
    mouseScreenPosition.y = e.clientY;

    mouseCnvPosition.x = (mouseScreenPosition.x - cnv.getClientRects().item(0).x) * (cnv.width/cnv.getClientRects().item(0).width);
    mouseCnvPosition.y = (mouseScreenPosition.y - cnv.getClientRects().item(0).y) * (cnv.height/cnv.getClientRects().item(0).height);
}

document.onkeydown = (e) => {
    keyPressed = e.key;
}

document.onkeyup = (e) => {
    keyPressed = undefined;
}