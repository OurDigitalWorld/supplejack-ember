import Ember from 'ember';

export default Ember.Component.extend({
  searchParams: {
    //returns to page 1 of search results if you enter a new search
    page: 1
  },
  actions: {
    executeSearch(value){
      this.get('onChange')(value);
    },
    toggleAdvancedSearch(){
      this.toggleProperty('showAdvancedSearch');
    }
  }
});
