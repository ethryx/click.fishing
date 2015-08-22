var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var GameStore = assign({}, EventEmitter.prototype, {

  dispatcherIndex: AppDispatcher.register(function(payload) {
    return true; // No errors.
  })

});

module.exports = GameStore;
