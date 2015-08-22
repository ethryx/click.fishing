var React = require('react');
var GameStore = require('../stores/GameStore');

var InfoPanel = React.createClass({

  render: function() {
    return (
      <div className="panel info-panel">
        <div className="panel-inner">
          Fish: 0
        </div>
      </div>
    );
  }

});

module.exports = InfoPanel;
