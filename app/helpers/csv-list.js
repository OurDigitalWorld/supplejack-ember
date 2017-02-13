//HOW TO USE - use this helper when you want to format an array of strings into a comma separated list.
//Syntax: {{csv-list array}}
// where array is replaced by the array of your choice.
//Output: If given a single string, outputs whatever it recieved normally.
//        If given an array of strings, outputs the array as an unordered list with the class "csv"

import Ember from 'ember';

export function csvList(params/*, hash*/) {
  let [data] = params;
  let result = "";
  if (typeof data !== 'undefined'){
    if (data.length === 1){
      return data;
    } else if (data.length > 1){
      data.forEach(function(res){
        result += Ember.String.htmlSafe(`<li>${Ember.Handlebars.Utils.escapeExpression(res)}</li>`);
      });
      return new Ember.String.htmlSafe(`<ul class="csv">${result}</ul>`);
    }
  }
}

export default Ember.Helper.helper(csvList);
