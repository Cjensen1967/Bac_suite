class BaccaratTrainer {
    constructor() {
        this.stats = this.loadStats();
        this.currentHand = {
            player: [],
            banker: [],
            playerThirdCard: null,
            bankerThirdCard: null
        };
        this.currentStep = 'natural';
        this.currentCardSet = 'assets';
        this.initializeButtons();
        this.initializeRulesSections();
        this.dealNewHand(false);
    }

    loadStats() {
        const savedStats = localStorage.getItem('baccaratTrainerStats');
        return savedStats ? JSON.parse(savedStats) : {
            correct: 0,
            incorrect: 0,
            hands: 0,
            peeks: 0
        };
    }

    saveStats() {
        localStorage.setItem('baccaratTrainerStats', JSON.stringify(this.stats));
    }

    resetStats() {
        this.stats = {
            correct: 0,
            incorrect: 0,
            hands: 0,
            peeks: 0
        };
        this.saveStats();
        this.updateStats();
    }

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
            resetBtn.onclick = () => this.resetStats();
        }
    }

    initializeRulesSections() {
        const rulesSection = document.getElementById('rules-section');
        if (rulesSection) {
            rulesSection.removeAttribute('open');
            rulesSection.addEventListener('toggle', (event) => {
                if (rulesSection.open) {
                    this.stats.peeks++;
                    this.updateStats();
                    this.saveStats();
                }
            });
        }

        const instructionsSection = document.getElementById('instructions-section');
        if (instructionsSection) {
            instructionsSection.removeAttribute('open');
        }
    }

    handleButtonClick(choice) {
        if (this.currentStep === 'natural') {
            this.checkNatural(choice);
        } else if (this.currentStep === 'final') {
            this.checkFinalOutcome(choice);
        }
    }

    switchCardSet() {
        this.currentCardSet = this.currentCardSet === 'assets' ? 'assets2' : 'assets';
        this.updateCardImages();
    }

    updateCardImages() {
        const updateCardPath = (card) => {
            if (card) {
                card.img = `${this.currentCardSet}/${card.suit}${card.value}.png`;
            }
            return card;
        };

        this.currentHand.player = this.currentHand.player.map(updateCardPath);
        this.currentHand.banker = this.currentHand.banker.map(updateCardPath);
        if (this.currentHand.playerThirdCard) {
            this.currentHand.playerThirdCard = updateCardPath(this.currentHand.playerThirdCard);
        }
        if (this.currentHand.bankerThirdCard) {
            this.currentHand.bankerThirdCard = updateCardPath(this.currentHand.bankerThirdCard);
        }

        this.displayCards();
    }

    dealNewHand() {
        const rulesSection = document.getElementById('rules-section');
        if (rulesSection) {
            rulesSection.removeAttribute('open');
        }

        this.currentHand = {
            player: [this.drawRandomCard(), this.drawRandomCard()],
            banker: [this.drawRandomCard(), this.drawRandomCard()],
            playerThirdCard: null,
            bankerThirdCard: null
        };
        this.currentStep = 'natural';
        this.updateStats();
        this.displayCards();
        this.showNaturalDecision();
    }

    drawRandomCard() {
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];
        const suit = suits[Math.floor(Math.random() * suits.length)];
        const value = values[Math.floor(Math.random() * values.length)];
        return { suit, value, img: `${this.currentCardSet}/${suit}${value}.png` };
    }

    displayCards() {
        // Reset all card slots
        for (let i = 1; i <= 3; i++) {
            const playerSlot = document.getElementById(`player-card-${i}`);
            const bankerSlot = document.getElementById(`banker-card-${i}`);
            if (playerSlot) {
                playerSlot.innerHTML = i === 3 && !this.currentHand.playerThirdCard ? '<span class="vertical-text">DRAW</span>' : '';
                playerSlot.classList.remove('active');
            }
            if (bankerSlot) {
                bankerSlot.innerHTML = i === 3 && !this.currentHand.bankerThirdCard ? '<span class="vertical-text">DRAW</span>' : '';
                bankerSlot.classList.remove('active');
            }
        }

        // Display initial cards
        this.currentHand.player.forEach((card, index) => {
            const slot = document.getElementById(`player-card-${index + 1}`);
            if (slot) {
                slot.innerHTML = `<img src="${card.img}" alt="${card.value} of ${card.suit}">`;
            }
        });

        this.currentHand.banker.forEach((card, index) => {
            const slot = document.getElementById(`banker-card-${index + 1}`);
            if (slot) {
                slot.innerHTML = `<img src="${card.img}" alt="${card.value} of ${card.suit}">`;
            }
        });

        // Display third cards if they exist
        if (this.currentHand.playerThirdCard) {
            const slot = document.getElementById('player-card-3');
            if (slot) {
                slot.innerHTML = `<img src="${this.currentHand.playerThirdCard.img}" alt="${this.currentHand.playerThirdCard.value} of ${this.currentHand.playerThirdCard.suit}">`;
            }
        }

        if (this.currentHand.bankerThirdCard) {
            const slot = document.getElementById('banker-card-3');
            if (slot) {
                slot.innerHTML = `<img src="${this.currentHand.bankerThirdCard.img}" alt="${this.currentHand.bankerThirdCard.value} of ${this.currentHand.bankerThirdCard.suit}">`;
            }
        }

        // Update UI based on current step
        this.updateUI();
    }

    updateUI() {
        const playerWinBtn = document.getElementById('player-win');
        const bankerWinBtn = document.getElementById('banker-win');
        const tieBtn = document.getElementById('tie-action');
        const noNaturalBtn = document.getElementById('no-natural-action');
        const playerDrawBtn = document.getElementById('player-card-3');
        const bankerDrawBtn = document.getElementById('banker-card-3');
        const playerStandBtn = document.getElementById('player-stand');
        const bankerStandBtn = document.getElementById('banker-stand');

        // Reset all buttons
        [playerWinBtn, bankerWinBtn, tieBtn, noNaturalBtn].forEach(btn => {
            if (btn) btn.classList.remove('active');
        });

        [playerDrawBtn, bankerDrawBtn].forEach(btn => {
            if (btn) btn.classList.remove('active');
        });

        [playerStandBtn, bankerStandBtn].forEach(btn => {
            if (btn) btn.classList.remove('active');
        });

        switch(this.currentStep) {
            case 'natural':
                if (playerWinBtn) playerWinBtn.classList.add('active');
                if (bankerWinBtn) bankerWinBtn.classList.add('active');
                if (tieBtn) tieBtn.classList.add('active');
                if (noNaturalBtn) noNaturalBtn.classList.add('active');
                break;
            case 'playerDraw':
                if (!this.currentHand.playerThirdCard) {
                    if (playerDrawBtn) playerDrawBtn.classList.add('active');
                    if (playerStandBtn) playerStandBtn.classList.add('active');
                }
                break;
            case 'bankerDraw':
                if (!this.currentHand.bankerThirdCard) {
                    if (bankerDrawBtn) bankerDrawBtn.classList.add('active');
                    if (bankerStandBtn) bankerStandBtn.classList.add('active');
                }
                break;
            case 'final':
                if (playerWinBtn) playerWinBtn.classList.add('active');
                if (bankerWinBtn) bankerWinBtn.classList.add('active');
                if (tieBtn) tieBtn.classList.add('active');
                break;
        }
    }

    calculateHandValue(hand) {
        return hand.reduce((total, card) => {
            let value = card.value;
            if (value === 'T' || value === 'J' || value === 'Q' || value === 'K') {
                return total + 0;
            } else if (value === 'A') {
                return total + 1;
            } else {
                return total + parseInt(value);
            }
        }, 0) % 10;
    }

    showNaturalDecision() {
        const prompt = document.getElementById('prompt');
        if (prompt) {
            prompt.className = 'prompt';
            prompt.textContent = "Is there a natural win?";
        }
        this.updateUI();
    }

    checkNatural(choice) {
        const playerValue = this.calculateHandValue(this.currentHand.player);
        const bankerValue = this.calculateHandValue(this.currentHand.banker);
        const isNatural = playerValue >= 8 || bankerValue >= 8;
        let correctAnswer = 'none';

        if (isNatural) {
            if (playerValue === bankerValue) correctAnswer = 'tie';
            else if (playerValue > bankerValue) correctAnswer = 'player';
            else correctAnswer = 'banker';
        }

        if (choice === correctAnswer) {
            this.showFeedback(true, "Correct!", () => {
                if (isNatural) {
                    this.stats.hands++;
                    this.dealNewHand();
                } else {
                    this.currentStep = 'playerDraw';
                    this.showPlayerDrawDecision();
                }
            });
            this.stats.correct++;
        } else {
            this.showFeedback(false, "Incorrect. Try again!", () => {
                this.showNaturalDecision();
            });
            this.stats.incorrect++;
        }
        this.updateStats();
        this.saveStats();
    }

    showPlayerDrawDecision() {
        const prompt = document.getElementById('prompt');
        if (prompt) {
            prompt.className = 'prompt';
            prompt.textContent = "Should Player draw a third card?";
        }
        this.updateUI();
    }

    checkPlayerDraw(shouldDraw) {
        const playerValue = this.calculateHandValue(this.currentHand.player);
        const correctDraw = playerValue <= 5;

        if (shouldDraw === correctDraw) {
            this.showFeedback(true, "Correct!", () => {
                if (shouldDraw) {
                    this.currentHand.playerThirdCard = this.drawRandomCard();
                    this.displayCards();
                }
                this.currentStep = 'bankerDraw';
                this.showBankerDrawDecision();
            });
            this.stats.correct++;
        } else {
            this.showFeedback(false, "Incorrect. Remember: Player draws on 0-5, stands on 6-7", () => {
                this.showPlayerDrawDecision();
            });
            this.stats.incorrect++;
        }
        this.updateStats();
        this.saveStats();
    }

    showBankerDrawDecision() {
        const prompt = document.getElementById('prompt');
        if (prompt) {
            prompt.className = 'prompt';
            prompt.textContent = "Should Banker draw a third card?";
        }
        this.updateUI();
    }

    checkBankerDraw(shouldDraw) {
        const bankerValue = this.calculateHandValue(this.currentHand.banker);
        let correctDraw = false;

        if (this.currentHand.playerThirdCard === null) {
            correctDraw = bankerValue <= 5;
        } else {
            const playerThirdValue = this.currentHand.playerThirdCard.value;
            const pValue = playerThirdValue === 'T' || playerThirdValue === 'J' || 
                          playerThirdValue === 'Q' || playerThirdValue === 'K' ? 0 : 
                          playerThirdValue === 'A' ? 1 : parseInt(playerThirdValue);

            if (bankerValue <= 2) correctDraw = true;
            else if (bankerValue === 3 && pValue !== 8) correctDraw = true;
            else if (bankerValue === 4 && (pValue >= 2 && pValue <= 7)) correctDraw = true;
            else if (bankerValue === 5 && (pValue >= 4 && pValue <= 7)) correctDraw = true;
            else if (bankerValue === 6 && (pValue === 6 || pValue === 7)) correctDraw = true;
        }

        if (shouldDraw === correctDraw) {
            this.showFeedback(true, "Correct!", () => {
                if (shouldDraw) {
                    this.currentHand.bankerThirdCard = this.drawRandomCard();
                    this.displayCards();
                }
                this.currentStep = 'final';
                this.showFinalDecision();
            });
            this.stats.correct++;
        } else {
            this.showFeedback(false, "Incorrect. Check the Banker drawing rules.", () => {
                this.showBankerDrawDecision();
            });
            this.stats.incorrect++;
        }
        this.updateStats();
        this.saveStats();
    }

    showFinalDecision() {
        const prompt = document.getElementById('prompt');
        if (prompt) {
            prompt.className = 'prompt';
            prompt.textContent = "What is the final outcome?";
        }
        this.updateUI();
    }

    checkFinalOutcome(choice) {
        const playerFinal = this.calculateFinalValue('player');
        const bankerFinal = this.calculateFinalValue('banker');
        let correctOutcome;

        if (playerFinal === bankerFinal) correctOutcome = 'tie';
        else if (playerFinal > bankerFinal) correctOutcome = 'player';
        else correctOutcome = 'banker';

        if (choice === correctOutcome) {
            this.showFeedback(true, `Correct! Final scores - Player: ${playerFinal}, Banker: ${bankerFinal}`, () => {
                this.stats.hands++;
                this.dealNewHand();
            });
            this.stats.correct++;
        } else {
            this.showFeedback(false, "Incorrect. Try again!", () => {
                this.showFinalDecision();
            });
            this.stats.incorrect++;
        }
        this.updateStats();
        this.saveStats();
    }

    calculateFinalValue(side) {
        const hand = [...this.currentHand[side]];
        if (this.currentHand[side + 'ThirdCard']) {
            hand.push(this.currentHand[side + 'ThirdCard']);
        }
        return this.calculateHandValue(hand);
    }

    showFeedback(isCorrect, message, nextAction) {
        const prompt = document.getElementById('prompt');
        if (prompt) {
            prompt.textContent = message;
            prompt.className = `prompt ${isCorrect ? 'correct' : 'incorrect'}`;
            
            if (this.feedbackTimeout) {
                clearTimeout(this.feedbackTimeout);
            }
            
            this.feedbackTimeout = setTimeout(() => {
                if (nextAction) {
                    nextAction();
                }
            }, 1500);
        }
    }

    updateStats() {
        ['correct', 'incorrect', 'hands', 'peeks'].forEach(stat => {
            const element = document.getElementById(`${stat}-count`);
            if (element) {
                element.textContent = this.stats[stat];
            }
        });
    }
}

// Initialize the game
const game = new BaccaratTrainer();

// Add keyboard shortcut to switch card sets (press 's')
document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 's') {
        game.switchCardSet();
    }
});
