/*Saaya Honjiyo
Due 12/14/21
Dr. Port
*/
//adopted from Lab 13,14,15,my assignments 1+2, and assignment 3 examples. other specific sources will be commented on the side
var express = require('express');
var app = express();
var myParser = require("body-parser");
// pull products.js data
var data = require('./products.js');
var myProducts = data.myProducts;
// reads user data
var fs = require('fs');
var filename = './user_data.json';
const shift = 4; //from chloe and caixin s21 helps to encrypt pswd
//create session and cookies
var session = require('express-session');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
//nodemailer for sending email after invoice
var nodemailer = require("nodemailer");//help from https://www.npmjs.com/package/nodemailer https://www.w3schools.com/nodejs/nodejs_email.asp

// Routing 
//to monitor all requests
app.all('*', function (request, response, next) {
  console.log(request.method + ' to ' + request.path);
  next();
});
// set up cart session
//this will get product key sent from the post form, convert strings from post to numbers and store them, then redirect to the cart
app.get("/add_to_cart", function (request, response) {
  var product_key = request.query['prod_key']; 
  var quantities = request.query['quantities'].map(Number); 
  request.session.cart[product_key] = quantities; 
  response.redirect('./cart.html');
});
//this will make the products sticky when customer wants to add more products to cart in the same session.
app.post("/get_cart", function (req, res) {
  if (typeof req.session.cart == 'undefined') {
    req.session.cart = {};
  }
  res.json(req.session.cart);
});
//from Lab 14 
//to check if the user already exists in the server or not
if (fs.existsSync(filename)) {
  var data = fs.readFileSync(filename, 'utf-8');
  var user_data = JSON.parse(data);
  //if the user does not exists, console will push message saying user doesn't exist
} else {
  console.log(`${filename} does not exist!`);
}


//PSWD ENCRYPTION -- ec//
// took from chloe and caixin s21
function encrypt(password) {
  var encrypted = [];
  var encrypted_result = "";

  //encrypt the password Referece: Stack overflow 
  //save the new password as encrypted
  for (var i = 0; i < password.length; i++) {
    encrypted.push(password.charCodeAt(i) + shift);
    encrypted_result += String.fromCharCode(encrypted[i]);
  }
  return encrypted_result;
}

// registration and login-- check/validation help from https://www.formget.com/form-validation-using-javascript/  https://www.w3resource.com/javascript/form/email-validation.php  //
// *registration section* //
app.post("/process_register", function (req, res) {
  console.log(req.body);
  // assume no errors from start, so set no register errors 
  var reg_errors = {};

  // VALIDATION - full name//
  if (/^[A-Za-z, ]+$/.test(req.body.fullname)) { //check if full name is inputted correctly- only letters
  }
  else {
    reg_errors['fullname'] = 'Only letters can be inputted into Full Name. (Ex. Jane Doe)';// pop up in case an error
  }

  if (req.body.fullname.length > 30 && req.body.fullname.length < 1) { //check if the characters is less than 1 or greater than 30
    reg_errors['fullname'] = 'Maximum 30 Characters';// if customer entered invalid length, push error message
  }

  // VALIDATION- username //
  var reg_username = req.body.username.toLowerCase(); //requires username to be in lowercase

  if (req.body.username.length > 10 || req.body.username.length < 4) { //check if the length of username is less than 4 characters or greater than 10
    reg_errors['username'] = 'A minimum of 4 characters and maximum of 10 characters can be inputted for your username.';// if enter invalid length push error message
  }

  if (typeof user_data[reg_username] != 'undefined') { //check if the username is taken or not
    reg_errors['username'] = 'Sorry, this username is already registered.';//if the username is taken, push error message
  }


  if (typeof user_data[reg_username] == '') { //check if the username field is empty or not
    reg_errors['username'] = 'You need a username!'; // if empty, push error message
  }

  if (/^[0-9a-zA-Z]+$/.test(req.body.username)) {// check if username contains only letters and numbers
  }
  else {
    reg_errors['username'] = 'Numbers and letters only please. (Ex. Abc123)';//if the user enter a wrong username, show this
  }

  // VALIDATION-- email//
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(req.body.email)) {// Email only allows certain character for x@y.z
  }
  else {
    reg_errors['email'] = 'Please enter a valid email (Ex. user@mailserver.domain).';//otherwise, show this to the user
  }

  // VALIDATION-- password //
  if (req.body.password.length < 6) {//password length need to be 6 characters or more
    reg_errors['password'] = 'Please make a password with a minimum of 6 characters';// otherwise, show this
  }

  // VALIDATION-- password repeat //
  if (req.body.password !== req.body.repeat_password) {  // check if the repeat password is matching password
    reg_errors['repeat_password'] = 'Incorrect password';// if not, push error message
  }

  // If no errors then save new user data in JSON file and redirect to invoice, if error send back to registration form and push error messages
  if (Object.keys(reg_errors).length == 0) {
    //if no registration errors, save new user data to user_data.json
    console.log('no errors')
    var username = req.body['username'].toLowerCase();
    user_data[username] = {};
    user_data[username]["name"] = req.body['fullname'];
    user_data[username]["password"] = req.body['password'];
    user_data[username]["email"] = req.body['email'];

    fs.writeFileSync(filename, JSON.stringify(user_data), "utf-8");
    // put the entered quanitiy data into the temp_qty_data
    temp_qty_data['username'] = username;
    temp_qty_data['email'] = user_data[username]["email"];
    //get the username and email from the register information
    let params = new URLSearchParams(temp_qty_data);
    res.redirect('/invoice.html?' + params.toString());// if good to go, send the user to invoice page with query string
  }

  //if there is an error, redirect to register page
  else {
    req.body['reg_errors'] = JSON.stringify(reg_errors);
    let params = new URLSearchParams(req.body);
    res.redirect('register.html?' + params.toString());
  }
});

// *login section*//
app.post("/process_login", function (req, res) {
  // process post request from login form and redirect to invoice if ok, back to login page if not
  var the_username = req.body.username.toLowerCase(); // requires username in lowercase

  if (typeof user_data[the_username] != 'undefined') { 
    if (user_data[the_username].password == req.body.password) {
      // add the stored quanity data into the query and user name to see who is logged in
      temp_qty_data['username'] = the_username;
      temp_qty_data['email'] = user_data[the_username].email;
      let params = new URLSearchParams(temp_qty_data); 
      res.redirect('/invoice.html?' + params.toString());//if login is correct, send to invoice page with the username and email to the string
      return;

    } else { //if password invalid, push error message
      req.query.username = the_username;
      req.query.LoginError = 'Invalid Password';
    }
  } else { //if username invalid, push error message
    req.query.LoginError = 'Username does not exist';

  }
  params = new URLSearchParams(req.query);
  res.redirect('./login.html?' + params.toString());//redirect to login page if there is a error
});

// *purchase process* //

// modified from Lab 12 order_page.html
// checks if the string q is non neg int
function isNonNegInt(q, return_errors = false) {
  errors = []; // assume no errors at first
  if (q == '') q = 0; // blank inputs=0
  if (Number(q) != q) errors.push('<font color="red">Not a number!</font>'); // Check if string is a number value
  if (q < 0) errors.push('<font color="red">Negative value!</font>'); // Check if it is non-negative
  if (parseInt(q) != q) errors.push('<font color="red">Not an integer!</font>'); // Check that it is an integer
  return return_errors ? errors : (errors.length == 0);
}

// process purchase request- validate quantities
app.post("/process_form", function (req, res, next) {
  // check the quantity, if it is not valid, send it to the products display page in order to repurchase
  let POST = req.body;

  var errors = {};
  // assume no quantities from the start, so set no quantities error 
  //if user enter empty quantities, show this text
  errors['no_quantities'] = 'Please enter some quantities';

  for (i = 0; i < products.length; i++) {
    qua = POST['quantity' + i];
    if (isNonNegInt(qua) == false) { 
      errors['quantity' + i] = `Please enter valid quantities for ${products[i].name}`; //push alert for error if quantity is not valid
    }
    // making the product quantities sticky
    if (qua > 0) {
      delete errors['no_quantities'];
      if (qua > products[i].inventory) {
        errors['inventory' + i] = `${qua} of ${products[i].name} not available. Only ${products[i].inventory} available.`;
      }
    }
  }
  // If quantities entered is valid, remove quantities from inventory and redirect to login
  QString = querystring.stringify(POST); //in order to stringing the query
  if (JSON.stringify(errors) === '{}') {
    // remove purchased items from inventory
    for (i = 0; i < products.length; i++) {
      products[i].inventory -= Number(POST['quantity' + i]);
    }
    // keep the quanity data on server until needed for invoice
    temp_qty_data = req.body;
    res.redirect("./login.html?" + `    `); // if it is valid, send to login page
  } else {
    let errObj = { 'error': JSON.stringify(errors) }; // show what is the errors
    QString += '&' + querystring.stringify(errObj);
    res.redirect("./products_display.html?" + QString); // if it is incorrect, send to products display html
  }
});


// after purchase, nodemailer
// took from assignment 3 example
  // this sets up the mail server, it can only work across the uh network due to security restrictions
app.post('/complete_purchase', function (req, res) {
  let username = req.cookies["login"];
  var invoicehtml = req.body.invoicehtml
  var user_email = user_data[username].email;
  var transporter = nodemailer.createTransport({
    host: "mail.hawaii.edu",
    port: 25,
    secure: false, // use TLS
    tls: {
      rejectUnauthorized: false
    }
  });
  //get the username and email from user data

  //this is what is in the email
  var mailOptions = {
    from: 'saayah@hawaii.edu',
    to: user_email,
    subject: 'Thank you for your recent purchase! Here is the confirmation receipt of your order.', 
    html: invoicehtml,

  };
  //this is what is in the email if there is an error
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      status_str += '<br>There was an error and your receipt could not be emailed.'; 
    } else {
      status_str += `<br>Your receipt was mailed to ${user_data[username].email}`;
    }
    res.json({ "status": status_str });
  });
});


// route all other GET requests to files in public 
app.use(express.static('./public'));

// start server
app.listen(8080, () => console.log(`listening on port 8080`));