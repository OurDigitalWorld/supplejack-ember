import Ember from 'ember';

const FacetLinkComponent = Ember.Component.extend({
  //when component is rendered, have it check what state it should be in
  didReceiveAttrs(){
    this._super(...arguments);
    this.send('setState');
  },
  //tagless component
  tagName: '',
  //component state
  facetInUse: false,
  actions: {
    //if facet already exists, set facetInUse to true.  Otherwise, set to false.
    setState(){
      let facetStr = `${this.get('facet')}:${this.get('title')},`;
      if (this.get('param').includes(facetStr)){
        this.set('facetInUse', true);
      } else {
        this.set('facetInUse', false);
      }
    },
    //adds this facet to current param
    addFacet(){
      let newParam = `${this.get('param')}${this.get('facet')}:${this.get('title')},`;
      let obj = {
        and: newParam,
        page: 1 //return to first page, since results are changing.
      };
      this.get('onChange')(obj);
    },
    //removes this facet from current param
    removeFacet(){
      let facetStr = `${this.get('facet')}:${this.get('title')},`;
      let newParam = this.get('param').replace(facetStr, '');
      let obj = {
        and: newParam,
        page: 1 //return to first page, since results are changing.
      };
      this.get('onChange')(obj);
    }
  }
});

FacetLinkComponent.reopenClass({
  positionalParams: ['facet', 'title', 'results', 'param']
});

export default FacetLinkComponent;
