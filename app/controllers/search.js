import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['page', 'text', 'per_page', 'and', 'or', 'without', 'facets'],
  page: 1,
  text: '',
  per_page: '20',
  and: '',
  or: '',
  without: '',
  facets: '',

  //assigns human-readable text values to each of the record model attributes
  //This and the models/record.js file are the two places that need editing in the
  //client when the record_schema is changed on Supplejack
  //note, we can add additional fields to this to identify specific places where certain fields will be used
  recordFields: [
    {value: 'title', title: 'Title'},
    {value: 'description', title: 'Description'},
    {value: 'subject', title: 'Subject'},
    {value: 'display_content_partner', title: 'Content Partner'},
    {value: 'display_collection', title: 'Collection'},
    {value: 'source_url', title: 'URL'},
    {value: 'display_date', title: 'Date'},
    {value: 'creator', title: 'Creator'},
    {value: 'category', title: 'Category'},
    {value: 'language', title: 'Language'},
    {value: 'rights', title: 'Rights'},
    {value: 'publisher', title: 'Publisher'}
  ],

  actions: {
    //updates queryParams
    //accepts object containing key/value pairs
    //where the key is a param name, and the value is its value
    updateParams(obj){
      for (const key in obj){
        if (!obj.hasOwnProperty(key)) continue;
        this.set(key, obj[key]);
      }
    },
  }
});
