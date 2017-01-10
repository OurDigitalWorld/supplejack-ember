import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    return this.get('store').query('record', {
      api_key: 'apikey',
      fields: 'all',
      page: params.page,
      text: params.text
    });
  },
  queryParams: {
    page: {refreshModel: true},
    text: {refreshModel: true}
  }
});
