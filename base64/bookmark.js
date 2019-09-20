/* alert("We're under construction.  Check back later."); */
pageCode = document.body.innerHTML;
var choice = confirm('Press OK for Encode, Cancel for Decode'); 
if (choice==true) { 
  var string = prompt('String?'); 
  var encodedString = btoa(string);
  document.body.innerHTML = "<body><h1>String Generated</h1><br>" + encodedstring + "<br><br><button onclick='document.body.innerHTML = pageCode; delete pageCode;'>Restore page</button>";
  /* location.replace("https://shrayus-masanam.github.io/base64/?s=*"+encodedString); */ 
} else { 
  var string = prompt('String?'); 
  var decodedString = atob(string);
  document.body.innerHTML = "<body><h1>String Generated</h1><br>" + decodedString + "<br><br><button onclick='document.body.innerHTML = pageCode; delete pageCode;'>Restore page</button>";
  /* location.replace("https://shrayus-masanam.github.io/base64/?s=*"+decodedString); */ 
}
