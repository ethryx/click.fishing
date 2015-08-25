var React = require('react');
var GameStore = require('../stores/GameStore');

var InfoPanel = React.createClass({

  getInitialState: function() {
    return {
      totalFish: GameStore.getTotalFish()
    };
  },

  onGameUpdate: function() {
    var totalFish = GameStore.getTotalFish();

    this.setState({
      totalFish: totalFish
    });
  },

  componentDidMount: function() {
    GameStore.addChangeListener(this.onGameUpdate);
  },

  componentWillUnmount: function() {
    GameStore.removeChangeListener(this.onGameUpdate);
  },

  render: function() {
    return (
      <div className="panel info-panel">
        <div className="panel-inner">
          Fish: {this.state.totalFish}
        </div>
      </div>
    );
  }

});

module.exports = InfoPanel;
