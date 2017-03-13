import DS from 'ember-data';
import ENV from 'supplejack-client/config/environment';

export default DS.JSONSerializer.extend({
  primaryKey: ENV.APP.primaryKey,
  metaData: {},
  normalizeResponse(store, primaryModelClass, payload, id, requestType){
    //deserialization for search results
    if (payload.hasOwnProperty('search')) {
      //grabs the metadata before normalizing it all away
      let meta = {};
      meta.result_count = payload.search.result_count;
      meta.per_page = payload.search.per_page;
      meta.page = payload.search.page;
      meta.facets = payload.search.facets;
      this.set('metaData', meta);

      //payload.search.results = payload without any of the metadata attached
      //looks through the array of locations, and takes the first one that has numeric lat and lng values, sets them as DS.attrs 'lat' and 'lng'
      for (let element of payload.search.results){
        let lat = 0;
        let lng = 0;
        for (let instance of element.locations){

          if (!!instance.lat && !!instance.lng) {
            lat = instance.lat;
            lng = instance.lng;
            break;
          }
        }
        element.lat = lat;
        element.lng = lng;
      }
      return this._super(store, primaryModelClass, payload.search.results, id, requestType);
    }
    //deserialization for single page
    if (payload.hasOwnProperty('record')){
      return this._super(store, primaryModelClass, payload.record, id, requestType);
    }
  },
  extractMeta(){
    return this.get('metaData');
  }
});
