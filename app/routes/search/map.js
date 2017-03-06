import Ember from 'ember';

export default Ember.Route.extend({
  //values to set params to when entering this page...
  mapParams: {
    page: 1,
    per_page: 100,
  },
  setupController(){
    this._super(...arguments);
    //set page and per_page to the appropriate values for map searching
    this.controller.send('updateParams', this.get('mapParams'));
  },
  actions: {
    willTransition(transition){
      //clear geo_bbox when leaving the map.
      this.controller.send('updateParams', {geo_bbox: ''});
      //send whatever is in textParamStorage back to the text search to restore its previous queryparams
      if (transition.targetName === 'search.index'){
        this.controllerFor('search.index').set('textParamReceiver', this.controller.get('textParamStorage'));
      }
    }
  }
});
