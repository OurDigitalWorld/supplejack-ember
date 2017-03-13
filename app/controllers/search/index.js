import Ember from 'ember';

export default Ember.Controller.extend({
  search: Ember.inject.controller('search'),
  actions:{
    updateParams(obj){
      this.get('search').send('updateParams', obj);
    }
  }
});
