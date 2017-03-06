import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ul',
  classNames: ['pagination', 'search-pagination'],

  //computed value of last page that will contain content
  lastPage: Ember.computed('meta', function(){
    return Math.ceil(this.get('meta.result_count') / this.get('meta.per_page'));
  }),
  //determines whether the first ellipse in the pagination bar needs to be displayed
  displayStartEllipse: Ember.computed('meta', 'lastPage', function(){
    return (this.get('meta.page') >= 7 && this.get('lastPage') > 11);
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
    // get pages 2 to (last)
    if (last <= 11) {getPage(2, (last));}
      //if the current page is less than 7
      //get pages 2 to 9
    else if (current < 7) {getPage(2, 9);}
      //if the current page is within 7 of the last page
      //get pages (last-9) to (last)
    else if (current > (last - 6)) {getPage((last-8),(last));}
      //otherwise, just get the 3 pages on either side of the current page
    else {getPage((current-3),(current+3));}

    return output;
  })
});
