var React = require('react');
var GameStore = require('../stores/GameStore');

var InfoPanel = React.createClass({

  getInitialState: function() {
    return {
      availableUpgrades: GameStore.getAvailableUpgrades(),
      toolTipVisible: false
    };
  },

  onGameUpdate: function() {

  },

  onMouseEnter: function() {
    this.setState({
      toolTipVisible: true
    });
  },

  componentDidMount: function() {
    GameStore.addChangeListener(this.onGameUpdate);
  },

  componentWillUnmount: function() {
    GameStore.removeChangeListener(this.onGameUpdate);
  },

  render: function() {
    var upgradeComponents = [];
    for(var i = 0; i < this.state.availableUpgrades.length; i++) {
      upgradeComponents.push(
        <Upgrade onMouseEnter={this.onMouseEnter} key={i} upgradeName={this.state.availableUpgrades[i].NAME} upgradeCount={this.state.availableUpgrades[i].OWNED} />
      );
    }

    return (
      <div className="panel upgrade-panel">
        <div className="panel-inner">
          <Tooltip visible={this.state.toolTipVisible} />
          {upgradeComponents}
        </div>
      </div>
    );
  }

});

var Upgrade = React.createClass({

  render: function() {
    return (
      <div className="upgrade">
        <div className="name">{this.props.upgradeName}</div>
        <div className="quantity">You have <strong>{this.props.upgradeCount}</strong> of these.</div>
      </div>
    );
  }

});

var Tooltip = React.createClass({

  getInitialState: function() {
    return {};
  },

  getClassNames: function() {

    if(this.props.visible) {
      return 'tooltip visible';
    } else {
      return 'tooltip';
    }

  },

  render: function() {
    return (
      <div className={this.getClassNames()} >
        Wee!
      </div>
    );
  }

});

module.exports = InfoPanel;
