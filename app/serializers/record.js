import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  primaryKey: 'record_id',
  metaData: {},
  normalizeResponse(store, primaryModelClass, payload, id, requestType){
    //grabs the metadata before normalizing it all away
    let meta = {};
    meta.result_count = payload.search.result_count;
    meta.per_page = payload.search.per_page;
    meta.page = payload.search.page;
    meta.facets = payload.search.facets;
    this.set('metaData', meta);
    //returns the payload without any of the metadata attached
    return this._super(store, primaryModelClass, payload.search.results, id, requestType);
  },
  extractMeta(){
    return this.get('metaData');
  }
});
