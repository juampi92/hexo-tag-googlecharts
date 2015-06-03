#hexo-tag-googlecharts

Version: 1.0.0

Compatible with Hexo Version 3

## About

First, you should go check [GoogleCharts](https://google-developers.appspot.com/chart/interactive/docs/) docs, so you could understand this plugin's potential.

The google charts tag plugin for hexo  helps you add dynamic charts by google into your hexo blog.

## Install

This is important. In order for this plugin to work, you'll have to include above the post content, the script for the Google JS API.
It should look like this

```html
<script type="text/javascript" src="//www.google.com/jsapi"></script>
```

Then you should run the following command
```
npm install hexo-tag-googlecharts --save
```

## How to use it

The tag called `googlecharts` requires an endtag called `endgooglecharts`.
The main tag can have up to 3 arguments, which none are required, but they have default values that may not be what you wanted.
If a chart is created without a type, it'll default to `Table`. Then the default width is 400, and default height is 400 too.

```
{% googlecharts ChartType [width [height]] %}
```

Check google's API to see every type of chart, and now we'll show you how to use it here.

In the content, fist you should have the title of the chart, plain text

```
{% googlecharts ... %}
  This is the title for the chart
  ....
{% endgooglecharts ... %}
```


In the next line, you could (optional) have custom options. To tell the plugin you are going to use custom options, you should start the second line with a `{`. And in that line you should add a JSON object that will be merged with your options. 
Remember that it has to be a valid JSON, so use [jsonlint.com](http://jsonlint.com/) if you need to, and it has to be in one line, so no break lines!

```
{% googlecharts ... %}
  ....
  {"is3D": true}
  ....
{% endgooglecharts ... %}
```

Finally, we enter the chart's data. The next row will be the column titles, and then, each row will have it's values. You must list each value separated by a colon, and if the value is a string, don't forget to include simple quotes.

```
{% googlecharts ... %}
  ....
  'Column1', 'Column2', 'Column3'
  'foo', 28, 5
  'bar', 71, 19
  ....
{% endgooglecharts ... %}
```

## Example

A simple example makes it easy to see how this plugin works.

```md
{% googlecharts ChartType [width [height]] %}
  Title for the Graph
  { "customOptions": true }
  'Column1', 'Column2', 'Column3'
  1000, 28, 5
  5000, 71, 19
  10000, 143, 37
  20000, 282, 68
{% endgooglecharts %}
```

## How the plugin works

If you would like to use a different ChartType, and don't know how, maybe this guide will help.

Supose you go into the [Chart Gallery](https://google-developers.appspot.com/chart/interactive/docs/gallery), and you see a chart you like, and the example code is a bit like this:

```js
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Sales', 'Expenses'],
    ['2013',  1000,      400],
    ['2014',  1170,      460],
    ['2015',  660,       1120],
    ['2016',  1030,      540]
  ]);

  var options = {
    title: 'Company Performance',
    hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
    vAxis: {minValue: 0}
  };

  var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}
```

You now know all you need to know for making this chart.

```js
new google.visualization.AreaChart(
```
Tells you that it's an `AreaChart` type.

```js
options = {
  title: 'Company Performance',
  hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
  vAxis: {minValue: 0}
};
```
The options, remove the title, height or width, and you have your custom options

````json
{"hAxis": {"title": "Year", "titleTextStyle": {"color": "#333" }}, "vAxis": { "minValue": 0}}

```

And finally, inside `arrayToDataTable` you have the data.
Remove the first `[` and the last `],` of each line, and you have your data.

**Note:** if in the chart example code they use things like `data.addColumn('string', 'Something')`, ignore them, and add the columns the way it's explained in this document. If it doesn't work, you can always inspect the generated Javascript, and see if that's the data you wanted.