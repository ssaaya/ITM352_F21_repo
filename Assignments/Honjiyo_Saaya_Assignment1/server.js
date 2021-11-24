// From from Lab 13, screencast, uses npm express, querystring, and nodemon to run server

// Pull data from product_data.js
var data = require('./product_data.js');
var products = data.products;
// Sets query_string to load
const qs = require('query-string');
// Allowing express, server starts
var express = require('express');
var app = express();
// Loads parser
var myParser = require("body-parser");
// Monitors all requests
app.all('*', function (request, response, next) {
    console.log(request.method + ' to' + request.path);
    next();
});
//Get request for products data
app.get('./product_data.js', function (request, response) {
    response.type('.js');
    var products_str = `var products = ${JSON.stringify(products)};`;
    response.send(products_str);
});
// From Lab 13, redirect invoice
app.all('*', function (request, response, next) {
    console.log(request.method + ' to path ' + request.path);
    next();
});

// Uses data in body Lab14
app.use(express.urlencoded({extended: true}));

// post to invoice
app.post('/process_form', function (request, response) {
    // Grabs body
    let POST = request.body;
    if (typeof POST['submit_purchase'] != 'undefined') {
        var has_valid_quantity = true;
        var has_quantity = false;
        for (i = 0; i < products.length; i++) {
            // Checks quantity
            q = POST[`quantity${i}`];
            // Greater than 0
            has_quantity = has_quantity || q > 0;
            // Greater than 0, and valid using nonnegint function
            has_valid_quantity = has_valid_quantity && isNonNegInt(q);
        }
        // Makes data into strings
        const stringified = query_string.stringify(POST);
           
   let qty_obj = {"quantity": JSON.stringify(request.body.quantity)};
   if(Object.keys(errors).length === 0) {
      

    //If data is valid, create invoice
    response.redirect('./invoice.html?' + qs.stringify(qty_obj));
   } else {
    qty_obj.errors = JSON.stringify(errors);
    response.redirect('./pointeshoes.html?' + qs.stringify(qty_obj));
   }
        // If valid
        if (has_valid_quantity && has_quantity) {
            // Sends to invoice
            response.redirect("./invoice.html?" + stringified);
            
        } else {
            // If not valid, sends back
            response.redirect("./pointeshoes.html?" + stringified);
            
        }
   }
});


// From lab 12
function isNonNegInt(q, return_errors = false) { //check if values are postitive, integer, whole values 
    errors = []; // assume no errors at first
    if (q == '') q = 0; //sets input quatity as 0 
    if (Number(q) != q) errors.push(' <b>This is not a number!</b>'); // Check if string is a number value
    else if (q < 0) errors.push('<b>Negative value!</b>'); // Check if it is non-negative
    else if (parseInt(q) != q) errors.push('<b>This is not a full value!</b>'); // Check that it is an integer
    return return_errors ? errors : (errors.length == 0);
}


// Using express to access "Public" folder files
app.use(express.static('./public'));

// Server start, listening to port 8080
app.listen(8080,() => console.log(`listening on port 8080`));
    
 // note the use of an anonymous function here