var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var GameConstants = require('../constants/GameConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var text = [];

var TextStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addText: function(newText) {
    text.push(newText);
    this.emitChange();
  },

  getText: function() {
    return text;
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
      case GameConstants.GAME_ADD_TEXT:
        TextStore.addText(action.text);
        break;
    }

    return true; // No errors.
  })

});

module.exports = TextStore;
