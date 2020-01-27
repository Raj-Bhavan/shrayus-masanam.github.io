var dark = false;
var original = [];
document.body.innerHTML = document.body.innerHTML + `<svg width="50" height="50" viewBox="0 0 48 48" onclick="toggleDarkMode()"><path d="M22 41C32.4934 41 41 32.4934 41 22C41 11.5066 32.4934 3 22 3C11.5066 3 3 11.5066 3 22C3 32.4934 11.5066 41 22 41ZM7 22C7                 13.7157 13.7157 7 22 7V37C13.7157 37 7 30.2843 7 22Z"></path></svg>`
original.push(document.body.style.backgroundColor);
original.push(document.body.style.color);
darkMode = function() {
    if (dark == false) {
        dark = true;
        document.body.style.backgroundColor = "#1f1f1f";
        document.body.style.color = "white";
    } else {
        dark = false
        document.body.style.backgroundColor = original[0];
        document.body.style.color = original[1];
    }
}
