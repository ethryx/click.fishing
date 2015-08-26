var React = require('react');
var GameStore = require('../stores/GameStore');
var GameConstants = require('../constants/GameConstants');

var FishListPanel = React.createClass({

  getInitialState: function() {
    return {
      capturedFish: GameStore.getAllFish()
    };
  },

  onGameUpdate: function() {
    this.setState({
      capturedFish: GameStore.getAllFish()
    });
  },

  componentDidMount: function() {
    GameStore.addChangeListener(this.onGameUpdate);
  },

  componentWillUnmount: function() {
    GameStore.removeChangeListener(this.onGameUpdate);
  },

  render: function() {
    var fishArray = [];
    for(var i = 0; i < this.state.capturedFish.length; i++) {
      fishArray.push(
        <Fish key={i} type={this.state.capturedFish[i].type} amount={this.state.capturedFish[i].amount} />
      );
    }

    return (
      <div className="panel fish-list-panel">
        <div className="panel-inner">
          {fishArray}
        </div>
      </div>
    );
  }

});

var Fish = React.createClass({

  getFishTypeString: function() {
    switch(this.props.type) {
      case GameConstants.FISH_TYPES.STANDARD:
        return 'Regular Fish';
      default:
        return 'Unknown Fish';
    }
  },

  render: function() {
    return (
      <div className="fish">
        <div className="picture">

        </div>
        <div className="information">
          <div className="fish-type">{this.getFishTypeString()}</div>
          <div className="fish-amount">{this.props.amount}</div>
        </div>
      </div>
    );
  }

});

module.exports = FishListPanel;
