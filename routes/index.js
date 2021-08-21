const express = require('express');
const router = express.Router();
// const data = require('../data/response.json')
const Graph = require('./graph');

/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index',
    {
      title: 'RIZEK - Trip Sorter',
      departures: Graph.uniqueLocations,
      arrivals: Graph.uniqueLocations,
      selectedDeparture: '',
      selectedArrival: '',
      showResults: false
    });
});

router.post("/itinerary", function (req, res, next) {

  console.log('BODY : ', JSON.stringify(req.body));

  const { departure, arrival, travelMethod } = req.body;

  // console.log(Graph.getCheapestRoute("London", "Warsaw"));
  res.render('index', {
    title: 'RIZEK - Trip Sorter',
    departures: Graph.uniqueLocations,
    arrivals: Graph.uniqueLocations,
    selectedDeparture: departure,
    selectedArrival: arrival,
    showResults: true,
    results: travelMethod === 'cheapest' ? Graph.getCheapestRoute(departure, arrival) : Graph.getFastestRoute(departure, arrival)
  });
});

module.exports = router;
