var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index',
    {
      title: 'RIZEK - Trip Sorter',
      departures: ["London", "Amsterdam", "Chennai"],
      arrivals: ["India", "Kerala", "Cochin"],
      showResults: false
    });
});

router.post("/itinerary", function (req, res, next) {
  // const { name, email } = req.body;

  // // 1. Validate the user data
  // // 2. Subscribe the user to the mailing list
  // // 3. Send a confirmation email

  // res.render("subscribed", {
  //   title: "You are subscribed",
  //   name,
  //   email
  // });
  console.log('BODY : ', JSON.stringify(req.body));
  res.render('index', {
    title: 'RIZEK - Trip Sorter',
    departures: ["London", "Amsterdam", "Chennai"],
    arrivals: ["India", "Kerala", "Cochin"],
    showResults: true
  });
});

module.exports = router;
