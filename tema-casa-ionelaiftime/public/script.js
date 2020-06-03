function info()
{
  getDate1();
  setInterval(getDate1, 1000);

}


function getDate1()
{
    var dt=new Date();
    document.getElementById("datetime").innerHTML = dt.toDateString();
}



function four() {
  var elements = document.getElementsByClassName("column");
  var i;
  for (i = 0; i < elements.length; i++) {
    elements[i].style.msFlex = "25%"; 
    elements[i].style.flex = "25%";
  }
  var elements1 = document.getElementsByClassName("column1");
  var i;
  for (i = 0; i < elements1.length; i++) {
    elements1[i].style.msFlex = "25%"; 
    elements1[i].style.flex = "28%";
  }
}

function five() {
  var elements = document.getElementsByClassName("column");
  var i;
  for (i = 0; i < elements.length; i++) {
    elements[i].style.msFlex = "25%"; 
    elements[i].style.flex = "25%";
  }
  var elements1 = document.getElementsByClassName("column1");
  var i;
  for (i = 0; i < elements1.length; i++) {
    elements1[i].style.msFlex = "25%"; 
    elements1[i].style.flex = "23%";
  }
}