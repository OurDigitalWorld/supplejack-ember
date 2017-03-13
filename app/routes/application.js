import Ember from 'ember';
import ENV from 'supplejack-client/config/environment';

export default Ember.Route.extend({
  //note: add some point in the future, you can add validations on beforeModel
  model(params){
    //USER EDITABLE PARAMS (from queryParams)
    for (const key in params){
      if (!params.hasOwnProperty(key)) {continue;}
      //removes any params that haven't been assigned a value
      if (params[key] === '' || params[key] === null || params[key].length === 0){
        delete params[key];
      }
    }
    //SYSTEM-BASED PARAMS (added here)
    //adds the api key and field set to the params to be sent to the API
    params.api_key = ENV.APP.api_key;

    //potential feature to add here: Query the store for whatever is searched.
    // if no results are returned, add "~" to the end of each word in the 'text' param.
    // Possibly add some sort of flash message addon so that we can display a flash
    // message under search results informing user that we've done this.

    params.fields=ENV.APP.searchFields;
    params.facets_per_page = 50; //can go up to 100
    //adds facets to params
    const facets = this.controllerFor('application').get('recordFacets');
    if(facets.length > 0){
      params.facets = facets;
    }
    //MODEL RETURN
    //fetches the model from the API with given params
    return this.get('store').query('record', params);
  },
  queryParams: {
    page: {refreshModel: true},
    text: {refreshModel: true},
    per_page: {refreshModel: true, replace: true},
    //note: using and/or/without because Ember doesn't support dynamically-generated queryParams,
    // and this seems like a better solution than manually generating 3 queryParams for every schema field
    // we can pass serialized objects into these 3 params in ember, and then deserialize them just before
    // passing them to the API.
    and: {refreshModel: true},
    geo_bbox: {refreshModel: true},
  }
});
