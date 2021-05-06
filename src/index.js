require("./index.html");
const Map = require("./Map");

window.addEventListener("load", onLoad);
function onLoad() {
    const map = new Map();
    map.addTestCoordinates();
}