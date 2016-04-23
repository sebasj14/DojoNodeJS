console.log('Server started (Mini Api)');

var express = require('express');
var app = express();

var PORT = 3777;
app.listen(PORT, function() {
	console.log("Port " + PORT + ": open.")
});

app.get('/', function(request, response){
	response.send("Bienvenido al mini api de saldos");
});

var bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended: true}));

app.post('/postTest', function(request, response){
	console.log(request.body);
	response.send("Gracias :D");
});

var pg = require('pg');
var URL = 'postgres://vxtorpoc:yHuj6XT90J-e5ZtMxj1tGUywFLcZb5IB@pellefant.db.elephantsql.com:5432/vxtorpoc';

var client =  new pg.Client(URL);
client.connect(function(err){
	if(err){
		return console.log('Error en la conexión a BD');
	}
	console.log('Conexión exitosa');
	client.end();
});

app.post('/api/insertar', function(req, res){
    var cedula = req.body.id;
    var nombre = req.body.name;
    var dinero = req.body.cash;
    
    var queryInsertar = 'INSERT INTO saldos VALUES('
                + cedula + ', '
                + '\'' + nombre + '\', '
                + dinero + ');'
    console.log(queryInsertar);
    
    pg.connect(URL, function(err, client, done){
        if (err){
            res.send('Error :(');
            return console.log('Error de conexión');
        }
        client.query(queryInsertar, function(err, result){
            if(err){
                res.send('Error :(');
                client.end();
                return console.log('Error en el query');
            }
            console.log('Se insertó');
            res.send('Ok :D');
            client.end();
        });
    });
});