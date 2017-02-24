import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller('application'),
  //leaflet variables - should eventually be moved to new controller
  lat: 53.014783245859235,
  lng: -96.24023437500001,
  zoom: 7,
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
