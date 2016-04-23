var http = require('http');
var sebasModulo = require('./sebasModulo');

var suma = sebasModulo.suma(12, 38);
var port = 8181;

http.createServer(function(request, response){
	console.log("Server started @ " + port);
	response.write("Hola, Sebas\n");
	response.write("Suma: " + suma);
	response.end();
}).listen(port);