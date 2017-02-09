import DS from 'ember-data';
import ENV from 'supplejack-client/config/environment';

export default DS.RESTAdapter.extend({
  host: ENV.APP.host,
  //supplejack's find record spec doesn't quite match a standard REST interface
  urlForFindRecord(id, modelName, snapshot){
    let baseUrl = this.buildURL();
    return `${baseUrl}/${modelName}s/${id}.json?api_key=${ENV.APP.api_key}&fields=all`
  }
  });

















