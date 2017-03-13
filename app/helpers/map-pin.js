//helper to take a set of model items with locations and a set of boundaries, and returns the first valid location object within given boundaries
//Expected formats:
//  locations array of model:
//    [{lat: 50, lng: 50},{lat:0, lng:-100}] but should be able to deal with bad data
//  boundaries:
//    '<north lat>,<west lng>,<south lat>,<east lng>'
//Example syntax:
// {{#marker-layer location=(map-pin item.locations boundingBox)}}

import Ember from 'ember';

export function mapPin(params/*, hash*/) {
  let location = params[0];
  let bounds = params[1];
  //guardian to remove empty results
  if (bounds && location.length > 0){
    //split bounds into locations
    bounds = bounds.split(',');
    const north = Number(bounds[0]);
    const west = Number(bounds[1]);
    const south = Number(bounds[2]);
    const east = Number(bounds[3]);
    //iterate through locations
    for (let item of location){
      if (item.lat && item.lng){
        if (item.lat < north && item.lat > south && item.lng < east && item.lng > west){
          //return first match
          return {lat:item.lat, lng:item.lng}
        }
      }
    }
  }
}

export default Ember.Helper.helper(mapPin);
