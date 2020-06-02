const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  location: String,
  contact: String
});
const User = mongoose.model('user', UserSchema);
module.exports = User;
