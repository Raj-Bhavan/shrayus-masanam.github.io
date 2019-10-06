document.body.appendChild(newAlert);
window.alert = function(message, backgroundColor, textColor, borderSize, borderColor) {
	if (message == null) { message = "Correct format is alert(message, backgroundColor, textColor, borderSize, borderbackgroundColor);" }
	if (backgroundColor == null) {backgroundColor = "white";}
	if (textColor == null) { textColor = "black" }
	if (borderSize == null) { borderSize = "5" }
	if (borderColor == null) { borderColor = "black" }
document.getElementById(`newAlert`).innerHTML = `<div class="alert" style="border:`+borderSize+`px solid `+borderColor+`; border-pixel-size: 10px; opacity: 0.99;transition: opacity 0.6s;padding: 20px;background-backgroundColor:`+backgroundColor+`;backgroundColor: `+textColor+`;margin-bottom: 15px;margin-left: 30%;margin-right: 30%;">
  <span onclick="document.getElementById('newAlert').innerHTML=''" class="closebtn" style="margin-left: 15px;color: `+textColor+`;font-weight: bold;float: right;font-size: 22px;line-height: 20px;cursor: pointer;transition: 0.3s;">&times;</span>
  <span id="discmsg" style="font-size: 15pt;">`+message+`</span>
</div>`
};
