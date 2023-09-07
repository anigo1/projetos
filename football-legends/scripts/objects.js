class Countainer {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color || "gray";
    }

    draw() {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
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
        this.backgroundColor = "gray";
        this.background.x = x;
        this.background.y = y;
        this.background.width = width;
        this.background.height = height;
        this.text.color = color || "white";
        this.text.size = 20;
        this.selected = false;
        this.selectedColor = "rgba(0, 0, 0, .6)";
    }

    draw() {
        if(this.selected) {
            creatRect(this.background.x, this.background.y, this.background.width, this.background.height, this.selectedColor)
        } else {
            this.background.draw();
        }
        this.text.x = this.background.x + (this.background.width/2);
        this.text.y = this.background.y + (this.background.height/2);
        this.text.draw();
    }

    update() {
        let testeX = mouseCnvPosition.x > this.background.x && mouseCnvPosition.x < this.background.x + this.background.width;
        let testeY = mouseCnvPosition.y > this.background.y && mouseCnvPosition.y < this.background.y + this.background.height;
        if(testeX && testeY) {
            this.selected = true;
        } else {
            this.selected = false;
        }
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
        this.backBar.draw();
        this.frontBar.draw();
    }

    update() {
        this.frontBar.width = this.progress * (this.width/100);
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
        this.startTime = undefined;
        clearInterval(this.interval);
    }

    setTimeout(time) { // Tempo de animaçao em segundos
        this.condition = function() { return getTime() - this.startTime >= time * 1000; };
    }
}