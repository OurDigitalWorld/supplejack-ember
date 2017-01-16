import Ember from 'ember';

export default Ember.Component.extend({
  searchParams: {},
  actions: {
    executeSearch(value){
      this.get('onChange')(value);
    },
    toggleAdvancedSearch(){
      this.toggleProperty('showAdvancedSearch');
    }
  }
});
