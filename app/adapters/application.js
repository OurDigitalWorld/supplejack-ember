import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: 'http://192.168.99.100:3000/',
  ajax: function(url, method, hash){
    hash.crossDomain = true;
    hash.xhrFields = {withCredentials: true};
    return this._super(url, method, hash);
    }
  });

















