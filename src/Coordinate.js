class Coordinate {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.element = document.createElement("div");
        const line1 = document.createElement("div");
        const line2 = document.createElement("div");
        this.element.classList.add("coordinate");
        this.element.appendChild(line1);
        this.element.appendChild(line2);
        this.element.style.backgroundColor = color;

        document.getElementById("map").appendChild(this.element);

        this.update();
    }

    update() {
        const coords = this.translateCoords();

        this.element.style.top = coords.y + "px";
        this.element.style.left = coords.x + "px";
    }

    translateCoords() {
        let x = this.x;
        let y = this.y;

        x = 1000 + (x * 1.01) - 17.5;
        y = 850 + (y * 1.015) - 46;

        return { x: x, y: y };
    }

    remove() {

    }
}

module.exports = Coordinate;