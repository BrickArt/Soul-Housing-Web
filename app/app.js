//===========================================
// Includes
//===========================================
var express = require('express');
var bodyParser = require ('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var sassMiddleware = require('node-sass-middleware');
var http = require('http');

var app = express();

//===========================================
// Config
//===========================================
app.disable('x-powered-by');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(__dirname + '/public'));




var houses = [
  {name: 'ffffff'},
  {name: 'lalalal'},
  {name: 'lalalal'},
  {name: 'lalalal'},
  {name: 'lalalal'},
  {name: 'lalalal'},
  {name: 'lalalal'},
  {name: 'lalalal'},
  {name: 'lalalal'},
  {name: 'lalalal'},
  {name: 'lalalal'},
  {name: 'lalalal'},
  {name: 'lalalal'},
]

//===========================================
// Router
//===========================================
app.get('/', function (req, res, next) {
  res.render('index', { title: 'Home page' });
});

app.get('/login', function (req, res) {
  res.sendStatus(200);
});

app.get('/houses', function (req, res, next) {
  res.render('houses', {houses});
});
app.get('/housesadd', function (req, res, next) {
  res.render('house-add', {houses});
});

app.get('/users', function (req, res, next) {
  res.render('users', {houses});
});

app.get('/payments', function (req, res, next) {
  res.render('payments', {houses});
});

app.get('/report', function (req, res, next) {
  res.render('report', {houses});
});
//===========================================
// Server
//===========================================

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

// app.listen(process.env.PORT || 3000, function (){
//   console.log('Heroku app listening!')
//
// });
