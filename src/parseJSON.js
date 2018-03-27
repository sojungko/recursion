// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function (json) {
  // your code goes here
  json = json.replace(/\s/g, ''); // remove spaces
  if (json === 'true') {
    return true;
  }
  if (json === 'false') {
    return false;
  }
  if (json === 'null') {
    return null;
  }
  if (json[0] === '"' && json[json.length - 1] === '"') {
    return json.substr(1, json.length - 2);
  }
  if (json[0] === '[' && json[json.length - 1] === ']') {
    if (json.length === 2) {
      return [];
    }
    var result = json.substr(1, json.length - 2);
    result = result.split(',');
    return _.map(result, function (item) {
      return parseJSON(item);
    });
  }
  if (json[0] === '{' && json[json.length - 1] === '}') {
    var result = {};
    if (json.length === 2) {
      return result;
    }

    var array = json.substr(1, json.length - 2).split(',');
    _.each(array, function (item) {
      var itemArray = item.split(':');
      var key = parseJSON(itemArray[0]);
      var value = parseJSON(itemArray[1]);
      result[key] = value;
    });
    return result;
  }
  if ((/([0-9\-.])/g).test(json)) {
    return parseFloat(json);
  }

};
