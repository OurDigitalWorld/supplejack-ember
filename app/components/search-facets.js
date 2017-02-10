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
  actions:{
    toggleFacets(){
      this.toggleProperty('facetsVisible');
    }
  }
});
