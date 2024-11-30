class GameState {
    /** @type {import('./types.js').GameStats} */
    #stats;
    
    /** @type {import('./types.js').HandState} */
    #currentHand;
    
    /** @type {import('./types.js').GameStep} */
    #currentStep;
    
    /** @type {string} */
    #currentCardSet;

    constructor() {
        this.#stats = this.#loadStats();
        this.#currentHand = this.#createEmptyHand();
        this.#currentStep = 'natural';
        this.#currentCardSet = 'assets';
    }

    /**
     * Loads stats from localStorage or creates new stats
     * @returns {import('./types.js').GameStats}
     */
    #loadStats() {
        const savedStats = localStorage.getItem('baccaratTrainerStats');
        return savedStats ? JSON.parse(savedStats) : {
            correct: 0,
            incorrect: 0,
            hands: 0,
            peeks: 0
        };
    }

    /**
     * Creates an empty hand state
     * @returns {import('./types.js').HandState}
     */
    #createEmptyHand() {
        return {
            player: [],
            banker: [],
            playerThirdCard: null,
            bankerThirdCard: null
        };
    }

    /**
     * Saves current stats to localStorage
     */
    saveStats() {
        localStorage.setItem('baccaratTrainerStats', JSON.stringify(this.#stats));
    }

    /**
     * Resets game statistics
     */
    resetStats() {
        this.#stats = {
            correct: 0,
            incorrect: 0,
            hands: 0,
            peeks: 0
        };
        this.saveStats();
    }

    /**
     * Updates game statistics
     * @param {'correct'|'incorrect'|'hands'|'peeks'} type - Type of stat to increment
     */
    incrementStat(type) {
        this.#stats[type]++;
        this.saveStats();
    }

    /**
     * Gets current game statistics
     * @returns {import('./types.js').GameStats}
     */
    getStats() {
        return { ...this.#stats };
    }

    /**
     * Gets current hand state
     * @returns {import('./types.js').HandState}
     */
    getCurrentHand() {
        return { ...this.#currentHand };
    }

    /**
     * Updates the current hand state
     * @param {import('./types.js').HandState} newHand 
     */
    setCurrentHand(newHand) {
        this.#currentHand = { ...newHand };
    }

    /**
     * Gets current game step
     * @returns {import('./types.js').GameStep}
     */
    getCurrentStep() {
        return this.#currentStep;
    }

    /**
     * Updates current game step
     * @param {import('./types.js').GameStep} step 
     */
    setCurrentStep(step) {
        this.#currentStep = step;
    }

    /**
     * Gets current card set
     * @returns {string}
     */
    getCurrentCardSet() {
        return this.#currentCardSet;
    }

    /**
     * Updates current card set
     * @param {string} cardSet 
     */
    setCurrentCardSet(cardSet) {
        this.#currentCardSet = cardSet;
    }
}

export default GameState;
