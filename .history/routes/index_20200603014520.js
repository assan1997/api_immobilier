var express = require('express');
var router = express.Router();
controller = require('../controller/controller');

const upload = require('../multer');
const cloudinary = require('../cloudinary');
const fs = require('fs');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Lauvin immobilier API 3' });
});
router.get('/users', async (req, res) => {
  let data = await controller.getAllUsers();
  res.json(data);
});

router.post('/addItem', upload, async (req, res) => {
  let images = [];
  if (req.files.length !== 0) {
    const uploader = async (path) => await cloudinary.uploads(path, 'Images');
    req.files.forEach((file) => {
      const { path } = file;
      uploader(path).then((newPath) => {
        urls.push(newPath);
        images.push(newPath.url);
      });
      // fs.unlinkSync(path);
       const item = await { ...req.body, images: images };
    let output = await controller.addNewItem(item);
    });
  } else {
    const item = await { ...req.body, images: images };
    let output = await controller.addNewItem(item);
  }

  res.json({
    message: 'images uploaded successfully',
    data: urls,
  });
});
router.get('/allItems', async (req, res) => {
  let output = await controller.getAllItems();
  res.json(output);
});
router.get('/item/:id', async (req, res) => {
  let output = await controller.getOneItem(req.params.id);
  res.json(output);
});
router.get('/search', async (req, res) => {
  let output = await controller.search(req.query);
  res.json(output);
});
router.post('/user/register', async (req, res) => {
  let user = { ...req.body };
  let output = await controller.createUser(user);
  res.json(output);
});
router.post('/user/login', async (req, res) => {
  let user = { ...req.body };

  let output = await controller.loginUser(user);
  res.json(output);
});
router.post('/deleteAccount', async (req, res) => {
  let username = req.body.username;
  let output = await controller.deleteAccount(username);
  res.json(output);
});
router.post('/deleteOnePropertie', async (req, res) => {
  let propertieId = req.body.propertieId;
  let output = await controller.deletePropertie(propertieId);
  res.json(output);
});

module.exports = router;
