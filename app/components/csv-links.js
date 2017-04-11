import Ember from 'ember';

const CsvLinksComponent = Ember.Component.extend({
  dataLength: Ember.computed('data', function() {
    if (typeof this.get('data') !== 'undefined') {
      return this.get('data').length;
    }
  })
});

CsvLinksComponent.reopenClass({
  positionalParams: ['category','data']
});

export default CsvLinksComponent;
