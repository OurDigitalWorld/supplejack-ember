import Ember from 'ember';

export default Ember.Component.extend({
  didUpdate(){
    this._super(...arguments);
    if(this.get('screen.isMediumAndUp')){
      this.set('facetsVisible', false);
    }
  },
  screen: Ember.inject.service(),
  facetsVisible: false,
  facetsHideable: Ember.computed.alias('screen.isMediumAndDown'),
  filterNumber: Ember.computed(function(){
    return Ember.$('.facet-items > .active').length;
  }),
  actions:{
    toggleFacets(){
      this.toggleProperty('facetsVisible');
      this.notifyPropertyChange('filterNumber');
    }
  }
});
