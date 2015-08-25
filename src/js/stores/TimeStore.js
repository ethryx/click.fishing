var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _currentMinute = 0;
var _currentSecond = 0;
var _isDay = true;

var TimeStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getMinute: function() {
    return _currentMinute;
  },

  getIsDay: function() {
    return _isDay;
  },

  getSecond: function() {
    return _currentSecond;
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    return true; // No errors.
  })

});

function updateVars() {
  var now = new Date();

  _currentMinute = now.getMinutes();
  _currentSecond = now.getSeconds();
  _isDay = ((_currentMinute < 30) ? true: false);

  TimeStore.emitChange();
}

setInterval(updateVars, 1000);
updateVars();

module.exports = TimeStore;
