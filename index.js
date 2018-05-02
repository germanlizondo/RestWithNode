var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.set('view engine', 'ejs');

var partidas = [];

app.get('/api/inici',(req,res,next) =>{
  //  res.render('index');
    res.send(partidas);
    next();
   
})

app.get('/api/consultaPartida/:codiPartida',(req,res,next) =>{
    var codiPartida = req.params.codiPartida;
    console.log(codiPartida);
    function buscar(id) { 
        return id.partida === codiPartida;
    }
   res.send(partidas.find(buscar));
    next();
})

app.post('/api/iniciaJoc/:codiPartida',(req,res) =>{
  //  console.log(req.body);
    var numpartida = req.params;
    console.log(numpartida.codiPartida);
    partidas.push({
        "partida" : numpartida.codiPartida,
        "jugada" : "",
        "guanyades" : 0,
        "derrotes" : 0,
        "victoria" : "no"
    })
    console.log(partidas);
    res.send(200,partidas)

 // res.redirect('/api/inici');
})

app.put('/api/mouJugador/:codiPartida/:moviment',(req,res)=>{
    var codiPartida = req.params.codiPartida;
    var moviment = req.params.moviment;
    var jugadaIa=["pedra","paper","tisores"];
    
    var aleatori = Math.floor(Math.random()*(2+1))
    console.log(aleatori);
    var resIA=jugadaIa[aleatori];
    console.log(resIA);
    function buscar(id) { 
        return id.partida === codiPartida;
    }

    var victories = 0;
    var derrotes = 0;
    if (victories==3){
        res.send("Guanyes");
    }else if(derrotes==3){
        res.send("Perds");
    }
    
    else{
        if(moviment==resIA) {
            res.send("Torn Empatat");
           
        }
        else if(moviment=="pedra" && resIA=="paper"){ 
            res.send("Torn Perdut");
            derrotes++;
            console.log("D: "+derrotes+"V: "+victories);
        }
        else if(moviment=="pedra" && resIA=="tisores"){
            res.send("Torn Guanyat");
            victories++;
            console.log("D: "+derrotes+"V: "+victories);
        }
        else if(moviment=="paper" && resIA=="tisores"){ 
            res.send("Torn Perdut");
            derrotes++;
            console.log("D: "+derrotes+"V: "+victories);
        }
        else if(moviment=="paper" && resIA=="pedra"){
            res.send("Torn Guanyat");
            victories++;
            console.log("D: "+derrotes+"V: "+victories);
        }
        else if(moviment=="tisores" && resIA=="pedra"){ 
            res.send("Torn Perdut");
            derrotes++;
            console.log("D: "+derrotes+"V: "+victories);
        }
        else if(moviment=="tisores" && resIA=="paper"){
            res.send("Torn Guanyat");
            victories++;
            console.log("D: "+derrotes+"V: "+victories);
        }

    }

  
    console.log(req.body);
  
    
})

app.delete('/api/acabaJoc/:codiPartida', (req,res,next)=>{
    var codiPartida = req.params.codiPartida;
    function buscar(id) { 
        return id.partida === codiPartida;
    }
    res.send("Partida acabada");
   console.log(partidas.find(buscar));
   next();
})

app.listen(port, () =>{
    console.log(`Hello There Port: ${port}`);
})