import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['page', 'text'],
  page: '',
  text: ''

});
