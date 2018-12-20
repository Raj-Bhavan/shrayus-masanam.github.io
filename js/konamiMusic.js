javascript: var allowedKeys = { 37: 'left', 38: 'up', 39: 'right', 40: 'down', 65: 'a', 66: 'b', 90: 'z', 85: 'u', 78: 'n', 68: 'd' }; 
// the 'official' Konami Code sequence 
var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];
var zundCode = ['z', 'u', 'n', 'd'] 
// a variable to remember the 'position' the user has reached so far. 
var konamiCodePosition = 0; 
var zundCodePosition = 0; 
// add keydown event listener 
document.addEventListener('keydown', function(e) { 
	// get the value of the key code from the key map 
	var key = allowedKeys[e.keyCode]; 
	// get the value of the required key from the konami code 
	var requiredKey = konamiCode[konamiCodePosition];
	var requiredZundKey = zundCode[zundCodePosition];	
	// compare the key with the required key 
	if (key == requiredKey) { 
		// move to the next key in the konami code sequence 
		konamiCodePosition++; 
		// if the last key is reached, activate cheats 
		if (konamiCodePosition == konamiCode.length) { activateCheats(); konamiCodePosition = 0; } } else { konamiCodePosition = 0; } }); function activateCheats() { window.open("https://docs.google.com/document/d/1-1enyFQYu85HPXwXQHQIhzQglUKzWEA3uC9hHBm6MNY/edit?usp=sharing"); }
			
		if (zundKey == requiredZundKey) { 
		// move to the next key in the konami code sequence 
		zundCodePosition++; 
		// if the last key is reached, activate cheats 
		if (zundCodePosition == zundCode.length) { activateZundCheats(); zundCodePosition = 0; } } else { zundCodePosition = 0; } }); function activateZundCheats() { window.open("https://docs.google.com/document/d/1-1enyFQYu85HPXwXQHQIhzQglUKzWEA3uC9hHBm6MNY/edit?usp=sharing"); }