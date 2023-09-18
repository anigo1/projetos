class Fundo {
    constructor(x, y, width, height, color) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || cnv.width;
        this.height = height || cnv.height;
        this.gradient = new Gradiente(this.x, this.y, this.width, this.height);
        this.gradient2 = new Gradiente(this.x, this.y, this.width, this.height);
        this.color = color || "red";
    }

    draw() {
        this.gradient.addColorStop(0, "black");
        this.gradient.addColorStop(.5, this.color);
        this.gradient.addColorStop(1, "black");
        this.gradient.draw();

        this.gradient2.linearGradient(this.width/2, 0, this.width/2, this.height);
        this.gradient2.addColorStop(0, "black");
        this.gradient2.addColorStop(.5, "rgba(0,0,0,0)");
        this.gradient2.addColorStop(1, "black");
        this.gradient2.draw();
    }
}

class Tabuleiro {
    constructor(x, y, blockSize) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = blockSize*8;
        this.height = blockSize*8;
        this.blockSize = blockSize || 40;
        this.padd = .2 * blockSize;
        this.lineWidth = 2;
        this.color1 = "#ddd";
        this.color2 = "#171717";
    }

    draw() {
        createRect(
            this.x-this.padd,
            this.y-this.padd,
            this.blockSize*8+this.padd*2,
            this.blockSize*8+this.padd*2,
            this.color1
        );
        createRect(
            this.x,
            this.y,
            this.blockSize*8,
            this.blockSize*8,
            this.color2
        );

        // Draw Line Board
        ctx.save();
        ctx.fillStyle = this.color2;
        ctx.lineWidth = this.lineWidth;
        ctx.strokeRect(
            this.x,
            this.y,
            this.blockSize*8,
            this.blockSize*8
        );
        ctx.restore();

        for(let i=0; i<map.length; i++) {
            for(let j=0; j<map[i].length; j++) {
                if(map[i][j] == 1) {
                    createRect(
                        this.x + j * this.blockSize,
                        this.y + i * this.blockSize,
                        this.blockSize,
                        this.blockSize,
                        this.color1
                    );
                }
            }
        }
    }

    // Debug Function
    drawMouseBlockPos(color) {
        if(
            mouse.x >= this.x && mouse.x <= this.x + this.width &&
            mouse.y >= this.y && mouse.y <= this.y + this.height
        ) {
            createRect(
                tabuleiro.x + (this.getColumn()-1) * this.blockSize,
                tabuleiro.y + (this.getLine()-1) * this.blockSize,
                blockSize,
                blockSize,
                color || "#262"
            );
        }
    }

    getBlockType(lin, col) {
        return map[lin-1][col-1] == 0 ? "black" : "white";
    }

    getLine() {
        return parseInt((mouse.y - tabuleiro.y)/this.blockSize + 1);
    }

    getColumn() {
        return parseInt((mouse.x - tabuleiro.x)/this.blockSize + 1);
    }
}

class Peca {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.focusLineWidth = 4;
        this.color = color || "white";
        this.focusColor = "purple";
        this.type = undefined;
        this.mouseFocus = false;
        this.selected = false;
    }

    draw() {
        this.update();
        createCircle(
            this.x,
            this.y,
            this.radius,
            this.color
        );
        createCircle(
            this.x,
            this.y,
            this.radius,
            this.color
        );
        if(this.mouseFocus) {
            this.drawFocus();
        }
    }

    drawFocus() {
        ctx.save();
        ctx.lineWidth = this.focusLineWidth;
        ctx.strokeStyle = this.focusColor;
        ctx.stroke();
        ctx.restore();
    }

    update() {
        let dX = Math.pow(Math.abs(this.x - mouse.x), 2);
        let dY = Math.pow(Math.abs(this.y - mouse.y), 2);
        let distance = Math.sqrt(dX + dY);
        this.mouseFocus = (distance <= this.radius) ? true : false;
        this.selected = (this.mouseFocus && mouse.down) ? true : false;
    }

    moveTo(lin, col) {
        this.x = tabuleiro.x + blockSize/2 + (col-1) * blockSize;
        this.y = tabuleiro.y + blockSize/2 + (lin-1) * blockSize;
    }

    getLine() {
        return parseInt((this.y - tabuleiro.y - blockSize/2)/blockSize) + 1;
    }

    getColumn() {
        return parseInt((this.x - tabuleiro.x - blockSize/2)/blockSize) + 1;
    }
}