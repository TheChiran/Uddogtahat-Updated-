var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var indexRouter = require('./routes/index.routes');
var applicantRouter = require('./routes/applicant.route');
var adminRouter = require('./routes/admin.route');

//database connection
const mongoose = require('mongoose');
//let dbURL = 'mongodb://127.0.0.1:27017/uddogtahat';
let dbURL = 'mongodb+srv://uddogtahat:uddogtahat54321@cluster0-gsey2.mongodb.net/uddogtahat?retryWrites=true&w=majority';
let mongoDB = process.env.MONGODB_URI || dbURL;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error',console.error.bind(console,'MongoDb Connection error: '));
/*const MongoClient = require('mongodb').MongoClient;

// replace the uri string with your connection string.
const uri = "mongodb+srv://uddogtahat:<uddogtahat54321>@cluster0-gsey2.mongodb.net/test?retryWrites=true&w=majority"
MongoClient.connect(uri, function(err, client) {
  if(err) {
    console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
  }
  console.log('Connected...');
  const collection = client.db("uddogtahat").collection("devices");
  // perform actions on the collection object
  client.close();
});*/



var app = express();
var helmet = require('helmet');
var http = require('http').Server(app);
const jwt = require('jsonwebtoken');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'uddogtahat5546',
  saveUninitialized: true
}))
app.use(helmet());

/*app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}))*/
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/applicant', applicantRouter);
app.use('/admin', adminRouter);



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
  res.render('error');
});
const port = process.env.PORT || 3000;
app.listen(port,(req,res)=>{
  //console.log('Your listening to port: '+ port)
})
module.exports = app;
