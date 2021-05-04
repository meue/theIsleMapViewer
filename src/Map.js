const Coordinate = require("./Coordinate");

class Map {
    constructor() {
        this.init();
    }

    init() {
        this.coords = [];
        window.addEventListener("resize", () => this.update());
        document.getElementById("coordsButton").addEventListener("click", () => this.addCoordinate());
    }

    addTestCoordinates() {
        this.coords.push(new Coordinate(0, 0, "#ff0000"));
        this.coords.push(new Coordinate(-100, -100, "#ff0000"));
        this.coords.push(new Coordinate(-200, -200, "#ff0000"));
        this.coords.push(new Coordinate(-300, -300, "#ff0000"));
        this.coords.push(new Coordinate(-400, -400, "#ff0000"));
        this.coords.push(new Coordinate(-500, -500, "#ff0000"));
        this.coords.push(new Coordinate(-600, -600, "#ff0000"));
    }

    addCoordinate() {
        const coordsRaw = document.getElementById("coordsCoords").value;
        const valuesArray = coordsRaw.split(", ");
        const x = parseInt(valuesArray[1]);
        const y = parseInt(valuesArray[0]);
        const color = document.getElementById("coordsColor").value;
        this.coords.push(new Coordinate(x, y, color));
    }

    update() {
        for (let i = 0; i < this.coords.length; i++) {
            const coordinate = this.coords[i];
            coordinate.update();
        }
    }
}

module.exports = Map;