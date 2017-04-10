//HOW TO USE - use this helper when you want to format an array of strings into a comma separated list.
//Syntax: {{csv-list array empty="Unknown"}}
// array : replaced by the array of your choice.
// empty (optional) : the value you want this helper to return if it's passed something empty or undefined.
//Output: If given a single string, outputs whatever it recieved normally.
//        If given an array of strings, outputs the array as an unordered list with the class "csv"
//        If given nothing, it returns an empty string or the value passed to the 'empty' variable, wrapped in span.empty

import Ember from 'ember';

export function csvList(params, hash) {
  let [data] = params;
  if (!Array.isArray(data)){data = [data];}
  let result = "";
  let empty = hash.empty === undefined ? '' : hash.empty;
  if (typeof data !== 'undefined'){
    if (data.length === 0){
      return Ember.String.htmlSafe(`<span class="empty">${empty}</span>`);
    } else if (data.length === 1){
      return data;
    } else if (data.length > 1){
      data.forEach(function(res){
        result += Ember.String.htmlSafe(`<li>${Ember.Handlebars.Utils.escapeExpression(res)}</li>`);
      });
      return new Ember.String.htmlSafe(`<ul class="csv text">${result}</ul>`);
    }
  }
}

export default Ember.Helper.helper(csvList);
