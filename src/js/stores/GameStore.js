var AppDispatcher = require('../dispatcher/AppDispatcher');
var GameConstants = require('../constants/GameConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var savedData = {
  fish: []
};

// Load data from cache?
if(window.localStorage.gameData) {
  console.log('Data loaded from browser cache.');
  savedData = JSON.parse(window.localStorage.gameData);
}

var GameStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getTotalFish: function() {
    return savedData.fish.length;
  },

  saveToBrowser: function() {
    window.localStorage.gameData = JSON.stringify(savedData);
  },

  captureFish: function() {
    savedData.fish.push({
      type: GameConstants.FISH_TYPES.STANDARD
    });

    console.log('Got a fish!');
    
    this.saveToBrowser();
    this.emitChange();
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
      case GameConstants.GAME_CLICK_FISH:
        GameStore.captureFish();
        break;
    }

    return true; // No errors.
  })

});

module.exports = GameStore;
