var React = require('react');
var GameStore = require('../stores/GameStore');
var GameConstants = require('../constants/GameConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var UpgradePanel = React.createClass({

  getInitialState: function() {
    return {
      availableUpgrades: GameStore.getAvailableUpgrades(),
      netWorth: GameStore.getNetWorth()
    };
  },

  onGameUpdate: function() {
    this.setState({
      availableUpgrades: GameStore.getAvailableUpgrades(),
      netWorth: GameStore.getNetWorth()
    });
  },

  isUpgradeAvail: function(upgradeIndex) {
    var netWorth = this.state.netWorth;
    var upgradeCost = this.state.availableUpgrades[upgradeIndex].COST;

    if(upgradeCost > netWorth) {
      return false;
    }

    return true;
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
        <Upgrade key={i} upgradeId={this.state.availableUpgrades[i].ID} upgradeAvail={this.isUpgradeAvail(i)} upgradeName={this.state.availableUpgrades[i].NAME} upgradeCount={this.state.availableUpgrades[i].OWNED} upgradeDescription={this.state.availableUpgrades[i].DESC} upgradeCost={this.state.availableUpgrades[i].COST} />
      );
    }

    return (
      <div className="panel upgrade-panel">
        <div className="panel-inner">
          {upgradeComponents}
        </div>
      </div>
    );
  }

});

var Upgrade = React.createClass({

  getInitialState: function() {
    return {
      ttVisible: false
    };
  },

  onMouseEnter: function() {
    this.setState({
      ttVisible: true
    });
  },

  onMouseLeave: function() {
    this.setState({
      ttVisible: false
    });
  },

  onClick: function() {
    AppDispatcher.handleViewAction({
      actionType: GameConstants.GAME_PURCHASE_UPGRADE,
      upgradeId: this.props.upgradeId
    });
  },

  getToolTipStyles: function() {
    var toolTipFixedWidth = 300 + 20 + 5; // Base width + 10px padding on both sides + offset
    var toolTipTop = 65;

    return {
      left: ($(window).width() - $('.upgrade-panel').width() - toolTipFixedWidth) + 'px'
    };
  },

  render: function() {
    var ttClassName = 'tooltip';

    if(this.state.ttVisible === true) {
      ttClassName += ' visible';
    }

    var className = 'upgrade' + ((this.props.upgradeAvail === true) ? '' : ' unavail');

    return (
      <div className={className} onClick={this.onClick} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <div className={ttClassName} style={this.getToolTipStyles()}>
          <Tooltip name={this.props.upgradeName} owned={this.props.upgradeCount} desc={this.props.upgradeDescription} cost={this.props.upgradeCost} />
        </div>
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

  render: function() {
    return (
      <div className="tooltip-inner">
        <div className="tt-name">{this.props.name}</div>
        <div className="tt-owned">You have {this.props.owned} of these.</div>
        <div className="tt-desc">{this.props.desc}</div>
        <div className="tt-cost">This upgrade costs ${this.props.cost}.</div>
      </div>
    );
  }

});

module.exports = UpgradePanel;
