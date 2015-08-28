var React = require('react');
var TextStore = require('../stores/TextStore');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var GameConstants = require('../constants/GameConstants');

var MainPanel = React.createClass({

  onTextChange: function() {
    var textLines = TextStore.getText();
    console.log(textLines);
  },

  componentDidMount: function() {
    TextStore.addChangeListener(this.onTextChange);
    AppDispatcher.handleViewAction({
      actionType: GameConstants.GAME_ADD_TEXT,
      text: 'Welcome to click fishing!'
    });
  },

  componentWillUnmount: function() {
    TextStore.removeChangeListener(this.onTextChange);
  },

  render: function() {
    return (
      <div className="panel main-panel">
        <div className="panel-inner">
          Main panel lives here.
        </div>
      </div>
    );
  }

});

module.exports = MainPanel;
