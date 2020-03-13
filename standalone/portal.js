/* Aiming for a better MCPS PowerSchool */
let mp = prompt(`"MP1", "MP2", "MP3", or "MP4"?`)
document.head.innerHTML=`<style>table,th,td {font-family:Helvetica;border:1px solid black;border-collapse:collapse;}</style>`;
document.body.innerHTML=`<table id="gradeTable"><tr><td><strong>Course</strong></td><td><strong>Overall Grade</strong></td></tr></table>`;
let oldHTML = `<input id="jsonNum"></input><button onclick='document.getElementById("dump").value="";var k = 0;while (k<11) {document.getElementById("dump").value=document.getElementById("dump").value+"\\n"+varsToMake[k]+document.getElementById("jsonNum").value+":        "+window[varsToMake[k]+document.getElementById("jsonNum").value];k++;}'>Get</button><br><textarea id="dump"></textarea>`
attempt = true;
var client = new XMLHttpRequest();
client.open('GET', 'https://portal.mcpsmd.org/guardian/prefs/gradeByCourseSecondary.json?schoolid=823');
client.onreadystatechange = function() {
  obj = JSON.parse(client.responseText);
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
  var m;
  if (attempt==true) {
    attempt = false;
    for (m=Object.keys(obj).length;m>-1;m--) {
      if (window["termid"+m] == mp) {
        console.log("Match!")
        var table = document.getElementById("gradeTable");
        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = window["courseName"+m].replace(/"/g, '');
        cell2.innerHTML = window["overallgrade"+m].replace(/"/g, '');
      }
    }
  }
}
client.send();
