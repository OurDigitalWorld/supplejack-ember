import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    return this.store.findRecord('record', params.result_id, {backgroundReload: true});
  }
});


