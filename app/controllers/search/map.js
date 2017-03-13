import Ember from 'ember';

export default Ember.Controller.extend({
  search: Ember.inject.controller('search'),
  queryParams: ['lat', 'lng', 'zoom'],
  //leaflet variables - should eventually be moved to new controller
  lat: 53.014783245859235,
  lng: -96.24023437500001,
  zoom: 5,
  minZoom: 2,
  maxZoom: 15,
  //stores geo_bbox data in format expected by updateParams action
  boundingBox: {
    geo_bbox: '0,0,0,0'
  },
  //determines whether the 'refresh map' button is visible
  isHidden: false,

  actions: {
    updateParams(obj){
      //unload all data before fetching, because marker-cluster isn't good at dealing with old data.
      this.get('store').unloadAll();
      //if the geo_bbox is being updated, hide the geo_bbox search button
      if ('geo_bbox' in obj){
        this.set('isHidden', true);
      }
      this.get('search').send('updateParams', obj);
    },
    updateCenter(e){
      let center = e.target.getCenter();
      this.set('lat', center.lat);
      this.set('lng', center.lng);
      this.set('zoom', e.target.getZoom());

      let bounds = e.target.getBounds();
      const north = bounds.getNorth() > 85? 58 : bounds.getNorth();
      const west = bounds.getWest() < -180? -180 : bounds.getWest();
      const south = bounds.getSouth() < -85? -85 : bounds.getSouth();
      const east = bounds.getEast() > 180? 180: bounds.getEast();

      this.set('boundingBox.geo_bbox', `${north},${west},${south},${east}`);
      this.set('isHidden', false);
    }
  }
});
