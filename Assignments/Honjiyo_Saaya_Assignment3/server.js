/*Saaya Honjiyo
Due 12/14/21
Dr. Port
*/
//adopted from Lab 13,14,15,my assignments 1+2, and assignment 3 examples. other specific sources will be commented on the side
var express = require('express');
var app = express();
// pull products.js data
var data = require('./products.js');
var myProducts = data.myProducts;
// loads starts up fs system actions
var fs = require('fs');
//set filename equal to user data.json
var filename = './user_data.json';
// encryption for passwords - from chloe and caixin s21
const e = require('express');
const shift = 4;
//set up session and cookies
var session = require('express-session');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
// Lab 15 initialize the session
app.use(session({ secret: "MySecretKey", resave: true, saveUninitialized: true }));
//Set for nodemailer
var nodemailer = require('nodemailer');
// Routing 
// monitor all requests
//Borrowed from Lab 13
app.all('*', function (request, response, next) {
  console.log(request.method + ' to ' + request.path);
  next();
});
// convert products.js into JSON
app.get('/products.js', function (request, response, next) {
  response.type('.js');
  var products_str = `var myProducts = ${JSON.stringify(myProducts)};`;
  response.send(products_str);
});

//CART session
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


//Borrowed and modified from Lab 13
app.use(express.urlencoded({ extended: true }));
// borrowed from Lab 14 
//check if the file already exists in the given path or not
if (fs.existsSync(filename)) {
  var data = fs.readFileSync(filename, 'utf-8');
  var user_data = JSON.parse(data);
  //if the file does not exists, the console willl show the nme of the file, and tell the file is not exist.
} else {
  console.log(`${filename} does not exist!`);
}






// registration and login-- check/validation help from https://www.formget.com/form-validation-using-javascript/  https://www.w3resource.com/javascript/form/email-validation.php  //

//*************************registration section*************************//

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

  // this saves new user data if no errors
  if (Object.keys(reg_errors).length == 0) {
    console.log('no errors')
    var username = req.body['username'].toLowerCase();
    user_data[username] = {};
    user_data[username]["name"] = req.body['fullname'];
    user_data[username]["password"] = req.body['password'];
    user_data[username]["email"] = req.body['email'];

    fs.writeFileSync(filename, JSON.stringify(user_data), "utf-8");
    temp_qty_data['username'] = username;
    temp_qty_data['email'] = user_data[username]["email"];
    //get the username and email from the register information
    let params = new URLSearchParams(temp_qty_data);
    // if no errors send the user to invoice page with query string
    res.redirect('/invoice.html?' + params.toString());
  }

  //if there is an error, redirect to register page
  else {
    req.body['reg_errors'] = JSON.stringify(reg_errors);
    let params = new URLSearchParams(req.body);
    res.redirect('register.html?' + params.toString());
  }
});

// *****************************login section**********************************//

app.get('/login.html', function (req, res, next) {
  if (!req.header('Referrer').includes('login.html')) {
    req.session.login_refferer = req.header('Referrer');
  }
  next();
});


app.post("/process_login", function (req, res) {
  // process login form and redirect to logged in session page if no errors, back to login page if errors
  var the_username = req.body.username.toLowerCase(); //username in lowercase
  var the_password = req.body.password;
  let encrypted_password_input = encrypt(the_password);
  if (typeof user_data[the_username] != 'undefined') { //matching username
    if (user_data[the_username].password == encrypted_password_input) { 
      res.cookie('login', the_username, { maxAge: 24 * 60 * 60 * 1000 });
      res.redirect(req.session.login_refferer);//if no errors, send to invoice page with the username and email to the string
      return;

    } else { //push error if inalid password
      req.query.username = the_username;
      req.query.LoginError = 'Invalid Password';
    }
  } else { //push error if invalid username
    req.query.LoginError = 'Invalid Username';

  }
  //redirect to login page if there is a error with the errror messages
  params = new URLSearchParams(req.query);
  res.redirect('./login.html?' + params.toString());
});

app.post("/process_login", function (req, res) {
  // process post request from login form and redirect to invoice if no err, back to login page if not
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

//password encryption from chloe and caixin EC
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


//************************logout ******************* //
app.get("/logout", function (req, res, next) {
  res.clearCookie("login");
  res.redirect(req.session.login_refferer);
});



////////////////////////////


// *************************add prods to cart*************************//

// process purchase request (validate quantities, check quantity available)
app.post("/process_form", function (req, res, next) {
  // check the quantity, if it is not valid, send it to the products display page in order to repurchase

  let POST = req.body;

  var product_key = POST["prods_key"];

  var errors = {};
  // assume no quantities from the start, so set no quantities error 
  // Professor Port helped me with the code below
  //if user enter empty quantities, show this text
  errors['no_quantities'] = 'Please enter some quantities';
  products = myProducts[product_key];
  for (i = 0; i < products.length; i++) {
    qua = POST['quantity' + i];
    if (isNonNegInt(qua) == false) { //if the quantity is false, send a alert tht show the error
      errors['quantity' + i] = `Please enter valid quantities for ${products[i].name}`; //it will pop out a alert to warn the user 
    }
    // if we have quantities, unset the error, and remove from inventory
    if (qua > 0) {
      delete errors['no_quantities'];
      // check if quanty wanbted is available in inventory 
      if (qua > products[i].inventory) {
        errors['inventory' + i] = `${qua} of ${products[i].name} not available. Only ${products[i].inventory} available.`;
      }
    }
  }
  //modified this from chloe and caixin
  //this function will keep objects in cart during the session
  if (JSON.stringify(errors) === '{}') {
    if (typeof req.session.cart == 'undefined') {
      req.session.cart = {};
    }
    req.session.cart[product_key] = req.body;
    console.log(req.session.cart);
    //this will redirect user to cart if qty are valid
    res.redirect(`./cart.html?`); 
  } else {
    //if there are errors add the errors and prod_key in Qstring and redirect to products_display.html
    let params = new URLSearchParams(POST);
    params.append('errors', JSON.stringify(errors));
    params.append('prod_key', product_key);

    res.redirect("./products_display.html?" + params.toString()); 
  }
});

//confirming the purchase
app.post("/confirm", function (req, res) {
  let username = req.cookies["login"];//get username from cookies
  console.log(req.cookies);// to check username/login
  // if user not logged in, send them to login
  if (typeof req.cookies["login"] == 'undefined') {
    res.redirect(`./login.html`);
    return;
  }
  //check errors
  var errors = {};
  if (JSON.stringify(errors) === '{}') {
    // send to invoice.html 
    //put their username and email in the URL/string
    let params = new URLSearchParams();
    params.append('username', username);
    params.append('email', user_data[username].email);
    res.redirect(`./invoice.html?${params.toString()}`);
  } else {
    res.redirect(`./cart.html`);
  }
});

// modified from Lab 12 order_page.html
// checks if the string q is non neg int
function isNonNegInt(q, return_errors = false) {
  errors = []; // assume no errors at first
  if (q == '') q = 0; // handle blank inputs as if they are 0
  if (Number(q) != q) errors.push('<font color="red">Not a number!</font>'); // Check if string is a number value
  if (q < 0) errors.push('<font color="red">Negative value!</font>'); // Check if it is non-negative
  if (parseInt(q) != q) errors.push('<font color="red">Not an integer!</font>'); // Check that it is an integer
  return return_errors ? errors : (errors.length == 0);
}

// after purchase
app.post('/complete_purchase', function (req, res) {
  let username = req.cookies["login"];//get username
  let user_email = user_data[username].email;//get user email
  var shopping_cart = req.session.cart;//get the cart

  //repeat invoice table
  invoice_str = `<tbody>
  <tr>
      <th width="43%">Item</th>
      <th width="11%">Quantity</th>
      <th width="13%">Price</th>
      <th width="54%">Extended Price</th>
  </tr>
    `;



  subtotal = 0;//make the total quantities is 0 at frist
  total_qua = 0; //make the total quantities is 0 at frist
  for (let prod_key in shopping_cart) {
    let products = myProducts[prod_key]; //define products 
    for (i = 0; i < products.length; i++) {
      let q = Number(shopping_cart[prod_key][`quantity${i}`]);
      if (q > 0) {
        // product row
        total_qua += Number(q); //convert string to number, in order to display number
        extended_price = q * products[i].price;
        subtotal += extended_price;

        invoice_str += `<tr>
        <td width="40%">${products[i]['name']}</td>
        <td align="center" width="10%">${quantities[i]}</td>
        <td width="20%">\$${products[i]['price']}</td>
        <td width="20%">\$${extended_price}</td>
      </tr>
  `;
      }
    }
  }
            // Tax, subtotal, shipping, and total referenced from invoice4
            // Compute Sales Tax, using Hawaii tax rate
            var tax_rate = 0.0443;
            var tax = subtotal * tax_rate;
    
            // Compute Shipping
            if(subtotal <= 50) {
              shipping = 2;
            } else if(subtotal <= 100) {
                shipping = 5;
            } else {
              shipping = subtotal * 0.04; // 4% for orders more than $100, shipping cost 4% of subtotal
            }
    
            // Compute Total
            var total = subtotal + tax + shipping;
  invoice_str += `
  <tr>
  <td style="text-align: center;" colspan="3" width="67%">Sub-total</td>
  <td width="54%">$<script>document.write(subtotal.toFixed(2));</script></td>
</tr>
<tr>
  <td style="text-align: center;" colspan="3" width="67%"><span style="font-weight: bold;">Tax of 4.43%</span></td>
  <td width="54%">$<script>document.write(tax.toFixed(2))</script></td>
</tr>
<tr>
  <td style="text-align: center;" colspan="3" width="67%">Shipping</td>
  <td width="54%">$<script>document.write(shipping.toFixed(2));</script></td>
</tr>
<tr>
  <td style="text-align: center;" colspan="3" width="67%"><strong>Total</strong></td>
  <td width="54%"><strong>$<script>document.write(total.toFixed(2))</script></strong></td>
</tr>
</tbody>
</table>
`;

// after purchase, nodemailer
// took from assignment 3 example
// this sets up the mail server, it can only work across the uh network due to security restrictions
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
    html: invoice_str,
  };

  //this is what is in the email if there is an error
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      invoice_str += '<br>There was an error and your receipt could not be emailed.';
    } else {
      invoice_str += `<br>Your receipt was mailed to ${user_email}`;
    }
    res.send(invoice_str);
  });
});





// route all other GET requests to files in public 
app.use(express.static('./public'));

// start server
app.listen(8080, () => console.log(`listening on port 8080`));