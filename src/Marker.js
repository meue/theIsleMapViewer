class Marker {
    constructor(value, axis, parent, mapHeight, mapWidth) {
        this.axis = axis;
        this.center = 400;
        this.offsetY = 40;
        this.offsetX = 0;
        this.relativePositionY = value - 400;
        this.relativePositionX = value - 500;
        this.value = value;
        this.element = document.createElement("div");
        this.element.value = value;
        this.element.classList.add("coordsMarker");
        this.element.innerHTML = -value;
        this.maxY = 850;
        this.minY = 50;
        this.maxX = 905;
        parent.appendChild(this.element);
    }

    update(scale, position) {
        const mapPixelRatio = 1.016;
        if (this.axis) {
            this.element.style.left = "960px";
            let y = ((this.relativePositionY - position.y) * mapPixelRatio) * scale;
            y = this.center - y + this.offsetY;
            if (y > this.maxY || y < this.minY) {
                this.hide();
            } else {
                this.show();
            }
            this.element.style.top = y + "px";
        } else {
            this.element.style.top = "845px";
            let x = ((this.relativePositionX - position.x) * mapPixelRatio) * scale;
            x = this.center - x + this.offsetX;
            if (x > this.maxX) {
                this.hide();
            } else {
                this.show();
            }
            this.element.style.left = (x + 62) + "px";
        }
    }

    hide() {
        this.element.style.display = "none";
    }

    show() {
        this.element.style.display = "block";
    }

    deactivateTransition() {
        this.element.style.transition = "none";
    }
    activateTransition() {
        this.element.style.transition = "all .2s";
    }
}

module.exports = Marker;