import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['hl'],
  hl: '',
  actions: {
    setLocale(locale){
      this.set('hl', locale);
      //note: the locale is set in route/application when the hl query param changes
    }
  }
});
