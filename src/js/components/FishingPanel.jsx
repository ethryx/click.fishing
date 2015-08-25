var React = require('react');

var FishingPanel = React.createClass({

  getInitialState: function() {
    return {
      numFish: 10
    };
  },

  render: function() {
    var fish = [];
    for(var i = 0; i < this.state.numFish; i++) {
        fish.push(<Fish key={i} fishIndex={i} speed={100} />);
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

var Fish = React.createClass({
  getInitialState: function() {
    return {
    };
  },

  animate: function() {
    var currentLeft = parseInt(this.state.divStyle.left.replace('px', ''));
    this.setState({
      divStyle: {
        top: this.state.divStyle.top,
        left: (currentLeft + 5) + 'px',
        zIndex: parseInt(this.props.fishIndex + 1)
      }
    });
    clearInterval(this.animateTimer);
  },

  componentDidMount: function() {
    this.setState({
      divStyle: {
        top: Math.round(Math.random() * ($('.fishing-panel').height() - 0) + 0) + 'px',
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
      <div className="fish" style={this.state.divStyle}></div>
    );
  }

});

module.exports = FishingPanel;
