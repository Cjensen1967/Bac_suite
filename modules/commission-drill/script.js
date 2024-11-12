document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const wagerDisplay = document.getElementById('wager-amount');
    const commissionInput = document.getElementById('commission-answer');
    const payoutInput = document.getElementById('payout-answer');
    const checkCommissionBtn = document.getElementById('check-commission');
    const checkPayoutBtn = document.getElementById('check-payout');
    const commissionFeedback = document.getElementById('commission-feedback');
    const payoutFeedback = document.getElementById('payout-feedback');
    const correctDisplay = document.getElementById('correct');
    const incorrectDisplay = document.getElementById('incorrect');
    const completedDisplay = document.getElementById('completed');

    // Track stats
    let stats = {
        correct: 0,
        incorrect: 0,
        completed: 0
    };

    // Current game state
    let currentWager = 0;
    let currentCommission = 0;
    let currentPayout = 0;

    // Generate random wager between $25 and $500 in $5 increments
    function generateWager() {
        const min = 25;
        const max = 500;
        const increment = 5;
        const steps = Math.floor((max - min) / increment);
        const randomSteps = Math.floor(Math.random() * (steps + 1));
        return min + (randomSteps * increment);
    }

    // Format number as currency
    function formatCurrency(number) {
        return '$' + number.toFixed(2);
    }

    // Reset the game state for a new round
    function newRound() {
        currentWager = generateWager();
        currentCommission = parseFloat((currentWager * 0.05).toFixed(2));
        currentPayout = parseFloat((currentWager - currentCommission).toFixed(2));
        
        // Update display
        wagerDisplay.textContent = formatCurrency(currentWager);
        
        // Reset inputs and buttons
        commissionInput.value = '';
        payoutInput.value = '';
        commissionInput.disabled = false;
        payoutInput.disabled = true;
        checkCommissionBtn.disabled = false;
        checkPayoutBtn.disabled = true;
        checkPayoutBtn.textContent = 'Check Payout';
        
        // Clear feedback
        commissionFeedback.textContent = '';
        commissionFeedback.className = 'feedback';
        payoutFeedback.textContent = '';
        payoutFeedback.className = 'feedback';
    }

    // Update stats displays
    function updateStats() {
        correctDisplay.textContent = stats.correct;
        incorrectDisplay.textContent = stats.incorrect;
        completedDisplay.textContent = stats.completed;
    }

    // Check commission answer
    checkCommissionBtn.addEventListener('click', function() {
        const userAnswer = parseFloat(commissionInput.value);
        
        if (isNaN(userAnswer)) {
            commissionFeedback.textContent = 'Please enter a valid number';
            commissionFeedback.className = 'feedback incorrect';
            return;
        }

        if (userAnswer === currentCommission) {
            commissionFeedback.textContent = 'Correct! Now calculate the final payout.';
            commissionFeedback.className = 'feedback correct';
            stats.correct++;
            
            // Enable payout input
            payoutInput.disabled = false;
            checkPayoutBtn.disabled = false;
            
            // Disable commission input
            commissionInput.disabled = true;
            checkCommissionBtn.disabled = true;
        } else {
            commissionFeedback.textContent = 'Incorrect. Try again!';
            commissionFeedback.className = 'feedback incorrect';
            stats.incorrect++;
        }
        
        updateStats();
    });

    // Check payout answer
    checkPayoutBtn.addEventListener('click', function() {
        // If button says "Proceed", start new round
        if (checkPayoutBtn.textContent === 'Proceed') {
            newRound();
            return;
        }

        const userAnswer = parseFloat(payoutInput.value);
        
        if (isNaN(userAnswer)) {
            payoutFeedback.textContent = 'Please enter a valid number';
            payoutFeedback.className = 'feedback incorrect';
            return;
        }

        if (userAnswer === currentPayout) {
            payoutFeedback.textContent = 'Correct!';
            payoutFeedback.className = 'feedback correct';
            stats.correct++;
            stats.completed++;
            
            // Change button to Proceed
            checkPayoutBtn.textContent = 'Proceed';
            payoutInput.disabled = true;
        } else {
            payoutFeedback.textContent = 'Incorrect. Try again!';
            payoutFeedback.className = 'feedback incorrect';
            stats.incorrect++;
        }
        
        updateStats();
    });

    // Handle Enter key in input fields
    commissionInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !checkCommissionBtn.disabled) {
            checkCommissionBtn.click();
        }
    });

    payoutInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !checkPayoutBtn.disabled) {
            checkPayoutBtn.click();
        }
    });

    // Start first round
    newRound();
});
