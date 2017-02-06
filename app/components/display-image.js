import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'img',
  attributeBindings: ['src'],
  classNameBindings: ['isBroken:placeholder'],

  isBroken: false,

  didInsertElement: function() {
    //set placeholder if thumb_url doesn't exist
    if (this.get('src') === null){
      this.set('isBroken', true);
    }
    //set placeholder if thumb_url is not resolveable
    this.$().on('error', function() {
      this.set('isBroken', true);
    }.bind(this));
  },

  willDestroyElement: function(){
    this.$().off();
  }
});
