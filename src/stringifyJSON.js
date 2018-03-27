// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function (obj) {
  // your code goes here
  if (typeof obj === 'function' || obj === undefined) {
    return '{}';
  }
  if (typeof obj === 'number' || typeof obj === 'boolean' || obj === undefined || obj === null) {
    return String(obj);
  }
  if (typeof obj === 'string') {
    return '"' + obj + '"';
  }
  if (Array.isArray(obj)) {
    var result = '[';
    _.each(obj, function (item, index) {
      result += stringifyJSON(item);
      if (index < obj.length - 1) {
        result += ',';
      }
    });
    result += ']';
    return result;
  }
  if (typeof obj === 'object') {
    var result = '{';
    _.each(obj, function (value, key) {
      if (typeof value !== 'function' && value !== undefined) {
        result += '"' + key + '"' + ':' + stringifyJSON(value) + ',';
      }
    });
    if (result[result.length - 1] === ',') {
      result = result.substr(0, result.length - 1);
    }
    result += '}';
    return result;
  }
};
