import Ember from 'ember';

export function removeParam(params/*, hash*/) {
  let [param, category, title] = params;
  console.log(param);
  console.log(category);
  console.log(title);
  let result = param;
  const i = result[category].indexOf(title);

  if (i !== -1){
    result[category].splice(i,1);
  }
  if (result[category].length === 0){
    delete result[category];
  }
  if (Object.keys(result).length === 0){
    result = '';
  }
  //return result;
}

export default Ember.Helper.helper(removeParam);
