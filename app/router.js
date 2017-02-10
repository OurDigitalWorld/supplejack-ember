import Ember from 'ember';
import config from './config/environment';
import RouterScroll from 'ember-router-scroll';

const Router = Ember.Router.extend(RouterScroll, {
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('search', function(){
    this.route('map');
  });
  this.route('result', {path: '/result/:result_id'});
});

export default Router;
