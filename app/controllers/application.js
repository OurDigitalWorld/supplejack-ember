import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['page', 'text', 'per_page', 'and', 'or', 'without'],
  page: 1,
  text: '',
  per_page: 20,
  //note: and/or/without accept serialized data in the following format:
  //"facet_field:Text to be Filtered,facet_field:Another Filter,"
  and: '',
  or: '',
  without: '',


  //this object can be passed to updateParams to clear all set params.
  resetParams: {
    page: 1,
    text: '',
    per_page: 20,
    and: '',
    or: '',
    without: '',
  },

  //assigns human-readable text values to each of the record model attributes
  //This and the models/record.js file are the two places that need editing in the
  //client when the record_schema is changed on Supplejack
  //Properties:
  //  any field with "facet: true" will get facet metadata in model.meta.facets
  recordFields: [
    {value: 'title', title: 'Title'},
    {value: 'description', title: 'Description'},
    {value: 'subject', title: 'Subject', facet: true},
    {value: 'display_content_partner', title: 'Content Partner'},
    {value: 'display_collection', title: 'Collection'},
    {value: 'source_url', title: 'URL'},
    {value: 'display_date', title: 'Date'},
    {value: 'creator', title: 'Creator'},
    {value: 'category', title: 'Category', facet: true},
    {value: 'language', title: 'Language', facet: true},
    {value: 'publisher', title: 'Publisher', facet:true},
    {value: 'thumbnail_url', title:'Thumbnail'}
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

  //array of all recordFields values. USED IN ROUTES/APPLICATION
  recordValues: Ember.computed('recordFields.[]', function(){
    let valueArray = [];
    this.get('recordFields').forEach((record)=>{
      valueArray.push(record.value);
    });
    return valueArray;
  }),

  actions: {
    //updates queryParams
    //accepts object containing key/value pairs
    //where the key is a param name, and the value is its value
    updateParams(obj){
      for (const key in obj){
        if (!obj.hasOwnProperty(key)) {continue;}
        this.set(key, obj[key]);
      }
    }
  }
});
