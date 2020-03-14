/*
Aiming for a better MCPS PowerSchool
To append use javascript:let s=document.createElement(`script`);s.src=`https://shrayus-masanam.github.io/standalone/portal.js`;document.body.appendChild(s);
*/
document.head.innerHTML=`<title>PowerSchool 2.0</title><style>body{font-family:Helvetica;}table,th,td {text-align:center;border:1px solid black;border-collapse:collapse;}</style>`;
document.body.innerHTML=`<h1 id="name"></h1><select id="mp"><option value='"MP1"'>MP1</option><option value='"MP2"'>MP2</option><option value='"MP3"'>MP3</option><option value='"MP4"'>MP4</option></select><br><br><table id="gradeTable"><tr><td><strong>Course</strong></td><td><strong>Overall Grade</strong></td></tr></table>`;
/*<input id="jsonNum"></input><button onclick='document.getElementById("dump").value="";let k = 0;while (k<11) {document.getElementById("dump").value=document.getElementById("dump").value+"\\n"+varsToMake[k]+document.getElementById("jsonNum").value+":        "+window[varsToMake[k]+document.getElementById("jsonNum").value];k++;}'>Get</button><br><textarea id="dump"></textarea>`*/
let m;
let schoolId;
//const checkForVar = function(variable, process){if(typeof variable !== "undefined"){eval(process);}else{setTimeout(checkForVar, 250);}}
let updateOverallGrades = function() {
  if (window[`termid`+m] == document.getElementById(`mp`).value) {
    let table = document.getElementById(`gradeTable`);
    let row = table.insertRow(1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = window[`courseName`+m].replace(/"/g, '');
    cell2.innerHTML = window[`overallgrade`+m].replace(/"/g, '');
  }
}
/*
attempt=true;
let client = new XMLHttpRequest();
client.open(`GET`, `https://portal.mcpsmd.org/guardian/prefs/gradeByCourseSecondary.json?schoolid=`+schoolId.toString());
client.onreadystatechange = function() {
  obj = JSON.parse(client.responseText);
  objl = Object.keys(obj).length;
  let makeVarsFromResponse = function(n) {
    let i;
    for (i=0;i<Object.keys(obj).length;i++) {
      eval(n + i + ` = JSON.stringify(obj[`+i+`].`+n+`);`);
      console.log(n + i);
    }
  }
  varsToMake = [`studentid`,`student`,`courseName`,`teacher`,`email_addr`,`period`,`room`,`sectionid`,`termid`,`overallgrade`,`schoolid`];
  let j;
  for(j=0;j<Object.keys(varsToMake).length+1;j++) {
    makeVarsFromResponse(varsToMake[j]);
  }
    if (attempt==true) {
      attempt = false;
      for (m=Object.keys(obj).length;m>-1;m--) {
        updateOverallGrades();
        document.getElementById(`name`).innerHTML = `Term Grades for ` + student0;
      }
      m=Object.keys(obj).length;
    }
}
*/
//function contWSchool(){if(typeof schoolId != "undefined"){client.send();}else{setTimeout(contWSchool, 250);}}
let schoolIdReq = new XMLHttpRequest();
schoolIdReq.open(`GET`, `https://portal.mcpsmd.org/guardian/home.html`)
schoolIdReq.onreadystatechange = function() {
  var portalPage = document.createElement(`html`);
  portalPage.innerHTML = schoolIdReq.responseText;
  var source = portalPage.innerHTML;
  var found = source.search("root.schoolId");
  eval(source.slice(found+5, found+32));
  attempt = true;
  let client = new XMLHttpRequest();
  client.open(`GET`, `https://portal.mcpsmd.org/guardian/prefs/gradeByCourseSecondary.json?schoolid=`+schoolId.toString());
  client.onreadystatechange = function() {
    obj = JSON.parse(client.responseText);
    objl = Object.keys(obj).length;
    let makeVarsFromResponse = function(n) {
      let i;
      for (i=0;i<Object.keys(obj).length;i++) {
        eval(n + i + ` = JSON.stringify(obj[`+i+`].`+n+`);`);
        console.log(n + i);
      }
    }
    varsToMake = [`studentid`,`student`,`courseName`,`teacher`,`email_addr`,`period`,`room`,`sectionid`,`termid`,`overallgrade`,`schoolid`];
    let j;
    for(j=0;j<Object.keys(varsToMake).length+1;j++) {
      makeVarsFromResponse(varsToMake[j]);
    }
      if (attempt==true) {
        attempt = false;
        for (m=Object.keys(obj).length;m>-1;m--) {
          updateOverallGrades();
          document.getElementById(`name`).innerHTML = `Term Grades for ` + student0;
        }
        m=Object.keys(obj).length;
      }
  }
  client.send();
}
schoolIdReq.send()
document.getElementById(`mp`).onchange = function() {
    let index = this.selectedIndex;
    let mpInput = this.children[index].value.trim();
    let grades = document.getElementById(`gradeTable`).children[0];
    while(grades.children.length > 1)
    {
      grades.removeChild(grades.children[1]);
    }
    for (m;m>-1;m--) {
      updateOverallGrades();
    }
    m = objl;
}
