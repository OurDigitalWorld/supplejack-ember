import Ember from 'ember';

export default Ember.Route.extend({
  //when navigating to this route, if there are params in the textParamReceiver object, pass them along
  setupController(){
    this._super(...arguments);
    if (!Ember.$.isEmptyObject(this.controller.get('textParamReceiver'))){
      this.controller.send('updateParams', this.controller.get('textParamReceiver'));
    }
  },
  actions:{
    willTransition(transition){
      //if transitioning to maps, hand the current page / per_page params over so it can hand them back safely when done
      if (transition.targetName === 'search.map'){
        const paramsObj = {
          page: transition.queryParams.page || 1,
          per_page: transition.queryParams.per_page || 20
        };
        this.controllerFor('search.map').set('textParamStorage', paramsObj);
      }
    }
  }
});

