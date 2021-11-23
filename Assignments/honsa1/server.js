// From from Lab 13, screencast, uses npm express, querystring, and nodemon to run server
// Allowing express, server starts
var express = require('express');
var app = express();
// Pull data from product_data.js
var data = require('./public/product_data.js');
var products = data.products;
// Sets query_string to load
const qs = require('querystring');
// Monitors all requests
app.all('*', function (request, response, next) {
    console.log(request.method + ' to' + request.path);
    next();
});
//Get request for products data
app.get('/product_data.js', function (request, response) {
    response.type('.js');
    var products_str = `var products = ${JSON.stringify(products)};`;
    response.send(products_str);
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

// Uses data in body Lab14
app.use(express.urlencoded({extended: true}));

// post to invoice
app.post("/process_form", function (request, response) {
    // Grabs body
    let POST = request.body;
// check to make user inputs some value

   // check is quantities are valid (nonnegint and have inventory)
   var errors = {};//this will create object with nothing in it ro store errors if we find any

    //loop through all the quantitiy and see if there is any error
    for(i in request.body.quantity) {
        //this will recognize if there are any isnonnegint
        if(isNonNegInt(request.body.quantity[i]) == false) { //
            console.log(`${request.body.quantity[i]} is not a valid quantity for ${products[i].brand}`);
            errors['quantity'+i] = `${request.body.quantity[i]} is not a valid quantity for ${products[i].brand}`;
        
        }
        // this check if we have enough inventory
        if(request.body.quantity[i]>products[i].inventory){
            errors['inventory'+i] = `We do not have ${request.body.quantity[i]} products in stock for ${products[i].brand} sorry for inconvenience ` ;
          
    }
    //did they select any value
    if(request.body.quantity[i]>0){
        var has_quantities = true;
    }
}
    // If has_quanties is undfined, no quantities were selected
    if(typeof has_quantities == 'undefined') {
        errors['no_quantities'] = `You need to make selection`;
    }
    
           
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
});

// Using express to access "Public" folder files
app.use(express.static('./public'));

// Server start, listening to port 8080
app.listen(8080,() => console.log(`listening on port 8080`));
    
 // note the use of an anonymous function here



