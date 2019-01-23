var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var AllData = require('../mongoose-models/AllData.js');
var DaysData = require('../mongoose-models/DaysData.js');
var MonthData = require('../mongoose-models/MonthData.js');
var YearData = require('../mongoose-models/YearData.js');
var LimitedPower = require('../mongoose-models/LimitedPower.js');

/* GET ALL DATA */
router.get('/all', function(req, res, next) {
  AllData.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET DAYS DATA */
router.get('/days', function(req, res, next) {
  DaysData.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET MONTH DATA */
router.get('/month', function(req, res, next) {
  MonthData.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET YEAR DATA */
router.get('/year', function(req, res, next) {
  YearData.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET LIMITED POWER DATA */
router.get('/limitpower', function(req, res, next) {
  LimitedPower.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE BOOK BY ID */
/*router.get('/:id', function(req, res, next) {
  Book.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});*/

/* SAVE BOOK */
/*router.post('/', function(req, res, next) {
  Book.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});*/

/* UPDATE BOOK */
/*router.put('/:id', function(req, res, next) {
  Book.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});*/

/* DELETE BOOK */
/*router.delete('/:id', function(req, res, next) {
  Book.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});*/

module.exports = router;
