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

var elements = document.getElementsByClassName("column");
var i;

function four() {
  for (i = 0; i < elements.length; i++) {
    elements[i].style.msFlex = "25%"; 
    elements[i].style.flex = "25%";
  }
}