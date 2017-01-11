import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    return this.get('store').query('record', {
      api_key: 'apikey',
      fields: 'all',
      page: params.page,
      text: params.text,
      per_page: params.per_page,
    });
  },
  queryParams: {
    page: {refreshModel: true},
    text: {refreshModel: true},
    per_page: {refreshModel: true, replace: true}
  }
});
