window.onload = function() {
	var link = window.location.href;
	var content = link.split("=").pop();
	if (content == "shrayus-masanam.github.io") {
		document.body.innerHTML = "<h1>Nothing to display.</h1>"
	} else {
		document.body.innerHTML = "<h1>String Generated</h1><br><br>" + content;
	}
}