window.onload = function() {
	var link = window.location.href;
	var content = link.split("=")[0].pop();
	if (content == "https://shrayus-masanam.github.io/base64/") {
		document.body.innerHTML = "<h1>Nothing to display.</h1>"
	} else {
		document.body.innerHTML = "<h1>String Generated</h1><br>" + content;
	}
}