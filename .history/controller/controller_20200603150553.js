const User = require('../models/users');
const Item = require('../models/items');
const extractItem = require('../utils');
class Controller {
  static createUser(param) {
    return new Promise((resolve, reject) => {
      if (param.username !== null) {
        const { username, email, password, location, contact } = param;
        (async () => {
          let exist = await User.findOne({
            email: param.email,
          });
          let accountExistError =
            'this account already exist sign-in to continue !';
          exist !== null
            ? resolve({ err: accountExistError })
            : (async () => {
                const user = new User({
                  username,
                  email,
                  password,
                  location,
                  contact,
                });
                await user.save();
                let res = await User.findOne({ username: param.username });
                if (res !== null)
                  resolve({
                    success: 'your account has been created successful !',
                  });
              })();
        })();
      } else reject('Echec');
    });
  }
  static loginUser(param) {
    return new Promise((resolve, reject) => {
      if (param.email && param.password !== null) {
        const { email, password } = param;
        (async () => {
          let verifyOk = await User.findOne({
            email: email,
            password: password,
          });
          verifyOk !== null
            ? resolve(verifyOk)
            : resolve({ err: 'email or password dont match' });
        })();
      }
    });
  }
  static getAllUsers() {
    return new Promise((resolve, reject) => {
      User.find().then((users) => {
        resolve(users);
      });
    });
  }
  static getAllItems() {
    return new Promise((resolve, reject) => {
      Item.find()
        .populate('user')
        .then((items) => {
          resolve(items);
        });
    });
  }
  static getOneItem(id) {
    return new Promise((resolve, reject) => {
      Item.findOne({ _id: id })
        .populate('user')
        .then((item) => {
          resolve(item);
        });
    });
  }

  static search(params) {
    let { location, propertyType, status, rooms, baths } = params;

    return new Promise(async (resolve, reject) => {
      let result = await Item.find({
        searchArea: location,
        propertyType: propertyType,
        status: status,
        rooms: rooms,
        baths: baths,
      });
      resolve(result);
    });
  }
  static deleteAccount(username) {
    return new Promise((resolve, reject) => {
      (async () => {
        let user = await User.deleteOne({ username: username });
        resolve(user);
      })();
    });
  }
  static addNewItem(item) {
    return new Promise(async (resolve, reject) => {
      let user = await User.findOne({ username: item.author });
      let items = await Item.find();
      if (user !== null) {
        const extract = extractItem({ data: item, exclude: 'author' });
        if (items.length <= 10) extract.user = user;
        const newItem = new Item(extract);
        newItem.save().then(() => {});
      }
    });
  }
  static deletePropertie(propertieId) {
    return new Promise((resolve, reject) => {
      (async () => {
        let item = await Item.deleteOne({ _id: propertieId });
        resolve(item);
      })();
    });
  }
}
module.exports = Controller;
