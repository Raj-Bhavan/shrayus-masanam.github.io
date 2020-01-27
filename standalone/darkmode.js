// Made by me this time
var dark = false;
var original = [];
original.push(document.body.style.background-color);
original.push(document.body.style.color);
darkMode = function() {
    if (dark == false) {
        dark = true;
        document.body.style.background-color = "#1f1f1f";
        document.body.style.color = "white";
    } else {
        dark = false
        document.body.style.background-color = original[0];
        document.body.style.color = original[1];
    }
}
