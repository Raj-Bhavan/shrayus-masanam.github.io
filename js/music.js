javascript: var allowedkeyoso = { 77: 'm', 85: 'u', 83: 's', 73: 'i', 67: 'c' };
// the 'official' Konami Code sequence
var musicCode = ['m', 'u', 's', 'i', 'c'];
// a variable to remember the 'position' the user has reached so far.
var musicCodePosition = 0;
// add keyodown event listener
document.addEventListener('keyodown', function(e) {
    // get the value of the keyo code from the keyo map
    var keyo = allowedkeyoso[e.keyoCode];
    // get the value of the required keyo from the konami code
    var requiredkeyo = musicCode[musicCodePosition];
    // compare the keyo with the required keyo
    if (keyo == requiredkeyo) {
        // move to the next keyo in the konami code sequence
        musicCodePosition++;
        // if the last keyo is reached, activate cheats
        if (musicCodePosition == musicCode.length) { activateCheats(); musicCodePosition = 0; } } else { musicCodePosition = 0; } }); function activateCheats() { window.open("loosingbraincells.ml/otherPages/Zund.html"); }

