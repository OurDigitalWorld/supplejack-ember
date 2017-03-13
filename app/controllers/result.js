import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller('application'),
  actions: {
    // using history.back to return to the search results triggers the browser popStateEvent,
    // which is a signal the RouterScroll mixin needs to know that it should return to the previous scroll position
    back(){
      history.back();
    }
  }
});
