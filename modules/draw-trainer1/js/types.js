// Type definitions for Baccarat Trainer using JSDoc

/**
 * @typedef {Object} Card
 * @property {string} suit - The card's suit (hearts, diamonds, clubs, spades)
 * @property {string} value - The card's value (A,2,3,4,5,6,7,8,9,T,J,Q,K)
 * @property {string} img - Path to the card's image
 */

/**
 * @typedef {Object} HandState
 * @property {Card[]} player - Player's cards
 * @property {Card[]} banker - Banker's cards
 * @property {Card|null} playerThirdCard - Player's third card if drawn
 * @property {Card|null} bankerThirdCard - Banker's third card if drawn
 */

/**
 * @typedef {Object} GameStats
 * @property {number} correct - Number of correct decisions
 * @property {number} incorrect - Number of incorrect decisions
 * @property {number} hands - Number of hands played
 * @property {number} peeks - Number of times rules were checked
 */

/**
 * @typedef {'natural'|'playerDraw'|'bankerDraw'|'final'} GameStep
 */

// No exports needed - this file is only for JSDoc type definitions
