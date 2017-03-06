import Ember from 'ember';

export default Ember.Controller.extend({
  application: Ember.inject.controller('application'),
  textParamStorage: {},
  //leaflet variables - should eventually be moved to new controller
  lat: 53.014783245859235,
  lng: -96.24023437500001,
  zoom: 5,
  minZoom: 2,
  maxZoom: 15,
  //stores geo_bbox data in format expected by updateParams action
  boundingBox: {
    geo_bbox: ''
  },
  //determines whether the 'refresh map' button is visible
  isHidden: false,

  locations: Ember.computed('model', function(){
    console.log(this.get('model'));
  }),

  actions: {
    updateParams(obj){
      //if the geo_bbox is being updated, hide the geo_bbox search button
      if ('geo_bbox' in obj){
        this.set('isHidden', true);
      }
      this.get('application').send('updateParams', obj);
    },
    updateCenter(e){
      let center = e.target.getCenter();
      this.set('lat', center.lat);
      this.set('lng', center.lng);

      let bounds = e.target.getBounds();
      const north = bounds.getNorth() > 90? 90 : bounds.getNorth();
      const west = bounds.getWest() < -180? -180 : bounds.getWest();
      const south = bounds.getSouth() < -90? -90 : bounds.getSouth();
      const east = bounds.getEast() > 180? 180: bounds.getEast();
      console.log('east:'+bounds.getEast());
      console.log('west:'+bounds.getWest());
      console.log('north:'+bounds.getNorth());
      console.log('south:'+bounds.getSouth());
      this.set('boundingBox.geo_bbox', `${north},${west},${south},${east}`);
      this.set('isHidden', false);
    }
  }
});
