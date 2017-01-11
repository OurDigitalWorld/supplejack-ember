import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['page', 'text', 'per_page'],
  page: 1,
  text: '',
  per_page: '20',

  actions: {
    //needs a specific function to ensure that you stay on the right page when the offset changes
    updateOffset(value){
      //changes current page to keep same results on page
      let firstResult = ((this.get('page') - 1) * this.get('per_page')) + 1;
      this.set("page", Math.ceil(firstResult / value));
      //sets new per_page value
      this.set("per_page", value);
    },
    updateParam(param, value){
      this.set(param, value[param]);
    }
  }
});
