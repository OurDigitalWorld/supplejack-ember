import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller('application'),
  textParamReceiver: {},
  actions:{
    updateParams(obj){
      this.get('application').send('updateParams', obj);
    }
  }
});
