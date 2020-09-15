var express = require('express');
var router = express.Router();
const multer = require('multer');
const { uuid } = require("uuidv4");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const upload = multer({ 
  storage: multer.diskStorage({
    destination: 'client/public/modelos/',
    filename(req, file, callback) {
      const fileName = `${uuid()}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
})

// rota indicado no atributo action do formulário
router.post('/', upload.single('file'), function(req, res) {

	const { filename, path } = req.file;

	//res.send(filename)

	res.redirect('http://localhost:3000/?modelo=modelos/' + filename + '&oculos=images/overlay-blue-monster.png');
});

module.exports = router;