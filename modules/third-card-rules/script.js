// Game state
const gameState = {
    phase: 'natural-actions',
    playerHand: [],
    bankerHand: [],
    playerThirdCard: null,
    bankerThirdCard: null,
    scores: {
        correct: 0,
        incorrect: 0,
        totalHands: 0
    }
};

// Card utilities
const createDeck = () => {
    const suits = ['spades', 'hearts', 'diamonds', 'clubs'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];
    const deck = [];
    for (const suit of suits) {
        for (const value of values) {
            deck.push({ suit, value });
        }
    }
    return deck;
};

const getCardValue = (card) => {
    if (card.value === 'A') return 1;
    if (['T', 'J', 'Q', 'K'].includes(card.value)) return 0;
    return parseInt(card.value);
};

const calculateHandTotal = (hand) => {
    return hand.reduce((sum, card) => (sum + getCardValue(card)) % 10, 0);
};

const isNatural = (hand) => {
    const total = calculateHandTotal(hand);
    return total === 8 || total === 9;
};

const getCardImagePath = (card) => {
    return `images/${card.suit}${card.value}.png`;
};

// Display functions
const displayCard = (cardElement, card) => {
    if (card) {
        cardElement.style.backgroundImage = `url('${getCardImagePath(card)}')`;
        cardElement.style.backgroundSize = 'cover';
        cardElement.style.backgroundPosition = 'center';
        cardElement.style.backgroundColor = 'white';
    } else {
        cardElement.style.backgroundImage = 'none';
        cardElement.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    }
};

const displayCards = () => {
    // Display Player's initial cards
    const playerCards = document.querySelectorAll('.player-area .initial-cards .card-placeholder');
    gameState.playerHand.forEach((card, index) => {
        displayCard(playerCards[index], card);
    });

    // Display Banker's initial cards
    const bankerCards = document.querySelectorAll('.banker-area .initial-cards .card-placeholder');
    gameState.bankerHand.forEach((card, index) => {
        displayCard(bankerCards[index], card);
    });

    // Display third cards if they exist
    const playerThirdCard = document.querySelector('.player-area .third-card .card-placeholder');
    const bankerThirdCard = document.querySelector('.banker-area .third-card .card-placeholder');
    
    displayCard(playerThirdCard, gameState.playerThirdCard);
    displayCard(bankerThirdCard, gameState.bankerThirdCard);
};

const updateMessage = (message) => {
    const questionElement = document.querySelector('.current-question');
    questionElement.textContent = message;
};

const updateScores = () => {
    document.querySelector('.correct-count').textContent = gameState.scores.correct;
    document.querySelector('.incorrect-count').textContent = gameState.scores.incorrect;
    document.querySelector('.total-hands').textContent = gameState.scores.totalHands;
};

const updatePhase = (phase) => {
    // Ensure phase name includes '-actions' suffix
    const phaseClass = phase.endsWith('-actions') ? phase : `${phase}-actions`;
    gameState.phase = phaseClass;
    
    // Hide all action groups
    document.querySelectorAll('.action-buttons > div').forEach(div => {
        div.classList.remove('active');
    });

    // Show appropriate action group
    const actionGroup = document.querySelector(`.${phaseClass}`);
    if (actionGroup) {
        actionGroup.classList.add('active');
        console.log(`Activating phase: ${phaseClass}`);
    } else {
        console.warn(`Phase not found: ${phaseClass}. Checking all action groups:`);
        document.querySelectorAll('.action-buttons > div').forEach(div => {
            console.log(div.className);
        });
    }
};

// Game initialization
const initializeGame = () => {
    gameState.scores.totalHands++;
    const deck = createDeck();
    // Shuffle deck using Fisher-Yates algorithm
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    // Deal initial cards
    gameState.playerHand = [deck[0], deck[2]];
    gameState.bankerHand = [deck[1], deck[3]];
    gameState.playerThirdCard = null;
    gameState.bankerThirdCard = null;

    displayCards();
    updateMessage('Check for naturals (8 or 9)');
    updatePhase('natural-actions');
    updateScores();
};

// Game logic handlers
const handleCorrectDecision = (message) => {
    gameState.scores.correct++;
    updateScores();
    updateMessage(`Correct! ${message}`);
};

const handleIncorrectDecision = (message) => {
    gameState.scores.incorrect++;
    updateScores();
    updateMessage(`Incorrect. ${message}`);
};

const shouldPlayerDraw = (playerTotal) => {
    return playerTotal >= 0 && playerTotal <= 5;
};

const shouldBankerDraw = (bankerTotal, playerThirdCard) => {
    if (playerThirdCard === null) {
        return bankerTotal >= 0 && bankerTotal <= 5;
    }

    const playerCardValue = getCardValue(playerThirdCard);
    
    if (bankerTotal <= 2) return true;
    if (bankerTotal === 3) return playerCardValue !== 8;
    if (bankerTotal === 4) return [2,3,4,5,6,7].includes(playerCardValue);
    if (bankerTotal === 5) return [4,5,6,7].includes(playerCardValue);
    if (bankerTotal === 6) return [6,7].includes(playerCardValue);
    return false;
};

const handleNaturalOutcome = (action) => {
    const playerTotal = calculateHandTotal(gameState.playerHand);
    const bankerTotal = calculateHandTotal(gameState.bankerHand);
    const playerNatural = isNatural(gameState.playerHand);
    const bankerNatural = isNatural(gameState.bankerHand);

    if (action === 'no_natural') {
        if (!playerNatural && !bankerNatural) {
            handleCorrectDecision('No naturals present.');
            updatePhase('draw-actions');
            updateMessage('Should Player draw a third card?');
            return;
        } else {
            handleIncorrectDecision('Check again - there might be a natural.');
            return;
        }
    }

    if (action === 'natural_tie' && playerTotal === bankerTotal && playerNatural) {
        handleCorrectDecision('Natural Tie.');
        setTimeout(initializeGame, 2000);
        return;
    }
    
    if (action === 'player_natural' && playerNatural && (!bankerNatural || playerTotal > bankerTotal)) {
        handleCorrectDecision('Player Wins with Natural.');
        setTimeout(initializeGame, 2000);
        return;
    }
    
    if (action === 'banker_natural' && bankerNatural && (!playerNatural || bankerTotal > playerTotal)) {
        handleCorrectDecision('Banker Wins with Natural.');
        setTimeout(initializeGame, 2000);
        return;
    }

    handleIncorrectDecision('Check the naturals again.');
};

const handlePlayerDraw = (action) => {
    const playerTotal = calculateHandTotal(gameState.playerHand);
    
    if (action === 'no_player_draw') {
        if (!shouldPlayerDraw(playerTotal)) {
            handleCorrectDecision('Correct! Player should not draw.');
            updatePhase('banker-actions');
            updateMessage('Should Banker draw a third card?');
        } else {
            handleIncorrectDecision('Player should draw with this total.');
        }
        return;
    }

    if (shouldPlayerDraw(playerTotal)) {
        if (gameState.playerThirdCard === null) {
            handleCorrectDecision('Player should draw a third card.');
            const deck = createDeck();
            gameState.playerThirdCard = deck[Math.floor(Math.random() * deck.length)];
            displayCards();
            updatePhase('banker-actions');
            updateMessage('Should Banker draw a third card?');
        } else {
            handleIncorrectDecision('Player has already drawn a third card.');
        }
    } else {
        handleIncorrectDecision('Player should not draw a third card with this total.');
    }
};

const handleBankerDraw = (action) => {
    const bankerTotal = calculateHandTotal(gameState.bankerHand);
    
    if (action === 'no_banker_draw') {
        if (!shouldBankerDraw(bankerTotal, gameState.playerThirdCard)) {
            handleCorrectDecision('Correct! Banker should not draw.');
            updatePhase('final-actions');
            updateMessage('What is the final outcome?');
        } else {
            handleIncorrectDecision('Banker should draw in this situation.');
        }
        return;
    }

    if (shouldBankerDraw(bankerTotal, gameState.playerThirdCard)) {
        if (gameState.bankerThirdCard === null) {
            handleCorrectDecision('Banker should draw a third card.');
            const deck = createDeck();
            gameState.bankerThirdCard = deck[Math.floor(Math.random() * deck.length)];
            displayCards();
            updatePhase('final-actions');
            updateMessage('What is the final outcome?');
        } else {
            handleIncorrectDecision('Banker has already drawn a third card.');
        }
    } else {
        handleIncorrectDecision('Banker should not draw a third card in this situation.');
    }
};

const handleFinalOutcome = (action) => {
    const playerTotal = calculateHandTotal(gameState.playerHand.concat(gameState.playerThirdCard ? [gameState.playerThirdCard] : []));
    const bankerTotal = calculateHandTotal(gameState.bankerHand.concat(gameState.bankerThirdCard ? [gameState.bankerThirdCard] : []));

    if (action === 'tie' && playerTotal === bankerTotal) {
        handleCorrectDecision('It\'s a Tie!');
        setTimeout(initializeGame, 2000);
        return;
    }

    if (action === 'player_wins' && playerTotal > bankerTotal) {
        handleCorrectDecision('Player Wins!');
        setTimeout(initializeGame, 2000);
        return;
    }

    if (action === 'banker_wins' && bankerTotal > playerTotal) {
        handleCorrectDecision('Banker Wins!');
        setTimeout(initializeGame, 2000);
        return;
    }

    handleIncorrectDecision('Check the final totals again.');
};

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeGame();

    document.querySelectorAll('.action-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const action = e.target.dataset.action;
            
            if (action.includes('natural')) {
                handleNaturalOutcome(action);
            } else if (action === 'player_draw' || action === 'no_player_draw') {
                handlePlayerDraw(action);
            } else if (action === 'banker_draw' || action === 'no_banker_draw') {
                handleBankerDraw(action);
            } else if (['player_wins', 'banker_wins', 'tie'].includes(action)) {
                handleFinalOutcome(action);
            }
        });
    });
});
