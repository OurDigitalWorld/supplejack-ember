import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    hl: {replace: true}
  },
  actions: {
    queryParamsDidChange(param){
      if ('hl' in param){
        this.i18n.set('locale', param.hl);
      }
    }
  }
});
