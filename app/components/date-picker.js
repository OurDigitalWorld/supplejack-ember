import Ember from 'ember';

export default Ember.Component.extend({
  //added facet-items here so that search-facets will update the badge value when filter dates
  classNames: ['date-picker', 'facet-items'],

  didReceiveAttrs(){
    this._super(...arguments);
    const param = this.get('param');
    if (param.year){
      //convert existing year range back to something it understands
      let vals = param.year.replace(/[\[\]]/g, '').split(' TO ');
      this.set('dateStart', vals);
      this.set('isDisabled', false);
    } else {
      this.send('toggleSlider', true);
    }
  },

  isDisabled: true,
  startYear: 1700,
  endYear: Ember.computed(function(){
    return new Date().getFullYear();
  }),
  dateStart: Ember.computed('startYear', 'endYear', function(){
    return [this.get('startYear'), this.get('endYear')];
  }),
  dateRange: Ember.computed('startYear', 'endYear', function(){
    return {
      min: this.get('startYear'),
      max: this.get('endYear')
    };
  }),
  selectedDates: ['????', '????'],

  actions: {
    //updates dates in display whenever slider moves
    updateDate(value){
      this.set('selectedDates', value);
    },
    //executes search when slider stops moving
    executeSearch(value){
      //prevents errors caused by the fact that ember is treating the empty param as an array and not an object
      let newParams = Array.isArray(this.get('param')) ? {} : this.get('param');
      newParams.year = `[${value[0]} TO ${value[1]}]`;
      const obj = {
        and: newParams,
        page: 1
      };
      this.get('onChange')(obj);
    },
    toggleSlider(value){
      if (value===true){
        let and = this.get('param');
        if (and.year){
          delete and.year;
          const obj = {
            and: and,
            page: 1,
          };
          this.get('onChange')(obj);
        }
        this.set('dateStart', [this.get('startYear'),this.get('endYear')]);
        this.set('isDisabled', true);
      } else {
        this.set('isDisabled', false);
      }
    }
  }
});
