const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require("body-parser");


function generateRandomString() {
  var result           = [];
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < 6; i++ ) {
    result.push(characters.charAt(Math.floor(Math.random() * 
charactersLength)));
 }
 return result.join('');
}

app.use(bodyParser.urlencoded({extended: true}));


app.set("view engine", "ejs");


const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};


app.post("/urls/:shortURL/delete", (req, res) => {
  delete urlDatabase[req.params.shortURL]
  res.redirect('/urls/');         // Respond with 'Ok' (we will replace this)

});

app.post("/urls", (req, res) => {
  let ranNum = generateRandomString()
  console.log(urlDatabase[ranNum] = req.body.longURL);  // Log the POST request body to the console
  console.log(urlDatabase)
  res.redirect('/urls/' + ranNum);         // Respond with 'Ok' (we will replace this)
});

app.get("/hello", (req, res) => {
    const templateVars = { greeting: 'Piss off mate' };
    res.render("hello_world", templateVars);
  });

app.get("/urls/new", (req, res) => {
    res.render("urls_new");
});

app.get("/urls/:shortURL", (req, res) => {
    const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL]};
    res.render("urls_show", templateVars);
});

app.get("/urls", (req, res) => {
    const templateVars = { urls: urlDatabase };
    res.render("urls_index", templateVars);
});

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});