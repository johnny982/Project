let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let app = express();
let cors = require('cors')

let userModel = require('../model/User');
let User = userModel.User;
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let incidentRouter = require('../routes/incident');


// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

let session = require('express-session')
let passport = require('passport')
let passportLocal =  require('passport-local')

let flash = require('connect-flash')

//implementing user auth
passport.use(User.createStrategy());
let localStrategy = passportLocal.Strategy


// getting-started.js
const mongoose = require('mongoose');
let DB = require('./db');
// point mongoose to the DB URI
mongoose.connect(DB.URI);
let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error'))
mongoDB.once('open', ()=>{
  console.log("Connected with MongoDB")
});

mongoose.connect(DB.URI,{useNewURIParser:true,useUnifiedTopology:true})


app.use(session({
  secret:"SomeSecret",
  saveUninitialized: false,
  resave:false
}))



// initialize the flash
app.use(flash());
// serialize and deserialize the user information (encrypt & decrypt)
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// initialize passport
app.use(passport.initialize());
app.use(passport.session());



/*main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Incidents');
  // await mongoose.connect('mongodb+srv://masontran:Macibelle2013@cluster0.u9sqp.mongodb.net/');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}*/
// MVC

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/incidentslist', incidentRouter);
// /project --> projectrouter
// /contactus --> contactus

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{title:"Error"});
});

module.exports = app;
