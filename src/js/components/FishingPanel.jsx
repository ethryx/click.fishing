var React = require('react');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var GameConstants = require('../constants/GameConstants');
var FishingPanel = React.createClass({

  getInitialState: function() {
    return {
      numFish: 40
    };
  },

  randomNumber: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  render: function() {
    var fish = [];
    for(var i = 0; i < this.state.numFish; i++) {
        fish.push(<SwimmingFish key={i} fishIndex={i} speed={this.randomNumber(25,100)} />);
    }

    return (
      <div className="panel fishing-panel">
        <div className="panel-inner">

          {fish}

        </div>
      </div>
    );
  }

});

var SwimmingFish = React.createClass({
  getInitialState: function() {
    return {
    };
  },

  animate: function() {
    var currentLeft = parseInt(this.state.divStyle.left.replace('px', ''));

    if(currentLeft > $('.fishing-panel').width()) {
      currentLeft = -100;
    }

    this.setState({
      divStyle: {
        top: this.state.divStyle.top,
        left: (currentLeft + 5) + 'px',
        zIndex: parseInt(this.props.fishIndex + 1),
        transition: ((currentLeft === -100) ? 'none' : 'all 0.1s ease')
      }
    });
  },

  randomNumber: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  onClick: function() {
    AppDispatcher.handleViewAction({
      actionType: GameConstants.GAME_CLICK_FISH
    });
  },

  componentDidMount: function() {
    var topMost = 0 - (34 * this.props.fishIndex);
    var bottomMost = $('.fishing-panel').height() + topMost;

    this.setState({
      divStyle: {
        top: this.randomNumber(topMost, bottomMost) + 'px',
        left: '-100px'
      }
    });
    this.animateTimer = setInterval(this.animate, this.props.speed);
  },

  componentWillUnmount: function() {
    clearInterval(this.animateTimer);
  },

  render: function() {
    return (
      <div className="fish" style={this.state.divStyle} onClick={this.onClick}></div>
    );
  }

});

module.exports = FishingPanel;
