// Utility functions for the Baccarat Trainer

// Calculate Baccarat hand total (returns rightmost digit of sum)
function calculateTotal(cards) {
    const sum = cards.reduce((total, card) => total + card.baccaratValue, 0);
    return sum % 10;
}

// Convert card value to Baccarat value
function getBaccaratValue(cardValue) {
    if (cardValue >= 10) return 0; // 10, J, Q, K are worth 0
    return cardValue;
}

// Get random card value (1-13)
function getRandomCardValue() {
    return Math.floor(Math.random() * 13) + 1;
}

// Get random suit (0-3: hearts, diamonds, clubs, spades)
function getRandomSuit() {
    return Math.floor(Math.random() * 4);
}

// Convert card value to display value (A, 2-10, J, Q, K)
function getDisplayValue(value) {
    switch (value) {
        case 1: return 'A';
        case 11: return 'J';
        case 12: return 'Q';
        case 13: return 'K';
        default: return value.toString();
    }
}

// Convert suit number to name
function getSuitName(suitNumber) {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    return suits[suitNumber];
}

// Format percentage for display
function formatPercentage(correct, total) {
    if (total === 0) return '0%';
    return Math.round((correct / total) * 100) + '%';
}

// Local storage functions for persistence
const storage = {
    save: function(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    
    load: function(key, defaultValue = null) {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
    },
    
    clear: function(key) {
        localStorage.removeItem(key);
    }
};

// Update score display
function updateScoreDisplay(correct, wrong, rulesPeeks) {
    document.getElementById('correct-count').textContent = correct;
    document.getElementById('wrong-count').textContent = wrong;
    document.getElementById('success-rate').textContent = formatPercentage(correct, correct + wrong);
    document.getElementById('rules-peek-count').textContent = rulesPeeks;
}

let feedbackTimeout;

// Show feedback message with optional styling
function showFeedback(message, isCorrect = null) {
    if (!message) return; // Don't show feedback if message is empty
    
    const feedback = document.getElementById('feedback');
    feedback.textContent = message;
    feedback.className = 'feedback';
    
    if (isCorrect !== null) {
        feedback.classList.add(isCorrect ? 'correct' : 'incorrect');
    }

    // Clear any existing timeout
    if (feedbackTimeout) {
        clearTimeout(feedbackTimeout);
    }

    // Show feedback
    feedback.classList.add('visible');

    // Hide feedback after 2 seconds
    feedbackTimeout = setTimeout(() => {
        hideFeedback();
    }, 2000);
}

// Hide feedback
function hideFeedback() {
    const feedback = document.getElementById('feedback');
    feedback.classList.remove('visible');
    feedback.textContent = '';
}

// Enable/disable buttons
function setButtonsState(buttons, enabled) {
    buttons.forEach(button => {
        button.disabled = !enabled;
    });
}

// Check if a hand is a natural (8 or 9)
function isNatural(total) {
    return total === 8 || total === 9;
}

// Determine if Player should draw based on initial total
function shouldPlayerDraw(playerTotal) {
    return playerTotal >= 0 && playerTotal <= 5;
}

// Determine if Banker should draw based on their total and Player's third card
function shouldBankerDraw(bankerTotal, playerThirdCard) {
    if (bankerTotal >= 7) return false;
    if (bankerTotal <= 2) return true;
    
    if (playerThirdCard === undefined) {
        return bankerTotal <= 5;
    }

    const drawTable = {
        3: [0, 1, 2, 3, 4, 5, 6, 7, 9], // Draw on 0-7, 9
        4: [2, 3, 4, 5, 6, 7], // Draw on 2-7
        5: [4, 5, 6, 7], // Draw on 4-7
        6: [6, 7] // Draw on 6-7
    };

    return bankerTotal in drawTable && 
           drawTable[bankerTotal].includes(getBaccaratValue(playerThirdCard));
}
