class Countainer {
    constructor(x, y, width, height, color) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 50;
        this.height = height || 50;
        this.color = color || "gray";
    }

    draw() {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }
}

class Gradiente {
    constructor(x, y, width, height) {
        this.background = new Countainer(x, y,width, height);
        this.gradient = ctx.createLinearGradient(x, 0, width, 0);
    }

    draw() {
        this.background.color = this.gradient;
        this.background.draw();
    }

    linearGradient(x0, y0, x1, x2) {
        this.gradient = ctx.createLinearGradient(x0, y0, x1, x2);
    }

    radialGradient(x1, y1, r1, x2, y2, r2) {
        this.gradient = ctx.createRadialGradient(x1, y1, r1, x2, y2, r2);
    }
    
    addColorStop(percentStop, color) {
        this.gradient.addColorStop(percentStop, color);
    }
}

class Texto {
    constructor(text, x, y, color, size) {
        this.text = text || "Text";
        this.x = x || 0;
        this.y = y || 0;
        this.size = size || 20;
        this.color = color || "white"; // Possible values: "color-name", rgb(), rgba(), hex(#000/#000000)
        this.align = "center"; // Possible values: start, end, left, right or center. The default value is start.
        this.baseline = "middle"; // Possible values: top, hanging, middle, alphabetic, ideographic, bottom. The default value is alphabetic.
        this.fontFamily = "sans-serif";
        this.direction = "inherit";
    }

    draw() {
        ctx.save();
        ctx.font = this.size + "px " + this.fontFamily;
        ctx.fillStyle = this.color;
        ctx.textAlign = this.align;
        ctx.textBaseline = this.baseline;
        ctx.direction = this.direction;
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
    }
}

class Button {
    constructor(text, x, y, width, height, color) {
        this.background = new Countainer();
        this.text = new Texto(text);
        this.background.x = x;
        this.background.y = y;
        this.background.width = width;
        this.background.height = height;
        this.text.color = color || "white";
        this.text.size = 20;
    }

    draw() {
        this.background.draw();
        this.text.x = this.background.x + (this.background.width/2);
        this.text.y = this.background.y + (this.background.height/2);
        this.text.draw();
    }
}

class ProgressBar {
    constructor(x, y, width, height) {
        this.progress = 0;
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 200;
        this.height = height || 10;
        this.backBar = new Countainer(this.x, this.y, this.width, this.height, "gray");
        this.frontBar = new Countainer(this.x, this.y, this.progress, this.height, "red");
    }

    draw() {
        this.frontBar.width = this.progress * (this.width/100);
        this.backBar.draw();
        this.frontBar.draw();
    }
}

class Imagem {
    constructor(src,
        dx, dy, dwidth, dheight, // Propriedades desenho
        ox, oy, owidth, oheight // Propriedades origem
    ) {
        this.image = new Image();
        this.image.src = src || "media/images/no-image.png";
        this.image.onload = function() {
            this.loaded = true;
        }
        this.ox = ox || 0;
        this.oy = oy || 0;
        this.owidth = owidth;
        this.oheight = oheight;
        this.dx = dx || 0;
        this.dy = dy || 0;
        this.dwidth = dwidth;
        this.dheight = dheight;
    }

    draw() {
        ctx.save();
        ctx.drawImage(
            this.image,
            this.ox,
            this.oy,
            this.owidth || this.image.width,
            this.oheight || this.image.height,
            this.dx,
            this.dy,
            this.dwidth || this.image.width,
            this.dheight || this.image.height
        );
        ctx.restore();
    }
}

class Animacao {
    constructor(loop, onfinish, condition) {
        this.startTime= undefined;
        this.interval = undefined;
        this.loop = loop; // function
        this.onfinish = onfinish; // function
        this.condition = condition || function() { return false }; // function
    }

    play() {
        this.startTime = getTime();
        this.interval = setInterval(() => {
            this.loop();
            if(this.condition()) {
                this.stop();
                this.onfinish();
            }
        }, 1000/fps);
    }

    stop() {
        clearInterval(this.interval);
    }

    setTimeout(time) { // Tempo de animaçao em segundos
        this.condition = function() { return getTime() - this.startTime >= time * 1000; };
    }

    getElapsedTime() {
        return (getTime() - this.startTime)/1000;
    }
}