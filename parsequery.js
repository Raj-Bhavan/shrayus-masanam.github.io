var link = window.location.href;
var content = link.split("=").pop();
document.body.innerHTML = "Your string is:\n\n" + content;