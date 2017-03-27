import Ember from 'ember';

const FacetLinkComponent = Ember.Component.extend({
  //when component is rendered, have it check what state it should be in
  didReceiveAttrs(){
    this._super(...arguments);
    this.send('setState');
  },
  //tagless component
  tagName: 'li',
  classNames: ['facet-link'],
  classNameBindings: ['facetInUse:active'],
  //component state
  facetInUse: false,
  actions: {
    //if facet already exists, set facetInUse to true.  Otherwise, set to false.
    setState(){
      const param = this.get('param');
      const category = this.get('category');
      const title = this.get('title');
      if (param[category]){
        if (param[category].includes(title)){
          this.set('facetInUse', true);
        } else {
          this.set('facetInUse', false);
        }
      } else {
        this.set('facetInUse', false);
      }
    },
    //adds new facet search or deletes existing one
    toggleFacet(){
      const category = this.get('category');
      const title = this.get('title');
      //prevents errors caused by the fact that ember is treating the empty param as an array and not an object
      let newParams = Array.isArray(this.get('param')) ? {} : this.get('param');
      if (this.get('facetInUse')){
        //if item already exists, remove it.
        const i = newParams[category].indexOf(title);
        if (i !== -1){
          newParams[category].splice(i,1);
        }
        //if no items exist for this facet, remove facet
        if (newParams[category].length === 0){
          delete newParams[category];
        }
      } else {
        //if facet doesn't exist, add it
        if (!newParams[category]){newParams[category]=[];}
        //add value to facet
        newParams[category].push(title);
      }
      //if nothing is left in the params object, change to empty string so it won't be url-encoded
      if (Object.keys(newParams).length === 0){
        newParams = '';
      }
      //package for updateParams
      let obj = {
        page: 1,
        and: newParams
      };
      //send action back up
      this.get('onChange')(obj);
    }
  }
});

FacetLinkComponent.reopenClass({
  positionalParams: ['category', 'title', 'results', 'param']
});

export default FacetLinkComponent;
