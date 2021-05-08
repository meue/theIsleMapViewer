const Coordinate = require("./Coordinate");
const Marker = require("./Marker");

class Map {
    constructor() {
        this.init();
        this.initMarkers();
        this.initZoom();
        this.updateMarkers();
    }

    init() {
        this.coords = [];
        document.getElementById("coordsButton").addEventListener("click", () => this.addCoordinate());
    }

    initZoom() {
        this.scale = 1;
        this.minScale = 1;
        this.maxScale = 3;
        this.position = { x: 0, y: 0 };
        this.intermediatePosition = { x: 0, y: 0 };
        this.dragStart = { x: 0, y: 0 };
        this.dragging = false;
        const mapScroller = document.getElementById("mapScroller");
        mapScroller.addEventListener("wheel", (event) => this.zoom(event));
        mapScroller.addEventListener('mousedown', (event) => this.startDrag(event));
        document.addEventListener('mousemove', (event) => this.drag(event));
        document.addEventListener('mouseup', (event) => this.endDrag(event));
        this.update();
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

    zoom(event) {
        event.preventDefault();
        event.stopPropagation();
        this.hideTutorial();
        if (event.deltaY > 0) {
            this.scale *= 0.85;
        } else {
            this.scale *= 1.15;
        }

        if (this.scale > this.maxScale) {
            this.scale = this.maxScale;
        }
        if (this.scale < this.minScale) {
            this.scale = this.minScale;
        }
        this.activateTransition();
        this.update();
    }

    startDrag(event) {
        event.preventDefault();
        event.stopPropagation();
        this.hideTutorial();
        this.dragging = true;
        this.dragStart.x = event.clientX - this.position.x;
        this.dragStart.y = event.clientY - this.position.y;
        this.update();
    }

    drag(event) {
        if (!this.dragging) {
            return;
        }

        let deltaX = event.clientX - this.dragStart.x;
        let deltaY = event.clientY - this.dragStart.y;

        this.intermediatePosition.x = deltaX;
        this.intermediatePosition.y = deltaY;
        this.deactiveTransition();
        this.updateIntermediateDrag();
    }

    activateTransition() {
        const mapElement = document.getElementById("map");
        mapElement.style.transition = "transform .2s";
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].activateTransition();
        }
    }

    deactiveTransition() {
        const mapElement = document.getElementById("map");
        mapElement.style.transition = "none";
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].deactivateTransition();
        }
    }

    endDrag(event) {
        this.dragging = false;
        this.position.x = this.intermediatePosition.x;
        this.position.y = this.intermediatePosition.y;
        this.update();
    }

    update() {
        this.addPositionConstraints(this.position);
        const mapElement = document.getElementById("map");
        mapElement.style.transform = "scale(" + this.scale + ") translate(" + this.position.x + "px, " + this.position.y + "px)";
    }

    updateIntermediateDrag() {
        this.addPositionConstraints(this.intermediatePosition);
        const mapElement = document.getElementById("map");
        mapElement.style.transform = "scale(" + this.scale + ") translate(" + this.intermediatePosition.x + "px, " + this.intermediatePosition.y + "px)";
    }

    addPositionConstraints(position) {
        const minX = (this.scale - 1) * -500 / this.scale;
        const maxX = (this.scale - 1) * 500 / this.scale
        const minY = (this.scale - 1) * -411 / this.scale;
        const maxY = (this.scale - 1) * 411 / this.scale

        if (position.x < minX) {
            position.x = minX;
        }
        if (position.x > maxX) {
            position.x = maxX;
        }
        if (position.y < minY) {
            position.y = minY;
        }
        if (position.y > maxY) {
            position.y = maxY;
        }

        this.updateMarkers(position);
    }

    initMarkers() {
        const mapHeight = 823;
        const mapWidth = 1000;
        this.markers = [];

        for (let i = 0; i < mapHeight; i += 100) {
            this.markers.push(new Marker(i, true, document.getElementById("mapScroller"), mapHeight, mapWidth));
        }
        for (let i = 0; i < mapWidth; i += 100) {
            this.markers.push(new Marker(i, false, document.getElementById("mapScroller"), mapHeight, mapWidth));
        }
    }

    updateMarkers(position) {
        if (!position) {
            position = this.position;
        }
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].update(this.scale, position);
        }
    }

    hideTutorial() {
        const tutorial = document.getElementById("tutorial");
        if (tutorial) {
            tutorial.remove();
        }

    }


}

module.exports = Map;