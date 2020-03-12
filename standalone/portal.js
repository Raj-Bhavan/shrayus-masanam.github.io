document.head.innerHTML=``;
document.body.innerHTML=`<input id="jsonNum"></input><button onclick='document.getElementById("dump").value="";var k = 0;while (k<11) {document.getElementById("dump").value=document.getElementById("dump").value+"                    "+window[varsToMake[k]+document.getElementById("jsonNum").value];k++;}'>Get</button><br><textarea id="dump"></textarea>`;
var client = new XMLHttpRequest();
client.open('GET', 'https://portal.mcpsmd.org/guardian/prefs/gradeByCourseSecondary.json?schoolid=823');
client.onreadystatechange = function() {
  var obj = JSON.parse(client.responseText);
  var makeVarsFromResponse = function(n) {
    var i;
    for (i=0;i<Object.keys(obj).length;i++) {
      eval(n + i + ` = JSON.stringify(obj[`+i+`].`+n+`);`);
      console.log(n + i);
    }
  }
  varsToMake = [`studentid`,`student`,`courseName`,`teacher`,`email_addr`,`period`,`room`,`sectionid`,`termid`,`overallgrade`,`schoolid`];
  var j;
  for(j=0;j<Object.keys(varsToMake).length+1;j++) {
    makeVarsFromResponse(varsToMake[j]);
  }
}
client.send();
