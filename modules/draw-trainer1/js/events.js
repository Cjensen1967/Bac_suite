import BaccaratCore from './core.js';
import GameUI from './ui.js';
import GameState from './state.js';

class GameEvents {
    /** @type {GameUI} */
    #ui;
    /** @type {GameState} */
    #state;
    /** @type {string[]} */
    #cardSets = ['assets', 'assets2', 'assets3'];

    /**
     * @param {GameUI} ui 
     * @param {GameState} state 
     */
    constructor(ui, state) {
        this.#ui = ui;
        this.#state = state;
        this.initializeButtons();
        this.initializeHelpSections();
        this.initializeKeyboardEvents();
    }

    /**
     * Updates both cards and UI state
     */
    #updateDisplay() {
        this.#ui.displayCards(this.#state.getCurrentHand());
        this.#ui.updateUI(this.#state.getCurrentStep());
    }

    /**
     * Initializes all button click handlers
     */
    initializeButtons() {
        // Initialize decision buttons
        const tieBtn = document.getElementById('tie-action');
        const noNaturalBtn = document.getElementById('no-natural-action');
        const playerWinBtn = document.getElementById('player-win');
        const bankerWinBtn = document.getElementById('banker-win');

        if (tieBtn) tieBtn.onclick = () => this.handleButtonClick('tie');
        if (noNaturalBtn) noNaturalBtn.onclick = () => this.handleButtonClick('none');
        if (playerWinBtn) playerWinBtn.onclick = () => this.handleButtonClick('player');
        if (bankerWinBtn) bankerWinBtn.onclick = () => this.handleButtonClick('banker');

        // Initialize draw/stand buttons
        const playerDrawBtn = document.getElementById('player-card-3');
        const bankerDrawBtn = document.getElementById('banker-card-3');
        const playerStandBtn = document.getElementById('player-stand');
        const bankerStandBtn = document.getElementById('banker-stand');

        if (playerDrawBtn) playerDrawBtn.onclick = () => this.checkPlayerDraw(true);
        if (bankerDrawBtn) bankerDrawBtn.onclick = () => this.checkBankerDraw(true);
        if (playerStandBtn) playerStandBtn.onclick = () => this.checkPlayerDraw(false);
        if (bankerStandBtn) bankerStandBtn.onclick = () => this.checkBankerDraw(false);

        // Initialize other buttons
        const toggleBtn = document.getElementById('toggle-card-style');
        if (toggleBtn) {
            toggleBtn.onclick = () => this.switchCardSet();
        }

        const resetBtn = document.getElementById('reset-scores');
        if (resetBtn) {
            resetBtn.onclick = () => {
                this.#state.resetStats();
                this.#ui.updateStats(this.#state.getStats());
            };
        }
    }

    /**
     * Initializes help section event handlers
     */
    initializeHelpSections() {
        // Add tooltips for mobile view
        const rulesButton = document.querySelector('#rules-section summary');
        const instructionsButton = document.querySelector('#instructions-section summary');

        if (rulesButton) {
            rulesButton.setAttribute('title', 'Drawing Rules');
        }
        if (instructionsButton) {
            instructionsButton.setAttribute('title', 'How to Use');
        }

        const rulesSection = document.getElementById('rules-section');
        if (rulesSection) {
            rulesSection.removeAttribute('open');
            rulesSection.addEventListener('toggle', (event) => {
                if (rulesSection.open) {
                    this.#state.incrementStat('peeks');
                    this.#ui.updateStats(this.#state.getStats());
                }
            });
        }

        const instructionsSection = document.getElementById('instructions-section');
        if (instructionsSection) {
            instructionsSection.removeAttribute('open');
        }
    }

    /**
     * Initializes keyboard event handlers
     */
    initializeKeyboardEvents() {
        document.addEventListener('keydown', (event) => {
            if (event.key.toLowerCase() === 's') {
                this.switchCardSet();
            }
        });
    }

    /**
     * Handles button clicks based on current game step
     * @param {'tie'|'none'|'player'|'banker'} choice 
     */
    handleButtonClick(choice) {
        const currentStep = this.#state.getCurrentStep();
        if (currentStep === 'natural') {
            this.checkNatural(choice);
        } else if (currentStep === 'final') {
            this.checkFinalOutcome(choice);
        }
    }

    /**
     * Switches to the next card set
     */
    switchCardSet() {
        const currentSet = this.#state.getCurrentCardSet();
        const currentIndex = this.#cardSets.indexOf(currentSet);
        const nextIndex = (currentIndex + 1) % this.#cardSets.length;
        this.#state.setCurrentCardSet(this.#cardSets[nextIndex]);
        this.updateCardImages();
    }

    /**
     * Updates card images when switching card sets
     */
    updateCardImages() {
        const currentHand = this.#state.getCurrentHand();
        const cardSet = this.#state.getCurrentCardSet();

        const updateCardPath = (card) => {
            if (card) {
                return { ...card, img: `${cardSet}/${card.suit}${card.value}.png` };
            }
            return card;
        };

        const updatedHand = {
            player: currentHand.player.map(updateCardPath),
            banker: currentHand.banker.map(updateCardPath),
            playerThirdCard: updateCardPath(currentHand.playerThirdCard),
            bankerThirdCard: updateCardPath(currentHand.bankerThirdCard)
        };

        this.#state.setCurrentHand(updatedHand);
        this.#updateDisplay();
    }

    /**
     * Checks natural win conditions
     * @param {'tie'|'none'|'player'|'banker'} choice 
     */
    checkNatural(choice) {
        const currentHand = this.#state.getCurrentHand();
        const playerValue = BaccaratCore.calculateHandValue(currentHand.player);
        const bankerValue = BaccaratCore.calculateHandValue(currentHand.banker);
        const isNatural = playerValue >= 8 || bankerValue >= 8;
        let correctAnswer = 'none';

        if (isNatural) {
            if (playerValue === bankerValue) correctAnswer = 'tie';
            else if (playerValue > bankerValue) correctAnswer = 'player';
            else correctAnswer = 'banker';
        }

        if (choice === correctAnswer) {
            this.#ui.showFeedback(true, "Correct!", () => {
                if (isNatural) {
                    this.#state.incrementStat('hands');
                    this.dealNewHand();
                } else {
                    this.#state.setCurrentStep('playerDraw');
                    this.#ui.updatePrompt("Should Player draw a third card?");
                    this.#updateDisplay();
                }
            });
            this.#state.incrementStat('correct');
        } else {
            this.#ui.showFeedback(false, "Incorrect. Try again!", () => {
                this.#ui.updatePrompt("Is there a natural win?");
            });
            this.#state.incrementStat('incorrect');
        }
        this.#ui.updateStats(this.#state.getStats());
    }

    /**
     * Checks if player should draw a third card
     * @param {boolean} shouldDraw 
     */
    checkPlayerDraw(shouldDraw) {
        const currentHand = this.#state.getCurrentHand();
        const correctDraw = BaccaratCore.shouldPlayerDraw(currentHand.player);

        if (shouldDraw === correctDraw) {
            this.#ui.showFeedback(true, "Correct!", () => {
                if (shouldDraw) {
                    const cardSet = this.#state.getCurrentCardSet();
                    const thirdCard = BaccaratCore.drawRandomCard(cardSet);
                    this.#state.setCurrentHand({
                        ...currentHand,
                        playerThirdCard: thirdCard
                    });
                }
                this.#state.setCurrentStep('bankerDraw');
                this.#ui.updatePrompt("Should Banker draw a third card?");
                this.#updateDisplay();
            });
            this.#state.incrementStat('correct');
        } else {
            this.#ui.showFeedback(false, "Incorrect. Remember: Player draws on 0-5, stands on 6-7", () => {
                this.#ui.updatePrompt("Should Player draw a third card?");
            });
            this.#state.incrementStat('incorrect');
        }
        this.#ui.updateStats(this.#state.getStats());
    }

    /**
     * Checks if banker should draw a third card
     * @param {boolean} shouldDraw 
     */
    checkBankerDraw(shouldDraw) {
        const currentHand = this.#state.getCurrentHand();
        const correctDraw = BaccaratCore.shouldBankerDraw(currentHand.banker, currentHand.playerThirdCard);

        if (shouldDraw === correctDraw) {
            this.#ui.showFeedback(true, "Correct!", () => {
                if (shouldDraw) {
                    const cardSet = this.#state.getCurrentCardSet();
                    const thirdCard = BaccaratCore.drawRandomCard(cardSet);
                    this.#state.setCurrentHand({
                        ...currentHand,
                        bankerThirdCard: thirdCard
                    });
                }
                this.#state.setCurrentStep('final');
                this.#ui.updatePrompt("What is the final outcome?");
                this.#updateDisplay();
            });
            this.#state.incrementStat('correct');
        } else {
            this.#ui.showFeedback(false, "Incorrect. Check the Banker drawing rules.", () => {
                this.#ui.updatePrompt("Should Banker draw a third card?");
            });
            this.#state.incrementStat('incorrect');
        }
        this.#ui.updateStats(this.#state.getStats());
    }

    /**
     * Checks final outcome of the hand
     * @param {'player'|'banker'|'tie'} choice 
     */
    checkFinalOutcome(choice) {
        const currentHand = this.#state.getCurrentHand();
        const correctOutcome = BaccaratCore.determineWinner(currentHand);
        const playerFinal = BaccaratCore.calculateFinalValue(currentHand, 'player');
        const bankerFinal = BaccaratCore.calculateFinalValue(currentHand, 'banker');

        if (choice === correctOutcome) {
            this.#ui.showFeedback(true, `Correct! Final scores - Player: ${playerFinal}, Banker: ${bankerFinal}`, () => {
                this.#state.incrementStat('hands');
                this.dealNewHand();
            });
            this.#state.incrementStat('correct');
        } else {
            this.#ui.showFeedback(false, "Incorrect. Try again!", () => {
                this.#ui.updatePrompt("What is the final outcome?");
            });
            this.#state.incrementStat('incorrect');
        }
        this.#ui.updateStats(this.#state.getStats());
    }

    /**
     * Deals a new hand
     */
    dealNewHand() {
        // Close help sections when dealing new hand
        const rulesSection = document.getElementById('rules-section');
        const instructionsSection = document.getElementById('instructions-section');
        if (rulesSection) rulesSection.removeAttribute('open');
        if (instructionsSection) instructionsSection.removeAttribute('open');

        const cardSet = this.#state.getCurrentCardSet();
        const newHand = {
            player: [BaccaratCore.drawRandomCard(cardSet), BaccaratCore.drawRandomCard(cardSet)],
            banker: [BaccaratCore.drawRandomCard(cardSet), BaccaratCore.drawRandomCard(cardSet)],
            playerThirdCard: null,
            bankerThirdCard: null
        };

        this.#state.setCurrentHand(newHand);
        this.#state.setCurrentStep('natural');
        this.#ui.updateStats(this.#state.getStats());
        this.#ui.updatePrompt("Is there a natural win?");
        this.#updateDisplay();
    }
}

export default GameEvents;
