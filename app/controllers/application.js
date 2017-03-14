import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    setLocale(locale){
      this.i18n.set('locale', locale);
    }
  }
});
