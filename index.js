const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const logger = require('morgan');
const multer = require('multer');
const { uuid } = require("uuidv4");

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
//app.use(require('connect').bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

const upload = multer({ 
  storage: multer.diskStorage({
    destination: 'client/build/modelos/',
    filename(req, file, callback) {
      const fileName = `${uuid()}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
})

app.get('/', function(req, res, next) {
  res.redirect('http://rando-do-marcos.herokuapp.com/upload');
});

app.get('/upload', function(req, res, next) {
  res.redirect('https://mareye.com.br/provador-online/');
});

app.get('/upload/:oculos', function(req, res, next) {

  const oculos = req.params.oculos;

  if(oculos == undefined || oculos == ''){
    res.redirect("https://mareye.com.br/provador-online/")
    return false;
  }else{
    res.render('index', {
      title: 'Mareyê Eyewear - Provador Online',
      oculos: oculos
    })
  }
});


app.post('/upload', upload.single('file'), function(req, res) {
  const { filename, path } = req.file;
  let t = req.body.oculos;
  let r = t.split(',');

  r.forEach(geraURL)

  function geraURL(item, index, arr) {
    arr[index] = 'images/' + item + '.png';
  }

  s = r.toString()

  //console.log(s)
  
  //images/overlay-blue-monster.png

  res.redirect('http://rando-do-marcos.herokuapp.com/?modelo=modelos/' + filename + '&oculos=' + s);
});

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server listening on ${port}`);

module.exports = app;
