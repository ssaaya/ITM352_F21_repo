var express = require('express');

var app = express();
// get products data

app.all('*', function (req, res, next) {
    console.log(req.method, req.path);
    next();
} );


app.use(express.public('./public'));

var listener = app.listen(8080, () => { console.log('server started listening on port ' + listener.address().port) });