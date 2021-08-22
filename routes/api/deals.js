const express = require('express');
const router = express.Router();
const LocationsGraph = require('../../helpers/locationsGraph');

router.get('/', function (req, res, next) {
    const { departure, arrival, travelMethod } = req.query;
    let results = travelMethod === 'fastest' ? LocationsGraph.getFastestRoute(departure, arrival) : LocationsGraph.getCheapestRoute(departure, arrival);
    res.json(results);
});

module.exports = router;