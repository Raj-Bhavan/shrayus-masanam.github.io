window.alert = function(message) {
  var newAlert = document.createElement('div');
  newAlert.id = "newAlert";
  document.body.appendChild(newAlert);
  document.getElementById('newAlert').innerHTML = `<div class='alert' style='z-index: 999999; padding: 20px; background-color: #f44336; color: white;'>
  <span class='closebtn' style='margin-left: 15px;color: white;font-weight: bold;float: right;font-size: 22px;line-height: 20px;cursor: pointer;transition: 0.3s;'>&times;</span>`+message+`
</div>`
}
