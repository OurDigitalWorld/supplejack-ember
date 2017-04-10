import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  isActive: false,
  didReceiveAttrs(){
    this._super(...arguments);
    if (this.get('locale') === this.get('language')){
      this.set('isActive', true);
    } else {
      this.set('isActive', false);
    }
  }
});
