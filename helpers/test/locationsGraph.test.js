const LocationsGraph = require('../locationsGraph');

describe('basic sanity checks', () => {

    it('should check allUniqueLocations have been populated', () => {
        expect(LocationsGraph.allUniqueLocations.length).not.toEqual(0);
    });

    it('should check LocationsGraph.bestRoute have been called', () => {
        jest.spyOn(LocationsGraph, 'bestRoute').mockImplementation(() => {
            return {
                "duration": {
                    "h": "13",
                    "m": "00"
                },
                "costWithDiscount": 60,
                "itinerary": [
                    {
                        "transport": "bus",
                        "departure": "London",
                        "arrival": "Amsterdam",
                        "duration": {
                            "h": "07",
                            "m": "45"
                        },
                        "cost": 40,
                        "discount": 25,
                        "reference": "BLA0745",
                        "durationInMin": 465,
                        "costWithDiscount": 30
                    },
                    {
                        "transport": "bus",
                        "departure": "Amsterdam",
                        "arrival": "Warsaw",
                        "duration": {
                            "h": "05",
                            "m": "15"
                        },
                        "cost": 40,
                        "discount": 25,
                        "reference": "BAW0515",
                        "durationInMin": 315,
                        "costWithDiscount": 30
                    }
                ]
            }
        });
        LocationsGraph.getCheapestRoute('London', 'Warsaw');
        expect(LocationsGraph.bestRoute).toHaveBeenCalledTimes(1);
        jest.restoreAllMocks();
    });
});

describe('should check itinerary is empty when location not valid', () => {
    it('when source location not valid', () => {
        let bestRoute = LocationsGraph.getCheapestRoute('NotValidLocation', 'Amsterdam');
        expect(bestRoute.duration).toEqual({});
        expect(bestRoute.costWithDiscount).toEqual(0);
        expect(bestRoute.itinerary.length).toEqual(0);
    });

    it('when destination location not valid', () => {
        let bestRoute = LocationsGraph.getCheapestRoute('London', 'NotValidLocation');
        expect(bestRoute.duration).toEqual({});
        expect(bestRoute.costWithDiscount).toEqual(0);
        expect(bestRoute.itinerary.length).toEqual(0);
    });
});

describe('when both source and destination location is valid', () => {
    it('should check cost & itinerary are valid', () => {
        let cheapestRoute = LocationsGraph.getCheapestRoute('London', 'Warsaw');
        expect(cheapestRoute.costWithDiscount).not.toEqual(0);
        expect(cheapestRoute.itinerary.length).not.toEqual(0);
    });
});
