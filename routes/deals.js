const express = require('express');
const router = express.Router();
const Graph = require('./graph');

router.get('/', function (req, res, next) {
    const { departure, arrival, travelMethod } = req.query;
    let results = travelMethod === 'fastest' ? Graph.getFastestRoute(departure, arrival) : Graph.getCheapestRoute(departure, arrival);
    res.json(results);
});

module.exports = router;