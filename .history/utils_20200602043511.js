module.exports = function extractItem(o) {
  const item = {};

  for (let i in o.data) {
    if (o.exclude && i !== o.exclude) {
      item[i] = o.data[i];
    } else item[i] = o.data[i];
  }

  return item;
};
