var React = require('react');
var GameStore = require('../stores/GameStore');

var NetWorthPanel = React.createClass({
  getInitialState: function() {
    return {
      netWorth: GameStore.getNetWorth(),
      playerName: GameStore.getPlayerName()
    };
  },

  onGameDataChange: function() {
    this.setState({
      netWorth: GameStore.getNetWorth(),
      playerName: GameStore.getPlayerName()
    });
  },

  componentDidMount: function() {
    GameStore.addChangeListener(this.onGameDataChange);
  },

  componentWillUnmount: function() {
    GameStore.removeChangeListener(this.onGameDataChange);
  },

  render: function() {
    return (
      <div className="panel net-worth-panel">
        <div className="panel-inner">
          {this.state.playerName + "'s"} Net Worth: ${this.state.netWorth}
        </div>
      </div>
    );
  }

});

module.exports = NetWorthPanel;
