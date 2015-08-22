var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _currentMinute = 0;
var _currentSecond = 0;
var _isDay = true;

function setVars() {
  var now = new Date();

  _currentMinute = now.getMinutes();
  _currentSecond = now.getSeconds();
  _isDay = ((_currentMinute < 30) ? true: false);
}

setInterval(setVars, 1000);
setVars();

var TimeStore = assign({}, EventEmitter.prototype, {

  getMinute: function() {
    return _currentMinute;
  },

  getIsDay: function() {
    return _isDay;
  },

  getSecond: function() {
    return _currentSecond;
  },
  
  dispatcherIndex: AppDispatcher.register(function(payload) {
    return true; // No errors.
  })

});

module.exports = TimeStore;
