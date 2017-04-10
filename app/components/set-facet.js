import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  hrefTo: Ember.computed('facet', 'value', function(){
    const facet = this.get('facet');
    const value = this.get('value');
    let result = {};
    result[facet] = [];
    result[facet].push(value);
    return result;
  })
});
