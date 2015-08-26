var React = require('react');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var GameConstants = require('../constants/GameConstants');
var GameStore = require('../stores/GameStore');
var FishingPanel = React.createClass({

  getInitialState: function() {
    return {
      numFish: 10,
      playerName: GameStore.getPlayerName()
    };
  },

  randomNumber: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  onClick: function() {
    var newName = prompt('What is your name?');

    if(newName) {
      // Set a new name here..
    }
  },

  render: function() {
    var fish = [];
    for(var i = 0; i < this.state.numFish; i++) {
        fish.push(<SwimmingFish key={i} fishIndex={i} speed={this.randomNumber(25,80)} direction={this.randomNumber(0,1)} />);
    }

    return (
      <div className="panel fishing-panel">
        <div className="panel-inner">

          <div className="player-name" onClick={this.onClick}>
            Mike's Fish
          </div>

          {fish}

        </div>
      </div>
    );
  }

});

var SwimmingFish = React.createClass({
  getInitialState: function() {
    return {
      className: this.getBaseClassName()
    };
  },

  getBaseClassName: function() {
    if(this.props.direction === 0) {
      return 'fish';
    } else {
      return 'fish reverse';
    }
  },

  resetPosition: function() {
    this.reposition();
    this.animate(true);
    this.setState({
      className: this.getBaseClassName()
    });
  },

  animate: function(resetPosition) {
    var currentLeft = parseInt(this.state.divStyle.left.replace('px', ''));

    if(this.props.direction === 0 && currentLeft > $('.fishing-panel').width()) {
      this.resetPosition();
      return;
    } else if(this.props.direction === 1 && currentLeft < -100) {
      this.resetPosition();
      return;
    }

    if(typeof resetPosition === 'boolean' && resetPosition === true) {
      currentLeft = ((this.props.direction === 0) ? -100 : $('.fishing-panel').width());
    }

    this.setState({
      divStyle: {
        top: this.state.divStyle.top,
        left: ((this.props.direction === 0) ? (currentLeft + 5) : (currentLeft - 5)) + 'px',
        zIndex: parseInt(this.props.fishIndex + 1),
        transition: ((currentLeft === -100) ? 'none' : 'all 0.1s ease'),
        opacity: this.state.divStyle.opacity
      }
    });
  },

  randomNumber: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  onMouseOver: function() {
    this.setState({
      className: this.getBaseClassName() + ' mouse-hover'
    });
  },

  onMouseOut: function() {
    this.setState({
      className: this.getBaseClassName()
    });
  },

  onMouseDown: function() {
    this.setState({
      className: this.getBaseClassName() + ' mouse-down'
    });
  },

  onMouseUp: function() {
    this.setState({
      className: this.getBaseClassName() + ' mouse-up'
    });

    AppDispatcher.handleViewAction({
      actionType: GameConstants.GAME_CLICK_FISH
    });

    setTimeout(this.resetPosition, 100);
  },

  reposition: function() {
    var topMost = 0 - (34 * this.props.fishIndex);
    var bottomMost = ($('.fishing-panel').height() + topMost) - 50;

    this.setState({
      divStyle: {
        top: this.randomNumber(topMost, bottomMost) + 'px',
        left: ((this.props.direction === 0) ? '-100px' : $('.fishing-panel').width() + 'px'),
        opacity: ( this.randomNumber(10, 50) * 0.01)
      }
    });
  },

  componentDidMount: function() {
    this.reposition();
    this.animateTimer = setInterval(this.animate, this.props.speed);
  },

  componentWillUnmount: function() {
    clearInterval(this.animateTimer);
  },

  render: function() {
    return (
      <div className={this.state.className} style={this.state.divStyle} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}></div>
    );
  }

});

module.exports = FishingPanel;
