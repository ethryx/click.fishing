var React = require('react');
var StatsPanel = require('./components/StatsPanel.jsx');
var CookiePanel = require('./components/CookiePanel.jsx');
var ChatPanel = require('./components/ChatPanel.jsx');
var ItemPanel = require('./components/ItemPanel.jsx');

var Game = React.createClass({
  render: function() {
    return (
      <div className="game-container">
        <div className="section left-side">
          <StatsPanel />
          <ChatPanel />
        </div>
        <div className="section middle">
          <CookiePanel />
        </div>
        <div className="section right-side">
          <ItemPanel />
        </div>
      </div>
    );
  }
});

React.render(
  <Game />,
  document.getElementById('entry-point')
);
