var express = require('express');
var app = express();

app.use(express.static('./public'));

app.all('*', function (request, response, next) {
    console.log(request.method + ' to path ' + request.path + ' query string ' + JSON.stringify(request.query));
    next();
});

app.get('/test', function (request, response, next) {
    response.send(request.method + ' to path ' + request.path + ' query string ' + JSON.stringify(request.query));
});

app.use(express.static('./public'));

app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here to do a callback
