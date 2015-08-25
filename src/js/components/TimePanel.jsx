var React = require('react');
var TimeStore = require('../stores/TimeStore');

var TimePanel = React.createClass({

  getInitialState: function() {
    return {};
  },

  positionSunMoon: function() {
    var currentMinute = TimeStore.getMinute();
    var isDay = TimeStore.getIsDay();
    var timePanelInnerWidth = ($('.time-panel').width() - 20);
    var sunSize = $('.time-panel .panel-inner .sun').width();
    var furthestRight = (timePanelInnerWidth - sunSize);

    // Let's adjust currentMinute so it is always 0 - 29
    if(currentMinute > 29) {
      currentMinute -= 30;
    }

    if(isDay) {
      $('.time-panel .panel-inner .sun').removeClass('moon');
    } else {
      $('.time-panel .panel-inner .sun').addClass('moon');
    }

    var minutePosition = (currentMinute * furthestRight) / 29;

    $('.time-panel .panel-inner').animate({
      marginLeft: minutePosition + 'px'
    });

  },

  _onTimeChange: function() {
    this.positionSunMoon();
  },

  componentDidMount: function() {
    this.positionSunMoon();
    TimeStore.addChangeListener(this._onTimeChange);
  },

  componentWillUnmount: function() {
    TimeStore.removeChangeListener(this._onTimeChange);
  },

  render: function() {
    return (
      <div className="panel time-panel">
        <div className="panel-inner">

          <div className="sun" />

        </div>
      </div>
    );
  }

});

module.exports = TimePanel;
