const express = require('express');
const router = express.Router();
const LocationsGraph = require('../helpers/locationsGraph');

/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index',
    {
      departures: LocationsGraph.allUniqueLocations,
      arrivals: LocationsGraph.allUniqueLocations,
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
        departures: LocationsGraph.allUniqueLocations,
        arrivals: LocationsGraph.allUniqueLocations,
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

    let results = travelMethod === 'fastest' ? LocationsGraph.getFastestRoute(departure, arrival) : LocationsGraph.getCheapestRoute(departure, arrival);
    let isRouteFound = results.itinerary.length > 0;
    res.render('index', {
      departures: LocationsGraph.allUniqueLocations,
      arrivals: LocationsGraph.allUniqueLocations,
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
