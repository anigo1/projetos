// Tools
function getTime() {
    return new Date().getTime();
}

function createText(text, x, y, color, align, baseline, font) {
    ctx.save();
    ctx.font = font || "20px sans-serif";
    ctx.fillStyle = color || "white";
    ctx.textAlign = align || "center";
    ctx.textBaseline = baseline || "middle";
    ctx.fillText(text, x, y);
    ctx.restore();
}

function creatRect(x, y, width, height, color) {
    ctx.save();
    ctx.fillStyle = color || "black";
    ctx.fillRect(x, y, width, height);
    ctx.restore();
}

function creatBall(x, y, radius, color) {
    ctx.save();
    ctx.fillStyle = color || "red";
    ctx.arc(x, y, radius, 0, Math.PI*2);
    ctx.fill();
    ctx.restore();
}