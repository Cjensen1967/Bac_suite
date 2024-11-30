class BaccaratCore {
    /**
     * Draws a random card from the deck
     * @param {string} cardSet - The current card set being used (assets, assets2, assets3)
     * @returns {import('./types.js').Card}
     */
    static drawRandomCard(cardSet) {
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];
        const suit = suits[Math.floor(Math.random() * suits.length)];
        const value = values[Math.floor(Math.random() * values.length)];
        return { suit, value, img: `/${cardSet}/${suit}${value}.png` };
    }

    /**
     * Calculates the value of a hand
     * @param {import('./types.js').Card[]} hand - Array of cards in the hand
     * @returns {number} - The calculated hand value (0-9)
     */
    static calculateHandValue(hand) {
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

    /**
     * Checks if a hand has a natural win (8 or 9)
     * @param {import('./types.js').Card[]} hand - Array of cards in the hand
     * @returns {boolean}
     */
    static hasNatural(hand) {
        const value = this.calculateHandValue(hand);
        return value >= 8;
    }

    /**
     * Determines if player should draw based on initial hand
     * @param {import('./types.js').Card[]} playerHand - Player's initial two cards
     * @returns {boolean}
     */
    static shouldPlayerDraw(playerHand) {
        const value = this.calculateHandValue(playerHand);
        return value <= 5;
    }

    /**
     * Determines if banker should draw based on their hand and player's third card
     * @param {import('./types.js').Card[]} bankerHand - Banker's initial two cards
     * @param {import('./types.js').Card|null} playerThirdCard - Player's third card if drawn
     * @returns {boolean}
     */
    static shouldBankerDraw(bankerHand, playerThirdCard) {
        const bankerValue = this.calculateHandValue(bankerHand);

        if (playerThirdCard === null) {
            return bankerValue <= 5;
        }

        const pValue = playerThirdCard.value;
        const playerThirdValue = pValue === 'T' || pValue === 'J' || 
                                pValue === 'Q' || pValue === 'K' ? 0 : 
                                pValue === 'A' ? 1 : parseInt(pValue);

        if (bankerValue <= 2) return true;
        if (bankerValue === 3 && playerThirdValue !== 8) return true;
        if (bankerValue === 4 && (playerThirdValue >= 2 && playerThirdValue <= 7)) return true;
        if (bankerValue === 5 && (playerThirdValue >= 4 && playerThirdValue <= 7)) return true;
        if (bankerValue === 6 && (playerThirdValue === 6 || playerThirdValue === 7)) return true;
        
        return false;
    }

    /**
     * Determines the winner of a hand
     * @param {import('./types.js').HandState} handState - Current state of the hand
     * @returns {'player'|'banker'|'tie'} - The winner
     */
    static determineWinner(handState) {
        const playerFinal = this.calculateFinalValue(handState, 'player');
        const bankerFinal = this.calculateFinalValue(handState, 'banker');

        if (playerFinal === bankerFinal) return 'tie';
        return playerFinal > bankerFinal ? 'player' : 'banker';
    }

    /**
     * Calculates the final value for a side including third card if present
     * @param {import('./types.js').HandState} handState - Current state of the hand
     * @param {'player'|'banker'} side - Which side to calculate for
     * @returns {number} - The final hand value (0-9)
     */
    static calculateFinalValue(handState, side) {
        const hand = [...handState[side]];
        if (handState[side + 'ThirdCard']) {
            hand.push(handState[side + 'ThirdCard']);
        }
        return this.calculateHandValue(hand);
    }
}

export default BaccaratCore;
