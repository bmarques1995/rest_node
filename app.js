const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = 40;

app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port);

app.post('/', function(req, res) {
    var str = JSON.parse(req.body.teste2,(key,value) => {
        console.log(key);
        return value;
      });
    console.log(str);
    res.send(req.body);
});