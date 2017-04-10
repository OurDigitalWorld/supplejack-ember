import Ember from 'ember';

export default Ember.Controller.extend({
  fastboot: Ember.inject.service(),
  application: Ember.inject.controller('application'),
  queryParams: ['page', 'text', 'per_page', 'and', 'geo_bbox'],
  page: 1,
  text: '',
  per_page: 20,
  //note: and/or/without accept serialized data in the following format:
  //"facet_field:Text to be Filtered,facet_field:Another Filter,"
  and: [],
  geo_bbox: '',
  isLoading: false,

  //Add keys for each facet you want here -- used by recordFacets (below), and is passed down search-facets > facet-category
  //Available options:
  //  show:
  //    'all' -> always shows all facets, up to the limit of the number of facets retrieved from Supplejack (defined in routes/search.js)
  //    'none' -> shows no facets by default, but shows all of them if you click the 'see more +' button.
  //    <integer> -> will show a minimum of this number of results, rounded up to the nearest order of magnitude
  facetFields: {
    'display_content_partner' : {show: 'all'},
    'subject' : {},
    'language' : {show: 'none'}
  },

  //all record fields that are a facet. USED IN ROUTES/APPLICATION
  recordFacets: Ember.computed('facetFields.[]', function(){
    let facetString = '';
    for (const key in this.get('facetFields')){
      if (!this.get('facetFields').hasOwnProperty(key)){continue;}
      facetString += key + ',';
    }
    facetString = facetString.slice(0,-1);
    return facetString;
  }),

  actions: {
    //updates queryParams
    //accepts object containing key/value pairs
    //where the key is a param name, and the value is its value
    updateParams(obj){
      if (this.get('isLoading') === false){
        for (const key in obj){
          if (!obj.hasOwnProperty(key)) {continue;}
          this.set(key, obj[key]);
          //needs this to deal with the fact that the route is not listening for changes within objects on query params
          if (key === 'and'){
            this.notifyPropertyChange(key);
          }
        }
      }
    }
  }
});
