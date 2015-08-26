var React = require('react');
var FishingPanel = require('./components/FishingPanel.jsx');
var FishListPanel = require('./components/FishListPanel.jsx');
var TimePanel = require('./components/TimePanel.jsx');
var MainPanel = require('./components/MainPanel.jsx');
var ActionPanel = require('./components/ActionPanel.jsx');
var InfoPanel = require('./components/InfoPanel.jsx');

var Game = React.createClass({
  componentDidMount: function() {
    console.log('Welcome to click.fishing! Enjoy.');
  },

  render: function() {
    return (
      <div className="game-container">
        <div className="section left-side">
          <div className="section-inner">
            <FishingPanel />
            <FishListPanel />
          </div>
        </div>
        <div className="section middle">
          <div className="section-inner">
            <TimePanel />
            <MainPanel />
          </div>
        </div>
        <div className="section right-side">
          <div className="section-inner">
            <ActionPanel />
            <InfoPanel />
          </div>
        </div>
      </div>
    );
  }
});

React.render(
  <Game />,
  document.getElementById('entry-point')
);
