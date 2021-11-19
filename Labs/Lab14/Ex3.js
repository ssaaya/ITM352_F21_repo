const { appendFile } = require("fs");

var fs = required('fs')

var filename = './registration_data.json';

if(fs.existsSync(filename)) {
 var stats = fs.statSync(filename);
 console.log (filename + ' has' + stats["size"] + 'characters');
 // have reg data file, so read data and parse into user_registration_info object
 //let data_str = fs.readFileSync(filename, utc-8)
 var user_registration_info = require(filename);
 console.log(user_registration_info);
}else{
     console.log (filename + 'does not exist!');
 }

app.use(express.urlencoded({extended: true}));
app.get("/login", function (request, response) {
    // Give a simple login form
str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
 });

app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    let login_username = request.body['username'];
    let login_password = request.body['password'];
    //check if username exists, then check password entered matches password stored
    if (typeof user_registration_info[login_username] != 'undefined') {
        response.send(`${login_username} is logged in`)
        response.redirect('./login')
    }
response.send('processing login' + JSON.stringify(request.body))
});

app.listen(8080, () => console.log(`listening on port 8080`));
