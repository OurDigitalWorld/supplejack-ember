import Ember from 'ember';

export default Ember.Component.extend({
  fastboot: Ember.inject.service(),
  facetsVisible: false,
  filterNumber: Ember.computed('param', function(){
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
  }).property('param', 'facetsVisible'),
  actions:{
    toggleFacets(){
      this.toggleProperty('facetsVisible');
    }
  }
});
