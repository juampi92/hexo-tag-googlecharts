var fs = require('fs'),
  path = require('path'),
  _ = require('underscore');

var filePath = path.join(__dirname, 'google-charts-template.html');

function googleMaps(args, content) {

  var template = fs.readFileSync(filePath).toString(),
    data = [],
    options = {},
    chartType,
    title;

  function toMarker(d) {
    return '[' + d + ']';
  }

  if (content.length) {
    var cont = content.split('\n');
    title = cont.shift();

    // Check for options
    if (cont[0][0] === '{') {
      options = JSON.parse(cont.shift());
    }
    // Create the Data
    data = '[' + _.map(cont, toMarker).join(',') + ']';
  }

  // Mix arguments with content options
  options = _.extend(options, {
    title: title || 'No title',
    width: args[1] || 400,
    height: args[2] || 400
  });

  // Get the type of chart. This does not validate, because google
  // can add or delete charts, and there's no need to update the
  // plugin just because of that
  chartType = args[0] || 'Table';

  // Output into 
  return _.template(template)({
    id: 'googleChart' + ((Math.random() * 9999) | 0),
    options: options,
    deps: ['corechart', 'geochart', 'table'],
    chartType: chartType,
    data: data
  });
}


hexo.extend.tag.register('googlecharts', googleMaps, {
  async: true,
  ends: true
});