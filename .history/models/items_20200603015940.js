const Schema = mongoose.Schema;
const homeItemsSchema = new Schema({
  title: String,
  overview: String,
  location: String,
  price: Number,
  status: String,
  isTerrain: Boolean,
  size: Number,
  sizeUnit: String,
  propertyType: String,
  searchArea: String,
  payCurrency: String,
  rooms: Number,
  baths: Number,
  garages: Number,
  images: { type: [] },
  user: { type: Schema.Types.ObjectId, ref: 'user' },
});
const homeItems = mongoose.model('homeitem', homeItemsSchema);
module.exports = homeItems;
