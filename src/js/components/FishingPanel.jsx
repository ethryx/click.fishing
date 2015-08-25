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
      className: 'fish'
    };
  },

  animate: function(resetPosition) {
    var currentLeft = parseInt(this.state.divStyle.left.replace('px', ''));

    if( (typeof resetPosition === 'boolean' && resetPosition === true) || currentLeft > $('.fishing-panel').width()) {
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

  onMouseDown: function() {
    this.setState({
      className: 'fish mouse-down'
    });
  },

  onMouseUp: function() {
    this.setState({
      className: 'fish mouse-up'
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
      <div className={this.state.className} style={this.state.divStyle} onClick={this.onClick} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}></div>
    );
  }

});

module.exports = FishingPanel;
