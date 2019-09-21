var newAlert = document.createElement(`div`);
newAlert.id = `newAlert`;
document.body.appendChild(newAlert);
window.alert = function(message, color, textColor, border) {
	if (message == null) { message = "Correct format is alert(message, color, textColor, border);" }
	if (color == null) {color = "red";}
	if (textColor == null) { textColor == "white" }
document.getElementById(`newAlert`).innerHTML = `<div class="alert" style="opacity: 0.99;transition: opacity 0.6s;padding: 20px;background-color:`+color+`;color: white;margin-bottom: 15px;margin-left: 30%;margin-right: 30%;">
  <span onclick="document.getElementById('newAlert').innerHTML=''" class="closebtn" style="margin-left: 15px;color: white;font-weight: bold;float: right;font-size: 22px;line-height: 20px;cursor: pointer;transition: 0.3s;">&times;</span>
  <span id="discmsg" style="font-size: 15pt;">`+message+`</span>
</div>`
};
