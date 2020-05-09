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
let dbURL = 'mongodb://127.0.0.1:27017/uddogtahat';
let mongoDB = process.env.MONGODB_URI || dbURL;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error',console.error.bind(console,'MongoDb Connection error: '));

var app = express();
var http = require('http').Server(app);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
/*app.use(session({
  secret: 'uddogtahat5546',
  saveUninitialized: true
}))*/

/*app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}))*/
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/applicant', applicantRouter);
app.use('/admin', adminRouter);

//session

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
