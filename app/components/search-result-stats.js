import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['result-stats', 'form-inline'],
  didReceiveAttrs() {
    //sets the offsetamount to be equal to the per_page value
    this._super(...arguments);
    this.set('offsetAmount', this.get('meta.per_page'));
  },
  offsetAmount: 20,
  //list of options for the results per page to be set to
  offsetOptions: [
    {value: 10},
    {value: 20},
    {value: 50},
    {value: 100},
  ],
  showDropdown: false,
  actions: {
    //function for changing which page is showing when you change the per_page value
    // ensures that the same results stay near the top of the page
    selectOffset(value){
      this.set('offsetAmount', value);
      //determines what the new page should be to keep same results on page
      const firstResult = ((this.get('meta.page') - 1 ) * this.get('meta.per_page')) + 1;
      const newPage = Math.ceil(firstResult / value);
      //creates object to send up to the updateParams function in the controller
      const obj = {
        page: newPage,
        per_page: value,
      };
      //bubbles action up
      this.get('onChange')(obj);
    }
  }
});
