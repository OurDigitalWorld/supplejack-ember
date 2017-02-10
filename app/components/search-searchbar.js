import Ember from 'ember';

export default Ember.Component.extend({
  didReceiveAttrs(){
    this._super(...arguments);

    //puts the current text param into the search bar when the page loads
    this.set('searchParams.text', this.get('param'));
  },
  searchParams: {
    text: '',
    //returns to page 1 of search results if you enter a new search
    page: 1
  },
  actions: {
    executeSearch(value){
      console.log('fired');
      this.get('onChange')(value);
    }
  }
});
