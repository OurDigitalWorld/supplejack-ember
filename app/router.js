import Ember from 'ember';
import config from './config/environment';
import RouterScroll from 'ember-router-scroll';

const Router = Ember.Router.extend(RouterScroll, {
  location: config.locationType,
  rootURL: config.rootURL,

  //a bit of a kludge, but this makes the return-to-top button hidden on pages that don't scroll.
  //I wish I could put this in the component, but this is the only place where I could access a hook that fires on every route change.
  didTransition(){
    Ember.run.later(this, function(){
      if (document.body.scrollHeight > document.body.clientHeight){
        Ember.$('#return-to-top').removeClass('hidden');
      } else {
        Ember.$('#return-to-top').addClass('hidden');
      }
    }, 10)
  }
});

Router.map(function() {
  this.route('search', function(){
    this.route('map');
  });
  this.route('result', {path: '/result/:result_id'});
});

export default Router;
