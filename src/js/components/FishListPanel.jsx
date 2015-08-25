var React = require('react');
var GameStore = require('../stores/GameStore');

var FishListPanel = React.createClass({

  onGameUpdate: function() {
    var capturedFish = GameStore.getAllFish();
  },

  componentDidMount: function() {
    GameStore.addChangeListener(this.onGameUpdate);
  },

  componentWillUnmount: function() {
    GameStore.removeChangeListener(this.onGameUpdate);
  },

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
