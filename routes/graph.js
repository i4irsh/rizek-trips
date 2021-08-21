const fs = require("fs");
const PriorityQueue = require('./priorityQ')

class Graph {

    constructor() {
        this.data = require('../data/response.json');
        this.data.deals.map(deal => {
            deal.durationInMin = (parseInt(deal.duration.h) * 60) + parseInt(deal.duration.m);
            deal.costWithDiscount = deal.cost - (deal.cost * deal.discount / 100);
        })

        this.arrivalListFromDeparture = new Map();
        // Find all UNIQUE locations..
        this.uniqueLocations = [...new Set(this.data.deals.map(d => [d.departure, d.arrival]).flat())];
        for (const departure of this.uniqueLocations) {
            // find all destinations from departure.
            this.arrivalListFromDeparture.set(departure, this.data.deals.filter(d => d.departure == departure));
        }
    }

    drawRoutes() {
        for (const [departure, arrivals] of this.arrivalListFromDeparture) {
            console.log('DEPARTURE FROM : ', departure);
            // ({ arrival, transport, durationInMin, costWithDiscount }) => { arrival, transport, durationInMin, costWithDiscount })
            console.log('ARRIVALS : ', arrivals.map(({ arrival, transport, durationInMin, costWithDiscount }) => ({ arrival, transport, durationInMin, costWithDiscount })));
        }
    }

    // Reference: https://www.youtube.com/watch?v=pVfj6mxhdMw
    shortestRoute(startLocation, endLocation, isDuration = false) {

        let shortestWeight = {}, previousLocation = {};
        let notVisited = new PriorityQueue();
        for (const [departure] of this.arrivalListFromDeparture) {
            shortestWeight[departure] = (departure == startLocation) ? 0 : Infinity;
            notVisited.enqueue(departure, shortestWeight[departure]);
        }

        while (notVisited.hasValue()) {
            let current = notVisited.dequeue();
            for (let arrivalFromCurrentLocation of this.arrivalListFromDeparture.get(current.location)) {
                let whichWeight = isDuration ? 'durationInMin' : 'costWithDiscount';
                let newShortestWeight = shortestWeight[current.location] + arrivalFromCurrentLocation[whichWeight];
                if (newShortestWeight < shortestWeight[arrivalFromCurrentLocation.arrival]) {
                    shortestWeight[arrivalFromCurrentLocation.arrival] = newShortestWeight;
                    previousLocation[arrivalFromCurrentLocation.arrival] = arrivalFromCurrentLocation;
                }
            }
        }

        let curr = endLocation;
        let itinerary = [];
        while (curr != startLocation && previousLocation[curr]) {
            itinerary.push(previousLocation[curr]);
            curr = previousLocation[curr].departure;
        }

        return {
            durationInMin: itinerary.length != 0 ? itinerary.reduce((totalDuration, { durationInMin }) => totalDuration + durationInMin, 0) : 0,
            costWithDiscount: itinerary.length != 0 ? itinerary.reduce((totalCost, { costWithDiscount }) => totalCost + costWithDiscount, 0) : 0,
            itinerary: itinerary.reverse()
        }
    }

    getFastestRoute(startLocation, endLocation) {
        return this.shortestRoute(startLocation, endLocation, true)
    }

    getCheapestRoute(startLocation, endLocation) {
        return this.shortestRoute(startLocation, endLocation, false)
    }


}

// export default new Graph();
module.exports = new Graph();

