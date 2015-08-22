var React = require('react');

var TimePanel = React.createClass({

  getInitialState: function() {
    return {
      hour: 0,
      minute: 0,
      styles: {
        margin-top: 10px;
      }
    };
  },

  positionSunMoon: function() {
    var timePanelInnerWidth = $('.time-panel .panel-inner').width();
    var sunSize = $('.time-panel .panel-inner .sun').width();
    var sectionSize = Math.floor( timePanelInnerWidth / sunSize );

    console.log('sectionSize', sectionSize);

    // 0 - 29: Sun

    // 30 - 59: Moon

  },

  tick: function() {
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();

    this.setState({
      hour: hour,
      minute: minute
    });

    this.positionSunMoon();
  },

  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  render: function() {
    return (
      <div className="panel time-panel">
        <div className="panel-inner">

          <div className="sun"></div>

        </div>
      </div>
    );
  }

});

module.exports = TimePanel;