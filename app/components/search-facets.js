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
    const params = this.get('param');
    let result = 0;
    for (const key in params){
      if (!params.hasOwnProperty(key)){continue;}
      if (typeof params[key] === "string"){
        result++;
      } else {
        result+= params[key].length;
      }
    }
    return result;
  }),
  actions:{
    toggleFacets(){
      this.toggleProperty('facetsVisible');
      this.notifyPropertyChange('filterNumber');
    }
  }
});
