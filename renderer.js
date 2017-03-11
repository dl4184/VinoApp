// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var express = require("express");
var app = express();

var path = __dirname + '/views/';

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + "/public"));

app.disable("x-powered-by");


var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.use(function (req, res, next) {
    console.log("/" + req.method+" "+req.url);
    next();
});

app.get("/home", function (req, res) {
    res.render('home');
});

app.get("/", function (req, res) {
    res.redirect("/home");
});

app.get('/about', function (req, res) {
    res.render('about');
});




app.use(function(req, res){
    res.type('text/html');
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + ' press Ctrl-C to terminate');
});