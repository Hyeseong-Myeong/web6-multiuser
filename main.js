const express = require('express')
const app = express()
var fs = require('fs');
var qs = require('querystring');
var bodyParser = require('body-parser');//built in body-parser since express v4.16
var compression = require('compression');

var helmet = require('helmet');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var flash = require('connect-flash');
app.use(helmet());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(compression());
app.use(session({
  //HttpOnly:true //can't use session with js
  secure: true,
  secret: 'asadlfkj!@#!@#dfgasdg',
  resave: false,
  saveUninitialized: true,
  //store: new FileStore()
}))
app.use(flash());

var passport = require('./lib/passport')(app);

app.get('*', function(request, response, next){
  fs.readdir(`./data`, function(error, filelist){
    request.list = filelist;
    next();
  });
});

var topicRouter = require('./routes/topic.js');
var indexRouter = require('./routes/index.js');
var authRouter = require('./routes/auth')(passport);
const auth = require('./lib/auth.js');

//route, routing
// app.get('/', (req, response) => response.send('Hello World!')) 
app.use('/', indexRouter);
app.use('/topic', topicRouter);
app.use('/auth', authRouter);

app.use(function(req, res, next){
  res.status(404).send('Sorry cant find that!')
});

app.use(function(err, req, res, next){
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

//app.listen(3000, () => console.log('Example app listening on port 3000!'))
app.listen(3000, function(){
  console.log('Example app listening on port 3000!')
});
