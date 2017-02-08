import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: 'http://192.168.99.100:3000',
  //supplejack's find record spec doesn't quite match a standard REST interface
  urlForFindRecord(id, modelName, snapshot){
    let baseUrl = this.buildURL();
    return `${baseUrl}/${modelName}s/${id}.json?api_key=apikey&fields=all`
  }
  });

















