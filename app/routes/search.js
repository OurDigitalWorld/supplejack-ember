import Ember from 'ember';

export default Ember.Route.extend({
  model(params){

    for (const key in params){
      if (!params.hasOwnProperty(key)) continue;
      //removes any params that haven't been assigned a value
      if (params[key] === '' || params[key] === null){
        delete params[key];
      }
      //add bit here to destringify 'and' / 'or / 'without' params
    }
    //adds the api key and field set to the params to be sent to the API
    params.api_key = 'apikey';
    params.fields = 'all';
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
    without: {refreshModel: true},
    //facets is used to return metadata showing all the possible options for a given field
    // this data can then be access in a template through {{#each model.meta.facets.field_name as |item|}}
    facets: {refreshModel: true}
  }
});
