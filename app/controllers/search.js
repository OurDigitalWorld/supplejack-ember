import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['page', 'text', 'per_page', 'and', 'geo_bbox'],
  page: 1,
  text: '',
  per_page: 20,
  //note: and/or/without accept serialized data in the following format:
  //"facet_field:Text to be Filtered,facet_field:Another Filter,"
  and: [],
  geo_bbox: '',

  //Attributes that will appear in the descriptive list on the (single record) result page
  //if a given attribute should also be a filterable facet, add 'facet:true' to its object.
  recordFields: [
    {value: 'creator'},
    {value: 'description'},
    {value: 'subject', facet:true},
    {value: 'display_date'},
    {value: 'category'},
    {value: 'language', facet:true},
    {value: 'publisher'},
    {value: 'display_content_partner', facet:true}
  ],

  //all record fields that are a facet. USED IN ROUTES/APPLICATION
  recordFacets: Ember.computed('recordFields.[]', function(){
    const facetArray = this.get('recordFields').filterBy('facet', true);
    let facetString = '';
    facetArray.forEach((facet)=>{
      facetString += facet.value + ',';
    });
    facetString = facetString.slice(0,-1);
    return facetString;
  }),

  actions: {
    //updates queryParams
    //accepts object containing key/value pairs
    //where the key is a param name, and the value is its value
    updateParams(obj){
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
});
