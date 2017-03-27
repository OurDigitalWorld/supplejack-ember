import Ember from 'ember';

const FacetCategoryComponent = Ember.Component.extend({
  didReceiveAttrs(){
    this._super(...arguments);
    this.set('hasHidden', true);
    //sets up component based on 'show' options
    const show = this.get('options.show');
    if (show === 'all'){
      this.set('showAll', true);
    } else if (show === 'none'){
      this.set('showNone', true);
    } else if (!isNaN(show)){
      this.set('minimumSet', parseInt(show));
    }
  },
  showAll: false,
  showNone: false,
  hasHidden: true,
  minimumSet: 3,
  filteredOptions: Ember.computed('options', 'showAll', 'param', function(){
    let facets = this.get('facets');

    //add filters that appear in the url but not in the options
    let currentFilters = this.get(`param.${this.get('category')}`);
    if (typeof currentFilters !== 'undefined'){
      for (const filter of currentFilters){
        if (!(filter in this.get('facets'))){
          facets[filter] = 0;
        }
      }
    }
    //if the 'show all' button is clicked, show every link available in metadata
    if (this.get('showAll')){
      return facets;
    //otherwise, do complicated math to show only the highest one or more orders of maginitude which result in at least 3 options appearing.
    } else if (this.get('showNone')){
      return {};
    } else {
      let OoMsArray = [];
      let OoMsSet = new Set();
      let magArray = [];
      let result = {};
      //function to get order of magnitude of a value
      const getOoM = (value) => {
        return parseInt(Math.log10(value));
      };
      //get array and set of all orders of magnitude
      for (const key in facets){
        if (!facets.hasOwnProperty(key)) {continue;}
        OoMsArray.push(getOoM(facets[key]));
        OoMsSet.add(getOoM(facets[key]));
      }
      //use array to create object with counts of every OoM
      let OoMsCount = OoMsArray.reduce(function(prev, cur){
        prev[cur] = (prev[cur] || 0) +1;
        return prev;
      }, {});
      //if magnitude in filter does not have a count of 3, add magnitudes until it does.
      let resultsCount = 0;
      for (let i=0; resultsCount < this.get('minimumSet'); i++){
        if (OoMsSet.size === 0){break;} //avoid infinite loops if there aren't enough things to display in a category
        //add highest value to magArray
        magArray.push(Math.max(...OoMsSet));
        resultsCount += OoMsCount[magArray[i]];
        //remove highest value in set
        OoMsSet.delete(Math.max(...OoMsSet));
      }
      //convert magArray to Set for use in final step
      const magSet = new Set(magArray);
      for (const key in facets){
        if (!facets.hasOwnProperty(key)) {continue;}
        //if the magSet has the same OoM as the option, add it to the result obj.
        if (magSet.has(getOoM(facets[key]))){
          result[key] = facets[key];
        }
      }
      //if everything from the original set is in the new set, don't show a "show more" button
      if (JSON.stringify(facets) === JSON.stringify(result)){
        this.toggleProperty('hasHidden');
      }
      return result;
    }
  }),
  actions: {
    toggleShowAll(){
      this.toggleProperty('showAll');
    }
  }
});

FacetCategoryComponent.reopenClass({
  positionalParams: ['category', 'facets', 'param']
});

export default FacetCategoryComponent;
