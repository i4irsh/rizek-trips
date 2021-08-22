const PriorityQueue = require('./priorityQueue')

class LocationsGraph {

    // Private members
    #data = require('../data/response.json');
    #arrivalListFromDeparture = new Map();
    #allUniqueLocations = [];

    constructor() {
        this.#data.deals.map(deal => {
            deal.durationInMin = (parseInt(deal.duration.h) * 60) + parseInt(deal.duration.m);
            deal.costWithDiscount = deal.cost - (deal.cost * deal.discount / 100);
        })

        // Find all locations..
        this.#allUniqueLocations = [...new Set(this.#data.deals.map(d => [d.departure, d.arrival]).flat())];
        for (const departure of this.#allUniqueLocations) {
            // find all destinations from departure.
            this.#arrivalListFromDeparture.set(departure, this.#data.deals.filter(d => d.departure == departure));
        }
    }

    get allUniqueLocations() {
        return this.#allUniqueLocations;
    }

    bestRoute(startLocation, endLocation, checkFastest = false) {

        let shortestWeight = {}, previousLocation = {};
        let notVisited = new PriorityQueue();
        for (const [departure] of this.#arrivalListFromDeparture) {
            shortestWeight[departure] = (departure == startLocation) ? 0 : Infinity;
            notVisited.enqueue(departure, shortestWeight[departure]);
        }

        while (notVisited.hasValue()) {
            let current = notVisited.dequeue();
            for (let arrivalFromCurrentLocation of this.#arrivalListFromDeparture.get(current.location)) {
                let selectedWeight = checkFastest ? 'durationInMin' : 'costWithDiscount';
                let newShortestWeight = shortestWeight[current.location] + arrivalFromCurrentLocation[selectedWeight];
                if (newShortestWeight < shortestWeight[arrivalFromCurrentLocation.arrival]) {
                    shortestWeight[arrivalFromCurrentLocation.arrival] = newShortestWeight;
                    previousLocation[arrivalFromCurrentLocation.arrival] = arrivalFromCurrentLocation;
                }
            }
        }

        // Backtrace over previousLocation to find connected paths
        let curr = endLocation;
        let itinerary = [];
        while (curr != startLocation && previousLocation[curr]) {
            itinerary.push(previousLocation[curr]);
            curr = previousLocation[curr].departure;
        }

        let durationInMin = 0, costWithDiscount = 0, duration = {};
        if (itinerary.length != 0) {
            durationInMin = itinerary.reduce((totalDuration, { durationInMin }) => totalDuration + durationInMin, 0);
            costWithDiscount = itinerary.reduce((totalCost, { costWithDiscount }) => totalCost + costWithDiscount, 0);
            duration = {
                h: String(Math.floor(durationInMin / 60)).padStart(2, '0'),
                m: String(durationInMin % 60).padStart(2, '0')
            }
        }

        return {
            duration,
            costWithDiscount,
            itinerary: itinerary.reverse()
        }
    }

    getFastestRoute(startLocation, endLocation) {
        return this.bestRoute(startLocation, endLocation, true)
    }

    getCheapestRoute(startLocation, endLocation) {
        return this.bestRoute(startLocation, endLocation, false)
    }


}

module.exports = new LocationsGraph();

