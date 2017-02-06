import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'img',
  attributeBindings: ['src', 'alt'],
  classNameBindings: ['isBroken:placeholder'],

  isBroken: false,
  //empty alt text tells screen readers to ignore this, which is best practice since a text link is next to it
  alt: '',

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
