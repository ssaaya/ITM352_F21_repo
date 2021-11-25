// Pull data from product_data.js
var products = require('./product_data.json');
// Sets query_string to load
const qs = require('querystring');
// Allowing express, server starts
var express = require('express');
var app = express();
// Monitors all requests
app.all('*', function (request, response, next) {
    console.log(request.method + ' to' + request.path);
    next();
});
//Get request for products data

// Uses data in body Lab14
app.use(express.urlencoded({extended: true}));

app.get('/product_data.js', function (request, response, next) {
    response.type('.js');
    var products_str = `var products = ${JSON.stringify(products)};`;
    response.send(products_str);
});

// post to invoice
app.post('/process_form', function (request, response, next) {
    // Grabs body
    var quantities = request.body["quantity"];
    var errors = {};
    let reqbody = request.body;
    var has_quantities = false; //assume no quantities
    // Check that quantities are non-negative integers
    for (i in quantities) {
        // check for quantities
        if (isNonNegInt(quantities[i]) == false) {
            errors['quantity_' + i] = `Please choose a valid quantity for ${products[i].name}`;
        }
        // Check if any quanties were selected
        if (quantities[i] > 0) {
            has_quantities = true;
        }
        // Check if quantity desired is avaialble
        if (quantities[i] > products[i].quantity_available) {
            errors['available_' + i] = `We don't have ${(quantities[i])} ${products[i].name} available.`;
        }
    }
        // Check if quantity is selected
        if (!has_quantities) {
            errors['no_quantities'] = `Please select some items!`;
         }


    let qty_obj = { "quantity": JSON.stringify(request.body["quantity"]) };
    // console.log(Object.keys(errors));
    //ask if the object is empty or not
    if (Object.keys(errors).length == 0) {
        // remove from inventory quantities
        for(i in products){
        products[i].quantity_available -= Number(reqbody[`quantities${i}`]);
        }
        response.redirect('./invoice.html?' + qs.stringify(qty_obj));
    } else { //if i have errors, take the errors and go back to pointeshoes.html
        let errs_obj = { "errors": JSON.stringify(errors) };
        console.log(qs.stringify(qty_obj));
        response.redirect('./pointeshoes.html?' + qs.stringify(qty_obj) + '&' + qs.stringify(errs_obj));
    }

});




// process purchase request (validate quantities, check quantity available)
// codes are referenced from info_server_Ex5.js
function isNonNegInt(q, returnErrors = false) {
    errors = []; // assume no errors
    if (q == '') q = 0  //blank means 0
    if (Number(q) != q) errors.push('<font color="red">Not a number</font>'); //check if value is a number
    if (q < 0) errors.push('<font color="red">Negative value</font>'); // Check if it is non-negative
    if (parseInt(q) != q) errors.push('<font color="red">Not an integer</font>'); // Check if it is an integer

    return returnErrors ? errors : (errors.length == 0);
}


// Using express to access "Public" folder files
app.use(express.static('./public'));

// Server start, listening to port 8080
app.listen(8080,() => console.log(`listening on port 8080`));
    
