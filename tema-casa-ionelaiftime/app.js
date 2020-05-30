'use strict';
const express = require('express');
var cookieParser = require('cookie-parser')
var session = require('express-session')
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser')

const app = express();

const fs = require('fs');
var listaUtilizatori=[];
fs.readFile('utilizatori.json', (err, data) => {
  if (err) throw err;
  listaUtilizatori= JSON.parse(data);
});

const port = 6789;
var listaIntrebari=[];

app.use(session({
  key: 'user',
  secret:'secret',
  resave:false,
  saveUninitialized:false,
  cookie:
  {
    expires:10000

  }
}));

app.use("/public",express.static("public"));
session.utilizator=null;
session.cos=[]

// directorul 'views' va conține fișierele .ejs (html + js executat la server)
app.set('view engine', 'ejs');
// suport pentru layout-uri - implicit fișierul care reprezintă template-ul site-ului este views/layout.ejs
app.use(expressLayouts);
// directorul 'public' va conține toate resursele accesibile direct de către client (e.g., fișiere css, javascript, imagini)
app.use(express.static('public'));
// corpul mesajului poate fi interpretat ca json; datele de la formular se găsesc în format json în req.body
app.use(bodyParser.json());
// utilizarea unui algoritm de deep parsing care suportă obiecte în obiecte
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

// proprietățile obiectului Request - req - https://expressjs.com/en/api.html#req
// proprietățile obiectului Response - res - https://expressjs.com/en/api.html#res
app.get('/', (req, res) =>
{

    res.render('index',{utilizator:session.utilizator});
});
app.get('/test', (req, res) =>
{

    res.render('test',{utilizator:session.utilizator});
});
app.get('/test4', (req, res) =>
{

    res.render('test4',{utilizator:session.utilizator});
})
app.get('/test2', (req, res) =>
{

    res.render('test2',{utilizator:session.utilizator});
})
app.get('/test3', (req, res) =>
{

    res.render('test3',{utilizator:session.utilizator});
})
   
app.get('/index',(req,res) =>
{
 
    res.render('index',{utilizator:session.utilizator});
});


app.get('/logout',(req,res) =>
{
  session.utilizator=null;
  session.cos=[];
  res.redirect('/');
});

 


// la accesarea din browser adresei http://localhost:6789/chestionar se va apela funcția specificată

//app.get('/autentificare', (req, res) => res.render('autentificare'));

app.get('/autentificare', (req, res) => 
{
  res.clearCookie('mesajEroare'); 
  res.render('autentificare',{mesajEroare:req.cookies["mesajEroare"]});
  
});


app.post('/verificare-autentificare', (req, res) => {
    var corect=false;
    //console.log(req.body);
    for(let i=0;i<listaUtilizatori.length;i++)
    {
  
   //console.log(listaUtilizatori);
      if(req.body.utilizator==listaUtilizatori[i].utilizator&&req.body.password==listaUtilizatori[i].parola)
      {
        
        corect=true;
        res.cookie("utilizator",req.body.utilizator);
      
        session.utilizator={utilizator:listaUtilizatori[i].utilizator,prenume:listaUtilizatori[i].prenume,nume:listaUtilizatori[i].nume,admin:listaUtilizatori[i].admin};
        res.redirect("http://localhost:6789/");
         
      }}
      
      if(corect==false)
      {
        res.cookie('mesajEroare',"Autentificare eronata");
        res.redirect('/autentificare');
      }  
      
    
    });
  

app.get('/chestionar', (req, res) => {

  fs.readFile('intrebari.json', (err, data) => {
    //if (err) throw err;
    listaIntrebari = JSON.parse(data);
   // console.log(listaIntrebari);
    res.render('chestionar', {intrebari: listaIntrebari,utilizator:session.utilizator});
  });
    
  // în fișierul views/chestionar.ejs este accesibilă variabila 'intrebari' care conține vectorul de întrebărirtrhttg
});

app.post('/rezultat-chestionar', (req, res) => {
  let json=JSON.stringify(req.body);
 
  var a =JSON.parse(json);
  var b=0;
  console.log(a);
  for(let i=0;i<listaIntrebari.length;i++)
  {


    if(a["q "+i]==listaIntrebari[i].corect)
      b++;
    
  }
  //console.log(b);
  res.render('rezultat-chestionar',{intrebari: listaIntrebari,Raspunsuri_corecte:b,utilizator:session.utilizator});
});
 

app.listen(port, () => console.log(`Serverul rulează la adresa http://localhost:`));