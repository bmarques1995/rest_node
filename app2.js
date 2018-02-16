const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Jogo = require('./jogo');

const port = 8080;
const db = 'mongodb://localhost/jogos';

// Use native ES6 promises
mongoose.Promise = global.Promise;
mongoose.connect(db);

/*
 connect to mongo function
 const open = () => {
   let connection = mongoose.connection;
   mongoose.Promise = global.Promise;
   mongoose.connect(db);
   mongoose.connection.on('open', () => {
             console.log('We have connected to mongodb');
         });
   return connection;
  };

// open();*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) =>
  res.send('Olá, amigo!'));

/*
app.get('/jogos', (req, res) => {
  console.log('Enviando todos os jogos');
  Jogo.find({})
    .exec((err, jogos) => {
      if(err) {
        res.send('error occured');
      } else {
        console.log('Enviado');
        res.json(jogos);
    }
 })
});
*/

// Promise Example
app.get('/jogos', (req, res) => {
  Jogo.find({},null,{sort:{titulo:1}})
    .exec()
    .then((jogos) => {
      console.clear();
      console.log('Enviado');
      res.json(jogos);
    })
    .catch((err) => {
      res.send('error occured');
    });
 });

app.get('/jogos/:id', (req, res) =>
 // console.log('getting all jogos');
  Jogo.findOne({
    _id: req.params.id
    })
    .exec((err, jogos) => {
      if(err) {
        res.send('error occured')
      } else {
        console.log(jogos);
        res.json(jogos);
    }
}));

app.post('/jogo',(req, res) => {
  let newJogo = new Jogo();
  
  newJogo.titulo = req.body.titulo;
  newJogo.us = req.body.us;
  newJogo.mx = req.body.mx;
  if(req.body.mx=='')
    delete(newJogo['mx']);
  newJogo.br = req.body.br;
  if(req.body.br=='')
    delete(newJogo['br']);
  newJogo.img = req.body.img;
  newJogo.grupo = req.body.grupo;
  newJogo.plataforma = req.body.plataforma;

  newJogo.save().then((jogo) => {
      console.log(jogo);
      res.send(jogo);
  }).catch((err) => {res.json(err)});
});

app.post('/jogo2', (req, res) =>
  Jogo.create(req.body, (err, jogo) => {
    if(err) {
      res.send('Erro ao cadastrar jogo');
    } else {
      console.log(jogo);
      res.send(jogo);
  }
}));

app.put('/jogo/:id', (req, res) =>
  Jogo.findOneAndUpdate({
    _id: req.params.id
    },
    { $set: { title: req.body.title }
  }, {upsert: true}, (err, newJogo) => {
    if (err) {
      res.send('Erro ao atualizar');
    } else {
      console.log(newJogo);
      res.send(newJogo);
  }
}));

app.delete('/jogo/:id', (req, res) =>
  Jogo.findOneAndRemove({
    _id: req.params.id
  }, (err, jogo) => {
    if(err) {
      res.send('error removing')
    } else {
      console.log(jogo);
      res.status(204);
  }
}));

app.listen(port, () =>
  console.log('app listening on port ' + port));