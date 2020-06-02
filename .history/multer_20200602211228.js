var express = require('express');
var router = express.Router();
controller = require('../controller/controller');
const path = require('path');
const multer = require('multer');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Lauvin immobilier API 3' });
});
const upload = multer({
  storage: addStorage('./Images', 'image'),
  limits: { fileSize: 100000000 },
}).array('image');
function addStorage(storagePath, fileStartName) {
  const storage = multer.diskStorage({
    destination: `./${storagePath}`,
    filename: function (req, file, cb) {
      cb(
        null,
        `${fileStartName}-` + Date.now() + path.extname(file.originalname)
      );
    },
  });
  return storage;
}
