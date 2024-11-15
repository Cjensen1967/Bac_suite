// Main game logic and state management

class BaccaratGame {
    constructor() {
        this.cardManager = new CardManager();
        this.playerHand = [null, null, null];
        this.bankerHand = [null, null, null];
        this.gameState = 'initial';
        
        this.scores = {
            correct: parseInt(storage.load('correct')) || 0,
            wrong: parseInt(storage.load('wrong')) || 0,
            rulesPeeks: parseInt(storage.load('rulesPeeks')) || 0
        };

        this.setupEventListeners();
        this.updateScoreDisplay();
        this.startNewGame();
    }

    setupEventListeners() {
        // Decision buttons
        document.getElementById('player-win').addEventListener('click', () => this.handleDecision('player'));
        document.getElementById('banker-win').addEventListener('click', () => this.handleDecision('banker'));
        document.getElementById('tie').addEventListener('click', () => this.handleDecision('tie'));

        // Draw placeholders
        document.getElementById('player-card-3').addEventListener('click', () => this.handleDraw('player'));
        document.getElementById('banker-card-3').addEventListener('click', () => this.handleDraw('banker'));

        // Card style change event
        document.addEventListener('cardStyleChanged', () => {
            this.cardManager.refreshDisplayedCards(this.playerHand, this.bankerHand);
        });

        // Rules peek tracking
        const rulesDropdown = document.getElementById('rules-dropdown');
        rulesDropdown.addEventListener('toggle', (event) => {
            if (rulesDropdown.open) {
                this.scores.rulesPeeks++;
                storage.save('rulesPeeks', this.scores.rulesPeeks);
                this.updateScoreDisplay();
            }
        });

        // Reset scores button
        document.querySelector('.reset-scores').addEventListener('click', () => this.resetScores());

        // Back button
        document.querySelector('.back-button').addEventListener('click', () => {
            window.location.href = '../../index.html';
        });
    }

    resetScores() {
        this.scores = {
            correct: 0,
            wrong: 0,
            rulesPeeks: 0
        };
        
        // Clear scores from storage
        storage.clear('correct');
        storage.clear('wrong');
        storage.clear('rulesPeeks');
        
        this.updateScoreDisplay();
    }

    startNewGame() {
        // Reset state
        this.playerHand = [null, null, null];
        this.bankerHand = [null, null, null];
        this.gameState = 'initial';
        
        // Clear all card slots
        this.cardManager.clearAllSlots();
        // Hide feedback instead of showing empty message
        hideFeedback();

        // Auto-close rules dropdown
        const rulesDropdown = document.getElementById('rules-dropdown');
        rulesDropdown.open = false;

        // Deal initial cards
        this.dealInitialCards();

        // Enable all buttons for user decisions
        this.enableAllControls();
    }

    dealInitialCards() {
        // Deal two cards to each hand
        for (let i = 0; i < 2; i++) {
            this.playerHand[i] = this.cardManager.generateUniqueCard(this.playerHand, this.bankerHand);
            this.cardManager.displayCard(this.playerHand[i], `player-card-${i + 1}`);

            this.bankerHand[i] = this.cardManager.generateUniqueCard(this.playerHand, this.bankerHand);
            this.cardManager.displayCard(this.bankerHand[i], `banker-card-${i + 1}`);
        }
    }

    calculateInitialTotals() {
        const playerTotal = calculateTotal(this.playerHand.slice(0, 2));
        const bankerTotal = calculateTotal(this.bankerHand.slice(0, 2));
        return { playerTotal, bankerTotal };
    }

    calculateFinalTotals() {
        const playerTotal = calculateTotal(this.playerHand.filter(card => card !== null));
        const bankerTotal = calculateTotal(this.bankerHand.filter(card => card !== null));
        return { playerTotal, bankerTotal };
    }

    handleDraw(participant) {
        // Only check for naturals with initial two cards
        const { playerTotal, bankerTotal } = this.calculateInitialTotals();
        const playerHasNatural = isNatural(playerTotal);
        const bankerHasNatural = isNatural(bankerTotal);

        // If there's a natural, drawing is incorrect
        if (playerHasNatural || bankerHasNatural) {
            this.handleIncorrectAction("Natural 8 or 9 - no draws allowed");
            return;
        }

        if (participant === 'player') {
            // Check if Player should draw
            if (!shouldPlayerDraw(playerTotal)) {
                this.handleIncorrectAction("Player should stand");
                return;
            }
            if (this.playerHand[2]) {
                this.handleIncorrectAction("Player has already drawn");
                return;
            }
            // Handle Player draw
            this.playerHand[2] = this.cardManager.generateUniqueCard(this.playerHand, this.bankerHand);
            this.cardManager.displayCard(this.playerHand[2], 'player-card-3');
            this.gameState = 'bankerDraw';
        } else if (participant === 'banker') {
            if (!this.playerHand[2] && shouldPlayerDraw(playerTotal)) {
                this.handleIncorrectAction("Player must act first");
                return;
            }
            const playerThirdCard = this.playerHand[2] ? this.playerHand[2].value : undefined;
            if (!shouldBankerDraw(bankerTotal, playerThirdCard)) {
                this.handleIncorrectAction("Banker should stand");
                return;
            }
            if (this.bankerHand[2]) {
                this.handleIncorrectAction("Banker has already drawn");
                return;
            }
            // Handle Banker draw
            this.bankerHand[2] = this.cardManager.generateUniqueCard(this.playerHand, this.bankerHand);
            this.cardManager.displayCard(this.bankerHand[2], 'banker-card-3');
            this.gameState = 'final';
        }
    }

    handleDecision(decision) {
        // Check initial cards for naturals
        const initialTotals = this.calculateInitialTotals();
        const playerHasNatural = isNatural(initialTotals.playerTotal);
        const bankerHasNatural = isNatural(initialTotals.bankerTotal);

        // If no natural and Player should draw but hasn't
        if (!playerHasNatural && !bankerHasNatural && 
            shouldPlayerDraw(initialTotals.playerTotal) && !this.playerHand[2]) {
            this.handleIncorrectAction("Player must draw first");
            return;
        }

        // If Player has drawn and Banker should draw but hasn't
        if (this.playerHand[2] && 
            shouldBankerDraw(initialTotals.bankerTotal, this.playerHand[2].value) && 
            !this.bankerHand[2]) {
            this.handleIncorrectAction("Banker must draw first");
            return;
        }

        // Use final totals for winner determination
        const { playerTotal, bankerTotal } = this.calculateFinalTotals();
        let correctDecision;
        if (playerTotal > bankerTotal) {
            correctDecision = 'player';
        } else if (bankerTotal > playerTotal) {
            correctDecision = 'banker';
        } else {
            correctDecision = 'tie';
        }

        const isCorrect = decision === correctDecision;
        this.updateScore(isCorrect);

        if (isCorrect) {
            showFeedback('Correct!', true);
            // Only start new game after a correct answer
            setTimeout(() => this.startNewGame(), 2000);
        } else {
            showFeedback('Incorrect. The correct answer is ' + correctDecision, false);
            // Disable the incorrect button that was clicked
            document.getElementById(decision + '-win').disabled = true;
        }
    }

    handleIncorrectAction(message) {
        this.updateScore(false);
        showFeedback(message, false);
    }

    updateScore(isCorrect) {
        if (isCorrect) {
            this.scores.correct++;
        } else {
            this.scores.wrong++;
        }

        // Save scores to local storage
        storage.save('correct', this.scores.correct);
        storage.save('wrong', this.scores.wrong);

        this.updateScoreDisplay();
    }

    updateScoreDisplay() {
        updateScoreDisplay(this.scores.correct, this.scores.wrong, this.scores.rulesPeeks);
    }

    enableAllControls() {
        // Enable all buttons and draw placeholders
        setButtonsState([
            document.getElementById('player-win'),
            document.getElementById('banker-win'),
            document.getElementById('tie')
        ], true);

        const playerDraw = document.getElementById('player-card-3');
        const bankerDraw = document.getElementById('banker-card-3');
        playerDraw.style.pointerEvents = 'auto';
        bankerDraw.style.pointerEvents = 'auto';
    }
}

// Start the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new BaccaratGame();
});
