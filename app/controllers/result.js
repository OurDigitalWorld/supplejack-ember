import Ember from 'ember';

export default Ember.Controller.extend({
  search: Ember.inject.controller('search'),
  actions: {
    // using history.back to return to the search results triggers the browser popStateEvent,
    // which is a signal the RouterScroll mixin needs to know that it should return to the previous scroll position
    back(){
      history.back();

    }
  }
});
