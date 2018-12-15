var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema(
  { date: String, total: String,
    middle_value: String,
    total_money: String,
    middle_value_money: String, },
  { collection : 'monthData' }
)

module.exports = mongoose.model('MonthData', BookSchema);
