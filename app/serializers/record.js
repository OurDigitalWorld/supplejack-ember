import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  primaryKey: 'record_id',
  normalizeResponse(store, primaryModelClass, payload, id, requestType){
    return this._super(store, primaryModelClass, payload.search.results, id, requestType)
  }
});
