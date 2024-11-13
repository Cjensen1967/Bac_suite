// Card management and display functionality

class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
        this.baccaratValue = getBaccaratValue(value);
    }

    // Get the image path for the card based on current style
    getImagePath(useAlternateStyle = false) {
        const suitName = getSuitName(this.suit);
        const displayValue = this.value === 10 ? 'T' : getDisplayValue(this.value);
        const baseDir = useAlternateStyle ? 'assets2' : 'assets';
        return `${baseDir}/${suitName}${displayValue}.png`;
    }
}

class CardManager {
    constructor() {
        this.useAlternateStyle = false;
        this.setupStyleToggle();
    }

    // Create a new random card
    createRandomCard() {
        return new Card(getRandomCardValue(), getRandomSuit());
    }

    // Display a card in a specified slot
    displayCard(card, slotId) {
        const slot = document.getElementById(slotId);
        if (!slot) return;

        // Clear existing content
        slot.innerHTML = '';

        // Create and add card image
        if (card) {
            const img = document.createElement('img');
            img.src = card.getImagePath(this.useAlternateStyle);
            img.alt = `${getDisplayValue(card.value)} of ${getSuitName(card.suit)}`;
            slot.appendChild(img);
        }
    }

    // Toggle between card styles
    toggleCardStyle() {
        this.useAlternateStyle = !this.useAlternateStyle;
        return this.useAlternateStyle;
    }

    // Set up style toggle button
    setupStyleToggle() {
        const toggleButton = document.querySelector('.style-toggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', () => {
                this.toggleCardStyle();
                document.dispatchEvent(new CustomEvent('cardStyleChanged'));
            });
        }
    }

    // Clear a card slot
    clearSlot(slotId) {
        const slot = document.getElementById(slotId);
        if (slot) {
            slot.innerHTML = '';
            if (slotId.includes('card-3')) {
                // Restore "Draw" text for third card slots
                const drawText = document.createElement('span');
                drawText.className = 'draw-text';
                drawText.textContent = 'Draw';
                slot.appendChild(drawText);
            }
        }
    }

    // Clear all card slots
    clearAllSlots() {
        const slots = [
            'player-card-1', 'player-card-2', 'player-card-3',
            'banker-card-1', 'banker-card-2', 'banker-card-3'
        ];
        slots.forEach(slotId => this.clearSlot(slotId));
    }

    // Get used card slots
    getUsedSlots(hand) {
        return hand.filter(card => card !== null).length;
    }

    // Generate a random card (no duplicate checking since baccarat uses multiple decks)
    generateUniqueCard(playerHand, bankerHand) {
        return this.createRandomCard();
    }

    // Refresh all displayed cards (useful after style toggle)
    refreshDisplayedCards(playerHand, bankerHand) {
        // Refresh player cards
        playerHand.forEach((card, index) => {
            if (card) {
                this.displayCard(card, `player-card-${index + 1}`);
            }
        });

        // Refresh banker cards
        bankerHand.forEach((card, index) => {
            if (card) {
                this.displayCard(card, `banker-card-${index + 1}`);
            }
        });
    }
}
