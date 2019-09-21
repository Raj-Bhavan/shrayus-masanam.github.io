/* I wouldn't reccomend trying to learn from this, it's a mess. */
var jQ = document.createElement(`script`);
jQ.src = `https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js`;
document.head.appendChild(jQ);
function getHash(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
} 

var newAlert = document.createElement(`div`);
newAlert.id = `newAlert`;
document.body.appendChild(newAlert);
window.alert = function(message, color, textColor, borderSize, borderColor) {
	/* var rgb = [0,0,0];
	var chosenColor; */
	if (message == null) { message = "Correct format is alert(message, color, textColor, borderSize, borderColor);" }
	if (color == null) {color = "white";}
	if (textColor == null) { textColor = "black" }
	if (borderSize == null) { borderSize = "5" }
	if (borderColor == null) { borderColor = "black" }
	/* function convRGB(i){
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}
	function hexToRgb(hex) {
		var bigint = parseInt(hex, 16);
		var r = (bigint >> 16) & 255;
		var g = (bigint >> 8) & 255;
		var b = bigint & 255;
		rgb[0] = r;
		rgb[1] = g;
		rgb[2] = b;
}
	hexToRgb(convRGB(getHash(color)));
var o = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) /1000);
    if(o > 125) {
        chosenColor = `black`;
    }else{ 
        chosenColor = `white`;
    } */
document.getElementById(`newAlert`).innerHTML = `<div class="alert" style="border:`+borderSize+`px solid `+borderColor+`; border-pixel-size: 10px; opacity: 0.99;transition: opacity 0.6s;padding: 20px;background-color:`+color+`;color: `+textColor+`;margin-bottom: 15px;margin-left: 30%;margin-right: 30%;">
  <span onclick="document.getElementById('newAlert').innerHTML=''" class="closebtn" style="margin-left: 15px;color: `+color+`;font-weight: bold;float: right;font-size: 22px;line-height: 20px;cursor: pointer;transition: 0.3s;">&times;</span>
  <span id="discmsg" style="font-size: 15pt;">`+message+`</span>
</div>`
};
