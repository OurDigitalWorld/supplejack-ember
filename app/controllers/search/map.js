import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller('application'),
  //leaflet variables - should eventually be moved to new controller
  lat: 57.231502991478926,
  lng: -96.6796875,
  zoom: 3,
  actions: {
    updateParams(obj){
      this.get('application').send('updateParams', obj);
    },
    updateCenter(e){
      let center = e.target.getCenter();
      this.set('lat', center.lat);
      this.set('lng', center.lng);
    }
  }
});
