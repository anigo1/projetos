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