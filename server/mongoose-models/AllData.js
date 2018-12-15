var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema(
  { date: String, hour: String, total: String,
    fivev_sensor: String, twentyv_sensor: String,
    total_money: Number, fivev_money: Number,
    twentyv_money: Number, },
  { collection : 'allData' }
);

module.exports = mongoose.model('AllData', BookSchema);
