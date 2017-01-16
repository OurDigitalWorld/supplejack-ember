import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    //USER EDITABLE PARAMS (found in queryParams)
    for (const key in params){
      if (!params.hasOwnProperty(key)) {continue;}
      //removes any params that haven't been assigned a value
      if (params[key] === '' || params[key] === null){
        delete params[key];
      }
    }
    //SERIALIZE "AND", "OR", and "WITHOUT" PARAMS
    //Note:  need to alter function to work for all three params that need serialization
    if (typeof params.and != "undefined" && params.and.length > 0){
      let andArray = params.and.split(",").slice(0,-1);
      //create set of unique "and" parameters"
      let keys = new Set();
      andArray.forEach((and)=>{
        //slice off key, add to set
        let key = and.split(":");
        keys.add(key[0]);
      });
      //for each unique key...
      keys.forEach((key)=>{
        let array = [];
        //check all params for values with this key
        andArray.forEach((and)=>{
          let keyVal = and.split(":");
          if (keyVal[0] === key) {
            //add the values to an array
            array.push(keyVal[1]);
          }
        });

        if (array.length > 1){
          //if there's more than one value for this key, send as an array
          params[`and[${key}]`] = array;
        } else {
          //otherwise, send as a string
          params[`and[${key}]`] = array[0];
        }
      });
    }

    //DELETE SERIALIZED PARAMS
    delete params.and;
    delete params.or;
    delete params.without;

    //SYSTEM-BASED params
    //adds the api key and field set to the params to be sent to the API
    params.api_key = 'apikey';
    params.fields = 'all';
    //adds facets to params
    let facets = this.controllerFor('search').get('recordFacets');
    if(facets.length > 0){
      params.facets = facets;
    }
    //MODEL RETURN
    // console.log(params);
    //fetches the model from the API with given params
    return this.get('store').query('record', params);
  },

  queryParams: {
    page: {refreshModel: true},
    text: {refreshModel: true},
    per_page: {refreshModel: true, replace: true},
    //note: using and/or/without because Ember doesn't support dynamically-generated queryparams,
    // and this seems like a better solution than manually generating 3 queryparams for every schema field
    // we can pass stringified objects into these 3 params in ember, and then destringify them just before
    // passing them to the API.
    and: {refreshModel: true},
    or: {refreshModel: true},
    without: {refreshModel: true}
  },

  serializeQueryParam: function(value, urlKey, defaultValueType){
    if (defaultValueType === 'array'){
      return value;
    }
  }
});
