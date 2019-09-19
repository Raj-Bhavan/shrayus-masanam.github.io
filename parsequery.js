var link = window.location.href;
var content = link.split("=").pop();
document.body.innerHTML = content;