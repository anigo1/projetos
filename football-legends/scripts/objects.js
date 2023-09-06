class Countainer {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color || "gray";
    }

    draw() {
        creatRect(this.x, this.y, this.width, this.height, this.color);
    }
}

class Button {
    constructor(text, x, y, width, height) {
        this.background = new Countainer();
        this.text = text;
        this.textColor = "white";
        this.textAlign = "center";
        this.textBaseline = "middle";
        this.background.color = "gray";
        this.background.x = x;
        this.background.y = y;
        this.background.width = width;
        this.background.height = height;
    }

    draw() {
        this.background.draw();
        createText(
            this.text,
            this.background.x + (this.background.width/2),
            this.background.y + (this.background.height/2),
            this.textColor,
            this.textAlign,
            this.textBaseline
        );
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
    constructor(src, x, y, width, height, dX, dY, dWidth, dHeight) {
        this.image = new Image();
        this.image.src = src || "media/images/no-image.png";
        this.image.onload = function() {
            this.loaded = true;
        }
        this.x = x || 0;
        this.y = y || 0;
        this.width = width;
        this.height = height;
        this.dX = dX || 0;
        this.dY = dY || 0;
        this.dWidth = dWidth;
        this.dHeight = dHeight;
    }

    draw() {
        ctx.save();
        ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.width || this.image.width,
            this.height || this.image.height,
            this.dX,
            this.dY,
            this.dWidth || this.image.width,
            this.dHeight || this.image.height
        );
        ctx.restore();
    }
}

class Audio {
    constructor(src) {
        // Todo
    }
}

class Animation {
    constructor() {
        this.startTime= undefined;
        this.interval = undefined;
    }

    timed(doIt, callback, time) {
        this.startTime = getTime();
        this.interval = setInterval(() => {
            doIt();
            if(getTime() - this.startTime >= time * 1000) {
                clearInterval(this.interval);
                callback();
            }
        }, 1000/fps);
    }

    conditional(doIt, callback, condition) {
        this.interval = setInterval(() => {
            doIt();
            if(condition()) {
                clearInterval(this.interval);
                callback();
            }
        }, 1000/fps);
    }
}