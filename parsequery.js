var link = window.location.href;
var content = link.split("=").pop();
document.getElementById('stringBox').innerHTML = content;