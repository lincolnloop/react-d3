/** @jsx React.DOM */
var React = require('react');
var pkg = require('../package.json');
var d3 = require('d3');
var BarChart = require('../src/barchart').BarChart;
var LineChart = require('../src/linechart').LineChart;
var PieChart = require('../src/piechart').PieChart;
var AreaChart = require('../src/areachart').AreaChart;
var Treemap = require('../src/treemap').Treemap;
var datagen = require('../utils/datagen');
var hljs = require("highlight.js");

hljs.initHighlightingOnLoad();

var Demos = React.createClass({

  getInitialState: function() {
    return {
      areaData: []
    }
  },

  componentDidMount: function() {
    // Apple stock data from Mike Bostock's chart at
    // http://bl.ocks.org/mbostock/3883195
    var parseDate = d3.time.format("%d-%b-%y").parse;
    d3.tsv("data/applestock.tsv", function(error, data) {
      data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.value = +d.value;
      });
      this.setState({areaData: data});
    }.bind(this))

  },

  render: function() {

    var lineData = {
        series1: [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 }, { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ],
        series2: [ { x: 0, y: 8 }, { x: 1, y: 5 }, { x: 2, y: 20 }, { x: 3, y: 12 }, { x: 4, y: 4 }, { x: 5, y: 6 }, { x: 6, y: 2 } ],
        series3: [ { x: 0, y: 0 }, { x: 1, y: 5 }, { x: 2, y: 8 }, { x: 3, y: 2 }, { x: 4, y: 6 }, { x: 5, y: 4 }, { x: 6, y: 2 } ]
    };
    var barData = [{label: 'A', value: 5}, {label: 'B', value: 6}, {label: 'C', value: 2}, {label: 'D', value: 11}, {label: 'E', value: 2}, {label: 'F', value: 7}];
    var pieData = [{label: "Margarita", value: 20.0}, {label: "John", value: 55.0}, {label: "Tim", value: 25.0 }];
    // 2014 Most Populous Countries
    // http://www.prb.org/pdf14/2014-world-population-data-sheet_eng.pdf
    var treemapData = [{label: 'China', value: 1364}, {label: 'India', value: 1296}, {label: 'United States', value: 318}, {label: 'Indonesia', value: 251}, {label: 'Brazil', value: 203}];

    return (
      <div className="container">
        <a href="https://github.com/esbullington/react-d3"><img style={{position: "absolute", top: "0", right: "0", border: "0"}} src="https://camo.githubusercontent.com/a6677b08c955af8400f44c6298f40e7d19cc5b2d/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677261795f3664366436642e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png" /></a>
        <h2 className="page-header">
          react-d3
        </h2>
        <div className="row">
          <div className="col-md-6">
            <BarChart data={barData} width={500} height={200} title="Bar Chart"/>
          </div>
          <div className="col-md-6">
            <pre ref='block'>
              <code className='js'>
              {"var barData = [\n  {label: 'A', value: 5},\n  {label: 'B', value: 6},\n  ...\n  {label: 'F', value: 7}];"}
              </code>
            </pre>
            <pre ref='block'>
              <code className='html'>
                {"<BarChart\n  data={barData}\n  width={500}\n  height={200}\n  fill={'#3182bd'}\n  title='Bar Chart'\n/>"}
              </code>
            </pre>
          </div>
        </div>
        <div className="row">
          <hr/>
        </div>
        <div className="row">
          <div className="col-md-6">
            <PieChart data={pieData} width={450} height={400} radius={110} innerRadius={20} title="Pie Chart" />
          </div>
          <div className="col-md-6">
            <pre ref='block'>
              <code className='js'>
              {"var pieData = [\n  {label: 'Margarita', value: 20.0},\n  {label: 'John', value: 55.0},\n  {label: 'Tim', value: 25.0 }]"}
              </code>
            </pre>
            <pre ref='block'>
              <code className='html'>
                {'<PieChart\n  data={pieData}\n  width={400}\n  height={400}\n  radius={100}\n  innerRadius={20}\n  title="Pie Chart"\n/>'}
              </code>
            </pre>
          </div>
        </div>
        <div className="row">
          <hr/>
        </div>
        <div className="row">
          <div className="col-md-6">
            <LineChart data={lineData} width={400} height={200} title="Line Chart" />
          </div>
          <div className="col-md-6">
            <pre ref='block'>
              <code className='js'>
              {'var lineData = {\n  series1: [ { x: 0, y: 20 }, ... , { x: 6, y: 10 } ],\n  series2: [ { x: 0, y: 8 }, ..., { x: 6, y: 2 } ],\n  series3: [ { x: 0, y: 0 }, ..., { x: 6, y: 2 } ]\n}'}
              </code>
            </pre>
            <pre ref='block'>
              <code className='html'>
              {'<LineChart\n  data={lineData}\n  width={400}\n  height={200}\n  title="Line Chart"\n/>'}
              </code>
            </pre>
          </div>
        </div>
        <div className="row">
          <hr/>
        </div>
        <div className="row">
          <div className="col-md-6">
            <AreaChart
              data={this.state.areaData}
              width={400}
              height={300}
              yAxisTickCount={4}
              xAxisTickInterval={{unit: 'year', interval: 1}}
              title="Area Chart"
            />
          </div>
          <div className="col-md-6">
            <pre ref='block'>
              <code className='js'>
              {'//Sample data format (not actually rendered)\n//for actual data, see Apple stock data from Mike Bostock\'s chart:\n// http://bl.ocks.org/mbostock/3883195\nvar areaData = [\n  {date: 1177646400000, value: 582.13},\n  ...\n  {date: 1178078400000, value: 603}\n]'}
              </code>
            </pre>
            <pre ref='block'>
              <code className='html'>
                {'<AreaChart\n  data={areaData}\n  width={400}\n  height={300}\n  yAxisTickCount={4}\n  xAxisTickInterval={{unit: "year", interval: 1}}\n  title="Area Chart"\n/>'}
              </code>
            </pre>
          </div>
        </div>
        <div className="row">
          <hr/>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Treemap
              width={450}
              height={250}
              title="Treemap"
              data={treemapData}
              textColor="#484848"
              fontColor="10px"
            />
          </div>
          <div className="col-md-6">
            <pre ref='block'>
              <code className='js'>
              {'//2014 World Most Populous Countries (millions)\n//http://www.prb.org/pdf14/2014-world-population-data-sheet_eng.pdf\n var treemapData = [\n  {label: "China", value: 1364},\n  {label: "India", value: 1296},\n...\n  {label: "Brazil", value: 203}\n ];'}
              </code>
            </pre>
            <pre ref='block'>
              <code className='html'>
                {'<Treemap\n  data={treemapData}\n  width={450}\n  height={250}\n  textColor="#484848"\n  fontSize="10px"\n  title="Treemap"\n/>'}
              </code>
            </pre>
          </div>
        </div>

      </div>
    );
  }

});

React.render(
  <Demos />,
  document.body
);
