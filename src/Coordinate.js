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
        /*const offsetX = 10;
        const offsetY = 10;
        const width = 2357;
        const height = 1940;
        const ratio = 2357 / 1000;
        const map = document.getElementById("map");
        const boundingBox = map.getBoundingClientRect();
        const realWidth = boundingBox.width;
        const imageScale = realWidth / width;
        const realHeight = height * imageScale;
        */
        x = 1000 + (x * 1.01) - 18;
        y = 850 + (y * 1.015) + 5;

        //x = x * -1 * imageScale * ratio + realWidth;
        //y = y * -1 * imageScale * ratio + realHeight;
        return { x: x, y: y };
    }

    remove() {

    }
}

module.exports = Coordinate;