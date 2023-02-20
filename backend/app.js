var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./config/connection')
var cors = require('cors')

db.connect((err)=>{
  if(err){
    console.log(err);;
  }
  else{
    console.log("db Connected");
  }
})

var adminRouter = require('./routes/admin');
var userRouter = require('./routes/user');
var app = express();


app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
//app.use('/image', express.static(path.join(__dirname, 'public')))
//app.use('/image', express.static(__dirname + 'image'));
app.use('/api/admin', adminRouter);
app.use('/api', userRouter);


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

module.exports = app;
