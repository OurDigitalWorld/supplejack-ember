import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['search-pagination'],

  //default variables
  display: 'both',
  offsetAmount: 20,

  didReceiveAttrs() {
    //sets the offsetamount to be equal to the per_page value
    this._super(...arguments);
    this.set('offsetAmount', this.get('meta.per_page'));
  },
  //computed value of current record offset based on page
  offset: Ember.computed('meta', function(){
    return ((this.get('meta.page') - 1) * this.get('meta.per_page') + 1);
  }),
  //computed value of the end current offset
  offsetLast: Ember.computed('meta', 'offset', function(){
    const potentialOffsetLast = this.get('offset') + this.get('meta.per_page') - 1;
    //if there are more results than what will be displayed, return offset + per_page
    if (this.get('meta.result_count') > potentialOffsetLast){
      return potentialOffsetLast;
    } else {
      //otherwise, return the result count.
      return this.get('meta.result_count');
    }
  }),
  //list of options for the results per page to be set to
  offsetOptions: [
    {value: 10},
    {value: 20},
    {value: 50},
    {value: 100},
  ],
  //computed value of last page that will contain content
  lastPage: Ember.computed('meta', function(){
    return Math.ceil(this.get('meta.result_count') / this.get('meta.per_page'));
  }),
  //determines whether the first ellipse in the pagination bar needs to be displayed
  displayStartEllipse: Ember.computed('meta', 'lastPage', function(){
    return (this.get('meta.page') >= 7 && this.get('lastPage') > 11);
  }),
  //determines whether the second ellipse in the pagination bar needs to be displayed
  displayEndEllipse: Ember.computed('meta', 'lastPage', function(){
    return (this.get('meta.page') <= (this.get('lastPage') - 6 ) && this.get('lastPage') > 11);
  }),
  //returns an object containing all of the pagination links that should be
  // displayed aside from the first and last page links.
  paginationLinks: Ember.computed('meta', 'lastPage', function(){
    let output = [];
    const current = this.get('meta.page');
    const last = this.get('lastPage');
    //function that takes an initial and maximum value,
    //and returns a page object for every number in between.
    //also assigns property 'isActive' to the current page.
    const getPage = (init, max)=>{
      for (let i=init; i<=max; i++){
        let link = {};
        if (i === current) {link.isActive = true;}
        link.page = i;
        output.push(link);
      }
    };
    //if there are 11 or fewer pages
    // get pages 2 to (last -1)
    if (last <= 11) {getPage(2, (last-1));}
      //if the current page is less than 7
      //get pages 2 to 9
    else if (current < 7) {getPage(2, 9);}
      //if the current page is within 7 of the last page
      //get pages (last-9) to (last-1)
    else if (current > (last - 6)) {getPage((last-8),(last-1));}
      //otherwise, just get the 3 pages on either side of the current page
    else {getPage((current-3),(current+3));}

    return output;
  }),
  //returns object containing all the pages hidden by first ellipse
  startEllipseRange: Ember.computed('paginationLinks', function(){
    let output = [];
    let pageSet = new Set();
    //get lowest value from paginationLinks
    for (const obj of this.get('paginationLinks')){
      pageSet.add(obj.page);
    }
    const lowestPage = Math.min(...pageSet);
    //get range of values between 2 and lowest val - 1
    for (let i=2; i<lowestPage; i++){
      let link = {};
      link.page = i;
      output.push(link);
    }
    return output;
  }),
  //returns object containing all the pages hidden by the second ellipse
  endEllipseRange: Ember.computed('paginationLinks', 'lastPage', function(){
    let output = [];
    let pageSet = new Set();
    //get high value from paginationLinks
    for (const obj of this.get('paginationLinks')){
      pageSet.add(obj.page);
    }
    const highestPage = Math.max(...pageSet) + 1;
    //get range of values between highest value +1 and last page -1
    for (let i=highestPage; i<this.get('lastPage'); i++){
      let link = {};
      link.page = i;
      output.push(link);
    }
    return output;
  }),
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
