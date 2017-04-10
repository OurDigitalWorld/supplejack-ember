import Ember from 'ember';

export default Ember.Controller.extend({
  fastboot: Ember.inject.service(),
  application: Ember.inject.controller('application'),
  recordFields: [
    {value: 'category', links: true},
    {value: 'creator'},
    {value: 'description'},
    {value: 'display_date'},
    {value: 'language', links:true},
    {value: 'subject', links:true},
    {value: 'publisher'}
  ],
  actions: {
    // using history.back to return to the search results triggers the browser popStateEvent,
    // which is a signal the RouterScroll mixin needs to know that it should return to the previous scroll position
    back(){
      history.back();

    }
  }
});
