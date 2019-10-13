var express = require('express');
var session = require("express-session");
require('dotenv').config();
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;
var allRoutes = require('./controllers');

// Requiring our models for syncing
var db = require('./models');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static('public'));

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));


app.use('/',allRoutes);

app.get('/',function(req,res){
    res.render('index')
})

db.sequelize.sync({ force: false}).then(function() {
    app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
    });
});