// MOUSE
window.onmousemove = (e) => {
    onMouseMove(e);
}

cnv.onmousedown = (e) => {
    onMouseDown(e);
}

cnv.onmouseup = (e) => {
    onMouseUp(e);
}

// KEYBOARD
document.onkeydown = (e) => {
    keyPressed = e.key;
}

document.onkeyup = (e) => {
    keyPressed = undefined;
}