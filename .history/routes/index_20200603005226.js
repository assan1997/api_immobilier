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
  if (req.files.length !== 0) {
    const uploader = async (path) => await cloudinary.uploads(path, 'Images');
    const linking = () => {
      return new Promise((resolve) => {
        let images = [];
        req.files.forEach(async (file) => {
          const { path } = file;
          const newPath = await uploader(path);
          urls.push(newPath);
          images.push(newPath.url);
          fs.unlinkSync(path);
        });
        if (images.length === req.body.length) resolve(images);
      });
    };
  }
  let imagePath = await linking();
  const item = { ...req.body, images: imagePath };
  await controller.addNewItem(item);
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
