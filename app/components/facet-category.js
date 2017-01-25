import Ember from 'ember';

const FacetCategoryComponent = Ember.Component.extend({
  didReceiveAttrs(){
    this.set('hasHidden', true);
  },
  showAll: false,
  hasHidden: true,
  filteredOptions: Ember.computed('options', 'showAll', function(){
    if (this.get('showAll')){
      return this.get('options');
    } else {
      const options = this.get('options');
      let OoMsArray = [];
      let OoMsSet = new Set();
      let magArray = [];
      let result = {};
      //function to get order of magnitude of a value
      const getOoM = (value) => {
        return parseInt(Math.log10(value));
      };
      //get array and set of all orders of magnitude
      for (const key in options){
        if (!options.hasOwnProperty(key)) {continue;}
        OoMsArray.push(getOoM(options[key]));
        OoMsSet.add(getOoM(options[key]));
      }
      //use array to create object with counts of every OoM
      let OoMsCount = OoMsArray.reduce(function(prev, cur){
        prev[cur] = (prev[cur] || 0) +1;
        return prev;
      }, {});
      //if magnitude in filter does not have a count of 2, add magnitudes until it does.
      let resultsCount = 0;
      for (let i=0; resultsCount < 2; i++){
        //add highest value to magArray
        magArray.push(Math.max(...OoMsSet));
        resultsCount += OoMsCount[magArray[i]];
        //remove highest value in set
        OoMsSet.delete(Math.max(...OoMsSet));
      }
      //convert magArray to Set for use in final step
      const magSet = new Set(magArray);
      for (const key in options){
        if (!options.hasOwnProperty(key)) {continue;}
        //if the magSet has the same OoM as the option, add it to the result obj.
        if (magSet.has(getOoM(options[key]))){
          result[key] = options[key];
        }
      }
      //if everything from the original set is in the new set, don't show a "show more" button
      if (JSON.stringify(options) === JSON.stringify(result)){
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
  positionalParams: ['facet', 'options', 'param']
});

export default FacetCategoryComponent;
