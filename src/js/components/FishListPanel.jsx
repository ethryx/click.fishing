var React = require('react');
var GameStore = require('../stores/GameStore');

var FishListPanel = React.createClass({

  render: function() {
    return (
      <div className="panel fish-list-panel">
        <div className="panel-inner">

        </div>
      </div>
    );
  }

});

var Fish = React.createClass({

  render: function() {
    return (
      <div></div>
    );
  }

});

module.exports = FishListPanel;
