var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema(
  { year: String, total: String, middle_value: String,
    total_money: String, middle_value_money: String, },
  { collection : 'yearData' }
)

module.exports = mongoose.model('YearData', BookSchema);
