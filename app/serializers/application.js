import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  normalizeQueryResponse(store, type, payload){
    return {
      data: {
        id: payload.search.results.record_id,
        type: type.modelName,
        attributes: {
          title: payload.search.results.title
        }
      }
    };
  }
});
