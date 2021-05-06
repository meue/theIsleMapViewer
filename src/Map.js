const Coordinate = require("./Coordinate");

class Map {
    constructor() {
        this.init();
        this.initZoom();
    }

    init() {
        this.coords = [];
        //window.addEventListener("resize", () => this.update();
        document.getElementById("coordsButton").addEventListener("click", () => this.addCoordinate());
    }

    initZoom() {
        this.scale = 1;
        this.x = 0;
        this.y = 0;
        this.dragging = false;
        this.dragStart = { x: 0, y: 0 };
        const mapScroller = document.getElementById("mapScroller");
        mapScroller.addEventListener("wheel", (event) => this.zoom(event));
        mapScroller.addEventListener('mousedown', (event) => this.startDrag(event));
        document.addEventListener('mousemove', (event) => this.drag(event));
        document.addEventListener('mouseup', (event) => this.endDrag(event));
        this.updateZoom();
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

    /*update() {
        for (let i = 0; i < this.coords.length; i++) {
            const coordinate = this.coords[i];
            coordinate.update();
        }
    }*/

    zoom(event) {
        event.preventDefault();
        event.stopPropagation();
        if (event.deltaY > 0) {
            this.scale *= 0.85;
        } else {
            this.scale *= 1.15;
        }
        this.activateTransition();
        this.updateZoom();
    }

    startDrag(event) {
        this.dragging = true;
        this.dragStart.x = event.clientX - this.x;
        this.dragStart.y = event.clientY - this.y;
        this.updateZoom();
    }

    drag(event) {
        if (!this.dragging) {
            return;
        }
        const deltaX = event.clientX - this.dragStart.x;
        const deltaY = event.clientY - this.dragStart.y;
        this.x = deltaX;
        this.y = deltaY;
        this.deactiveTransition();
        this.updateZoom();
    }

    activateTransition() {
        const mapElement = document.getElementById("map");
        mapElement.style.transition = "transform .2s";
    }

    deactiveTransition() {
        const mapElement = document.getElementById("map");
        mapElement.style.transition = "none .2s";
    }

    endDrag(event) {
        this.dragging = false;
        this.updateZoom();
    }

    updateZoom() {
        const mapElement = document.getElementById("map");
        mapElement.style.transform = "scale(" + this.scale + ") translate(" + this.x + "px, " + this.y + "px)";
    }
}

module.exports = Map;