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
      showResults: false,
      helpers: {
        setSelected: function (selected, way) {
          return ''
        }
      }
    }
  );
});

router.post("/itinerary", function (req, res, next) {

  const { departure, arrival, travelMethod } = req.body;

  res.render('index', {
    title: 'RIZEK - Trip Sorter',
    departures: Graph.uniqueLocations,
    arrivals: Graph.uniqueLocations,
    showResults: true,
    results: travelMethod === 'cheapest' ? Graph.getCheapestRoute(departure, arrival) : Graph.getFastestRoute(departure, arrival),
    helpers: {
      setSelected: function (selected, way) {
        if (way == 'departure')
          return (selected == departure) ? 'selected="selected"' : '';
        else
          return (selected == arrival) ? 'selected="selected"' : '';
      }
    }
  });
});

module.exports = router;
