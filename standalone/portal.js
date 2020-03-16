/*
Aiming for a better MCPS PowerSchool. This in no way logs ANY information, check the code below for proof.

To append use the folllowing in the address bar:

javascript:(function(){s=document.createElement(`script`);s.src=`https://shrayus-masanam.github.io/standalone/portal.js`;document.body.appendChild(s);})();

*/
if(window.location.hostname!=`portal.mcpsmd.org`){alert(`This only works on portal.mcpsmd.org after logging in.`);}
document.head.innerHTML=`<title>PowerSchool 2.0</title><style>body{font-family:Helvetica;}table,th,td {text-align:center;border:1px solid black;border-collapse:collapse;}a{color:black;}</style>`;
document.body.innerHTML=`<h1 id="name"></h1><select id="mp"><option value='"MP1"'>MP1</option><option value='"MP2"'>MP2</option><option value='"MP3"' selected>MP3</option><option value='"MP4"'>MP4</option></select><br><br><table id="gradeTable"><tr><td><strong><span class="courses">Course</span></strong></td><td><strong><span class="courses">Overall Grade</span></strong></td></tr></table>`;
let m;
let schoolId;
const currentTerm = `MP3` // Temporary solution
overallClick = function(secnum,idnum,schoolnum,mpnum) {
    document.getElementById(`name`).innerHTML = `Course Details for ` + student0;
    document.getElementById(`gradeTable`).innerHTML = `<table id="gradeTable"><tr><td><strong><span class="courses">Category</span></strong></td><td><strong><span class="courses">Weight</span></strong></td><td><strong><span class="courses">Points/Max Pts.</span></strong></td><td><strong><span class="courses">Percent</span></strong></td><td><strong><span class="courses">Letter Grade</span></strong></td></tr></table>`;
    if(typeof window[mpnum+secnum]==`undefined`) {
      let assignmentReq = new XMLHttpRequest();
      let prior = ``;
      if(mpnum!=currentTerm){prior=`_prior`;}
      assignmentReq.open(`GET`, `https://portal.mcpsmd.org/guardian/prefs/assignmentGrade_CategoryDetail`+prior+`.json?secid=`+secnum+`&student_number=`+idnum+`&schoolid=`+schoolnum+`&termid=`+mpnum);
      assignmentReq.onreadystatechange = function() { if(this.readyState == 4 && this.status == 200 && assignmentReq.responseText/*||typeof window[mpnum+secnum+`c`]==`undefined`*/){
        eval(mpnum+secnum+`=JSON.parse(assignmentReq.responseText);`);
        let mobjl = Object.keys(window[mpnum+secnum]).length;
        let n;
        for(n=0;n<mobjl+1,typeof window[mpnum+secnum][n].Description!=`undefined`;n++) {
          let table = document.getElementById(`gradeTable`);
          let row = table.insertRow(1);
          let cell1 = row.insertCell(0);
          let cell2 = row.insertCell(1);
          let cell3 = row.insertCell(2);
          let cell4 = row.insertCell(3);
          let cell5 = row.insertCell(4);
          cell1.innerHTML = window[mpnum+secnum][n].Description;
          cell2.innerHTML = window[mpnum+secnum][n].Weight;
          cell3.innerHTML = window[mpnum+secnum][n].PointsEarned+`/`+window[mpnum+secnum][n].PointsPossible;
          cell4.innerHTML = window[mpnum+secnum][n].Percent;
          cell5.innerHTML = window[mpnum+secnum][n].CategoryGrade;
        }
      }}
        assignmentReq.send();
      } else {
        let mobjl = Object.keys(window[mpnum+secnum]).length;
        let n;
        for(n=0;n<mobjl+1,typeof window[mpnum+secnum][n].Description!=`undefined`;n++) {
          let table = document.getElementById(`gradeTable`);
          let row = table.insertRow(1);
          let cell1 = row.insertCell(0);
          let cell2 = row.insertCell(1);
          let cell3 = row.insertCell(2);
          let cell4 = row.insertCell(3);
          let cell5 = row.insertCell(4);
          cell1.innerHTML = window[mpnum+secnum][n].Description;
          cell2.innerHTML = window[mpnum+secnum][n].Weight;
          cell3.innerHTML = window[mpnum+secnum][n].PointsEarned+`/`+window[mpnum+secnum][n].PointsPossible;
          cell4.innerHTML = window[mpnum+secnum][n].Percent;
          cell5.innerHTML = window[mpnum+secnum][n].CategoryGrade;
        }
      }
}
let updateOverallGrades = function() {
  if (window[`termid`+m] == document.getElementById(`mp`).value) {
    let table = document.getElementById(`gradeTable`);
    let row = table.insertRow(1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = `<a href='javascript:overallClick(`+window[`sectionid`+m]+`,`+window[`studentid0`]+`,`+schoolId+`,`+document.getElementById(`mp`).value.toString()+`);''><span class="courses">`+ window[`courseName`+m].replace(/"/g, '')+`</span></a>`;
    cell2.innerHTML = window[`overallgrade`+m].replace(/"/g, '');
  }
}
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
  client.open(`GET`, `https://portal.mcpsmd.org/guardian/prefs/gradeByCourseSecondary.json?schoolid=`+schoolId);
  client.onreadystatechange = function() {
    obj = JSON.parse(client.responseText);
    objl = Object.keys(obj).length;
    let makeVarsFromResponse = function(n) {
      let i;
      for (i=0;i<Object.keys(obj).length;i++) {
        eval(n + i + ` = JSON.stringify(obj[`+i+`].`+n+`);`);
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
schoolIdReq.send();
document.getElementById(`mp`).onchange = function() {
    let index = this.selectedIndex;
    let mpInput = this.children[index].value.trim();
    let grades = document.getElementById(`gradeTable`).children[0];
    document.getElementById(`gradeTable`).innerHTML = `<table id="gradeTable"><tr><td><strong><span class="courses">Course</span></strong></td><td><strong><span class="courses">Overall Grade</span></strong></td></tr></table>`;
    for (m;m>-1;m--) {
      updateOverallGrades();
    }
    m = objl;
}
