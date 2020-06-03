var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
require('dotenv').config();


var indexRouter = require('./routes/index.routes');
var applicantRouter = require('./routes/applicant.route');
var galleryRouter = require('./routes/gallery.route');
var activityRouter = require('./routes/activity.route');
var contactRouter = require('./routes/contact.route');
var aboutRouter = require('./routes/about.route');
var socialAccountRouter = require('./routes/socialAccounts.route');
var committeeMemberRouter = require('./routes/committee.route');
var websiteTitleRouter = require('./routes/website-title.route');
var adminUserRouter = require('./routes/user.route');
var dashboardRouter = require('./routes/dashboard.route');
var eventRouter = require('./routes/event.route');
var memberRouter = require('./routes/member.route');
var ambassadorRouter = require('./routes/ambassador.route');

//database connection
const mongoose = require('mongoose');
let dbURL = require('./Database/db');
let mongoDB = process.env.MONGODB_URI || dbURL;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error',console.error.bind(console,'MongoDb Connection error: '));




var app = express();
var helmet = require('helmet');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use( express.static( __dirname + '/public' ) );
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'uddogtahat5546',
  saveUninitialized: true
}))
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/applicant', applicantRouter);
app.use('/gallery', galleryRouter);
app.use('/activity', activityRouter);
app.use('/contact', contactRouter);
app.use('/about', aboutRouter);
app.use('/social-account', socialAccountRouter);
app.use('/committee-members', committeeMemberRouter);
app.use('/website-title', websiteTitleRouter);
app.use('/user', adminUserRouter);
app.use('/dashboard', dashboardRouter);
app.use('/event', eventRouter);
app.use('/member', memberRouter);
app.use('/ambassador',ambassadorRouter);





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
