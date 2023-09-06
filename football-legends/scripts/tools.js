// FERRAMENTAS ÚTEIS
// Retorna o tempo atual
function getTime() {
    return new Date().getTime();
}

/*
    doIt: Faça isso durante o 'time'
    callback: Faça quando terminar o 'time'
    time: Tempo de animação em segundos
*/
function timedAnimation(doIt, callback, time) {
    let startTime = getTime();
    let interval = setInterval(() => {
        doIt();
        if(getTime() - startTime >= time * 1000) {
            clearInterval(interval);
            callback();
        }
    }, 1000/fps);
}

/*
    doIt: Faça isso durante a 'condition'
    callback: Faça quando terminar a 'condition'
    condition: Condiçao de animação (function)
*/
function conditionalAnimation(doIt, callback, condition) {
    let interval = setInterval(() => {
        doIt();
        console.log(condition);
        if(condition()) {
            clearInterval(interval);
            callback();
        }
    }, 1000/fps);
}

// Auxílio de Desenho
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

function creatCircle(x, y, radius, color) {
    ctx.save();
    ctx.fillStyle = color || "red";
    ctx.arc(x, y, radius, 0, Math.PI*2);
    ctx.fill();
    ctx.restore();
}

function creatImage(src, x, y, width, height, dX, dY, dWidth, dHeight) {
    let image = new Image();
    image.src = src;
    image.onload = function() {
        ctx.save();
        ctx.drawImage(
            image,
            x || 0,
            y || 0,
            width || 200,
            height || 200,
            dX || 0,
            dY || 0,
            dWidth || 200,
            dHeight || 200
        );
        ctx.restore();
    }
}

function playAudio() {
    // Todo
    
}