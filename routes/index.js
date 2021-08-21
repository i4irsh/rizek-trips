const express = require('express');
const router = express.Router();
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
        setSelected: () => '',
        setChecked: (radioOption) => radioOption == 'cheapest' ? 'checked' : ''
      }
    }
  );
});

router.post("/", function (req, res, next) {

  const { departure, arrival, travelMethod } = req.body;
  if (departure === arrival) {

    res.render('index',
      {
        title: 'RIZEK - Trip Sorter',
        departures: Graph.uniqueLocations,
        arrivals: Graph.uniqueLocations,
        showResults: false,
        arrivalValidity: 'is-invalid',
        helpers: {
          setSelected: (selected, way) => {
            if (way == 'departure')
              return (selected == departure) ? 'selected="selected"' : '';
            else
              return (selected == arrival) ? 'selected="selected"' : '';
          },
          setChecked: (radioOption) => radioOption === travelMethod ? 'checked' : ''
        }
      }
    );

  } else {

    let results = travelMethod === 'fastest' ? Graph.getFastestRoute(departure, arrival) : Graph.getCheapestRoute(departure, arrival);
    let isRouteFound = results.itinerary.length > 0;
    res.render('index', {
      title: 'RIZEK - Trip Sorter',
      departures: Graph.uniqueLocations,
      arrivals: Graph.uniqueLocations,
      showResults: true,
      results,
      isRouteFound,
      helpers: {
        setSelected: (selected, way) => {
          if (way == 'departure')
            return (selected == departure) ? 'selected="selected"' : '';
          else
            return (selected == arrival) ? 'selected="selected"' : '';
        },
        setChecked: (radioOption) => radioOption === travelMethod ? 'checked' : ''
      }
    });
  }

});

module.exports = router;
