//===========================================
// Includes
//===========================================
var express = require('express');
var bodyParser = require ('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var sassMiddleware = require('node-sass-middleware');
var http = require('http');
var jade = require('jade');

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
  {
    name: 'Soul 1',
    adress: '9055-9057 Normandie Ave',
    id: 1
  },
  {
    name: 'Soul 2',
    adress: '9055 Normandie Ave',
    id: 2
  },
  {
    name: 'Soul 3',
    adress: '9055-9057 Normandie Str',
    id: 3
  },
  {
    name: 'Soul 4',
    adress: '9055-9057 Normandie Mordway Ave',
    id: 4
  },
  {
    name: 'Soul 5',
    adress: '9057 Normandie',
    id: 5
  },
  {
    name: 'Soul 6',
    adress: '9055asd Normandie Ave',
    id: 6
  },
];



//===========================================
// Router
//===========================================
app.get('/', function (req, res, next) {
  res.render('index', { title: 'Home page' });
});

app.get('/login', function (req, res) {
  res.sendStatus(200);
});


//==========HOUSES==========
app.get('/houses', function (req, res, next) {
  res.render('houses', {houses});
});

//----------open----------
app.post('/houses/open', function (req, res, next) {
  console.log(req.body)
  res.render('houses/houses-open', {
    name: req.body.name,
    adress: req.body.adress,
    id: req.body.id,
  });
  res.sendStatus(200);
});

//----------add----------
app.post('/houses/add', function (req, res, next) {
  res.render('houses/houses-add');
  res.sendStatus(200);
});

app.post('/houses/room', function (req, res, next) {
  var rooms = req.body;
  res.render('houses/houseRoom', rooms);
  res.sendStatus(200);

});

app.post('/houses/save', function (req, res, next) {
  res.render('houses/houseArticle', {
    name: req.body.name,
    adress: req.body.adress,
    id: req.body.id,
  });
  console.log(req.body);
  res.sendStatus(200);
  res.end();
});

app.post('/houses/cancel', function (req, res, next) {
  console.log("Cancel.");
  res.sendStatus(200);
  res.end();
});



//==========USERS==========
app.get('/users', function (req, res, next) {
  res.render('users', {houses});
});

app.post('/users/init', function (req, res, next) {
  console.log(req.body)
  res.render('users/user-left', req.body);
});

//----------open----------
app.post('/users/open', function (req, res, next) {
  console.log(req.body)
   res.render('users/users-open', req.body);
  console.log("user " + req.body.id + " is opened!");
  res.sendStatus(200);
});

//----------add----------
app.post('/users/add', function (req, res, next) {
  res.render('user-add');
  console.log("lalala");
  res.sendStatus(200);
});

app.post('/users/add/add', function (req, res, next) {
  res.render('users-article', {
    name: req.body.name,
    adress: req.body.adress,
    id: req.body.id,
  });
  console.log(req.body);
  res.sendStatus(200);
  res.end();
});

app.post('/users/add/cancel', function (req, res, next) {
  console.log("lalala");
  res.sendStatus(200);
  res.end();
});



//==========PAYMENTS==========
app.get('/payments', function (req, res, next) {
  res.render('payments', {houses});
});



//==========REPORT==========
app.get('/report', function (req, res, next) {
  res.render('report', {houses});
});
//===========================================
// Server
//===========================================

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!')
// });

app.listen(process.env.PORT || 3000, function (){
  console.log('Heroku app listening!')

});
