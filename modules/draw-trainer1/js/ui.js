class GameUI {
    /** @type {number|null} */
    #feedbackTimeout = null;

    /**
     * Updates the display of all cards
     * @param {import('./types.js').HandState} handState - Current state of the hand
     */
    displayCards(handState) {
        // Reset all card slots
        for (let i = 1; i <= 3; i++) {
            const playerSlot = document.getElementById(`player-card-${i}`);
            const bankerSlot = document.getElementById(`banker-card-${i}`);
            if (playerSlot) {
                playerSlot.innerHTML = i === 3 && !handState.playerThirdCard ? '<span class="vertical-text">DRAW</span>' : '';
                playerSlot.classList.remove('active');
            }
            if (bankerSlot) {
                bankerSlot.innerHTML = i === 3 && !handState.bankerThirdCard ? '<span class="vertical-text">DRAW</span>' : '';
                bankerSlot.classList.remove('active');
            }
        }

        // Display initial cards
        handState.player.forEach((card, index) => {
            const slot = document.getElementById(`player-card-${index + 1}`);
            if (slot) {
                slot.innerHTML = `<img src="${card.img}" alt="${card.value} of ${card.suit}">`;
            }
        });

        handState.banker.forEach((card, index) => {
            const slot = document.getElementById(`banker-card-${index + 1}`);
            if (slot) {
                slot.innerHTML = `<img src="${card.img}" alt="${card.value} of ${card.suit}">`;
            }
        });

        // Display third cards if they exist
        if (handState.playerThirdCard) {
            const slot = document.getElementById('player-card-3');
            if (slot) {
                slot.innerHTML = `<img src="${handState.playerThirdCard.img}" 
                    alt="${handState.playerThirdCard.value} of ${handState.playerThirdCard.suit}">`;
            }
        }

        if (handState.bankerThirdCard) {
            const slot = document.getElementById('banker-card-3');
            if (slot) {
                slot.innerHTML = `<img src="${handState.bankerThirdCard.img}" 
                    alt="${handState.bankerThirdCard.value} of ${handState.bankerThirdCard.suit}">`;
            }
        }
    }

    /**
     * Updates the UI based on current game step
     * @param {import('./types.js').GameStep} currentStep 
     */
    updateUI(currentStep) {
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

        switch(currentStep) {
            case 'natural':
                if (playerWinBtn) playerWinBtn.classList.add('active');
                if (bankerWinBtn) bankerWinBtn.classList.add('active');
                if (tieBtn) tieBtn.classList.add('active');
                if (noNaturalBtn) noNaturalBtn.classList.add('active');
                break;
            case 'playerDraw':
                if (playerDrawBtn) playerDrawBtn.classList.add('active');
                if (playerStandBtn) playerStandBtn.classList.add('active');
                break;
            case 'bankerDraw':
                if (bankerDrawBtn) bankerDrawBtn.classList.add('active');
                if (bankerStandBtn) bankerStandBtn.classList.add('active');
                break;
            case 'final':
                if (playerWinBtn) playerWinBtn.classList.add('active');
                if (bankerWinBtn) bankerWinBtn.classList.add('active');
                if (tieBtn) tieBtn.classList.add('active');
                break;
        }
    }

    /**
     * Updates the game statistics display
     * @param {import('./types.js').GameStats} stats 
     */
    updateStats(stats) {
        ['correct', 'incorrect', 'hands', 'peeks'].forEach(stat => {
            const element = document.getElementById(`${stat}-count`);
            if (element) {
                element.textContent = stats[stat];
            }
        });
    }

    /**
     * Shows feedback message to the user
     * @param {boolean} isCorrect 
     * @param {string} message 
     * @param {Function} nextAction 
     */
    showFeedback(isCorrect, message, nextAction) {
        const prompt = document.getElementById('prompt');
        if (prompt) {
            prompt.textContent = message;
            prompt.className = `prompt ${isCorrect ? 'correct' : 'incorrect'}`;
            
            if (this.#feedbackTimeout) {
                clearTimeout(this.#feedbackTimeout);
            }
            
            this.#feedbackTimeout = setTimeout(() => {
                if (nextAction) {
                    nextAction();
                }
            }, 1500);
        }
    }

    /**
     * Updates the prompt message
     * @param {string} message 
     */
    updatePrompt(message) {
        const prompt = document.getElementById('prompt');
        if (prompt) {
            prompt.className = 'prompt';
            prompt.textContent = message;
        }
    }
}

export default GameUI;
