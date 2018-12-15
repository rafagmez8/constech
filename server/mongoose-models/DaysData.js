var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema(
  { date: String, total: String, total_money: String, },
  { collection : 'daysData' }
)

module.exports = mongoose.model('DaysData', BookSchema);
