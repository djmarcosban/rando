const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multer = require('multer');
const { uuid } = require("uuidv4");

//var indexRouter = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

const upload = multer({ 
  storage: multer.diskStorage({
    destination: 'client/public/modelos/',
    filename(req, file, callback) {
      const fileName = `${uuid()}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
})

app.get('/upload', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.get('/', (req, res, next) => {
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// rota indicado no atributo action do formulário
app.post('/upload', upload.single('file'), function(req, res) {
	const { filename, path } = req.file;
	//res.send(filename)
	res.redirect('http://localhost:3000/?modelo=modelos/' + filename + '&oculos=images/overlay-blue-monster.png');
});

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

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server listening on ${port}`);

module.exports = app;
