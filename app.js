// We saw how we could download dependencies via npm. To use those dependencies in our code we require them. The syntax to require a library is the keyword require and a string for the name of the library. We assign this require function to a variable and can then access methods from the library through that variable. Here we are requiring all of our dependencies at the top of the page as is good practice.
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var dotenv = require('dotenv');

// We are using the dotenv library to load our environmental variables from the .env file. We don't have anything in the .env file for now, but we will soon.
dotenv.load();

// Just like external libraries, we can import our application code using the require function. The major difference is that we have to give the exact path to our file. We saw in the directory structure section that we will have an index.js file in a routes directory. Go ahead and create it if you haven't already, otherwise you'll get errors when compiling the code.
var routes = require('./routes/index');

// This line of code instantiates the Express JS framework. We assign it to a variable called app, and will add our configruation to this variable.
var app = express();

// The .set method allows us to configure various options with the Express framework. Here we are setting our views directory as well as telling Express that our templating engine will be Jade. More on that soon.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// The .use method is similar to the .set method, where it allows us to set further configurations. The .use method also acts as a chain of events that will take place once a request hits our Node Js application. First we'll log the request data, parse any incoming data, and so on.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  // Here we are creating a unique session identifier
  secret: 'shhhhhhhhh',
  resave: true,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// Function qui permet d'intercepter les erreur 404 - Page qui n'existe pas
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Function qui permet d'intercepter les erreur 500 - Erreur serveur
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err);
});

// Configure le serveur pour qu'il ecoute sur le port 3000
app.listen(3000);