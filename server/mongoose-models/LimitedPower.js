var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema(
  { power: Number, },
  { collection : 'limitedPower' }
)

module.exports = mongoose.model('LimitedPower', BookSchema);
