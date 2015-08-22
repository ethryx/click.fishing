var React = require('react');

var FishingPanel = React.createClass({

  componentDidMount: function() {
    // Prevent dragging the image
    $('.pole').on('dragstart', function(event) { event.preventDefault(); });
  },

  handleMouseMove: function(reactEvent) {
    var pageX = reactEvent.nativeEvent.pageX;
    var pageY = reactEvent.nativeEvent.pageY;

    $('.pole').css({
      top: (pageY - 80) + 'px',
      left: (pageX - 80) + 'px'
    });
  },

  hideFishingPole: function() {
    $('.pole').css({
      top: '-800px',
      left: '-800px'
    });
  },

  render: function() {
    return (
      <div className="panel fishing-panel" onMouseMove={this.handleMouseMove} onMouseLeave={this.hideFishingPole}>
        <div className="panel-inner">

          <img src="images/pole.png" className="pole"></img>

        </div>
      </div>
    );
  }

});

module.exports = FishingPanel;
