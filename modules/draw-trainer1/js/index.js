import GameUI from './ui.js';
import GameState from './state.js';
import GameEvents from './events.js';

// Initialize game components
const ui = new GameUI();
const state = new GameState();
const events = new GameEvents(ui, state);

// Start new game
events.dealNewHand();
