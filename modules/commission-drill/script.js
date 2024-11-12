document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const wagerDisplay = document.getElementById('wager-amount');
    const commissionInput = document.getElementById('commission-answer');
    const payoutInput = document.getElementById('payout-answer');
    const checkCommissionBtn = document.getElementById('check-commission');
    const checkPayoutBtn = document.getElementById('check-payout');
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
        checkCommissionBtn.textContent = 'Check Commission';
        checkCommissionBtn.className = 'btn';
        checkPayoutBtn.disabled = true;
        checkPayoutBtn.textContent = 'Check Payout';
        checkPayoutBtn.className = 'btn';
    }

    // Update stats displays
    function updateStats() {
        correctDisplay.textContent = stats.correct;
        incorrectDisplay.textContent = stats.incorrect;
        completedDisplay.textContent = stats.completed;
    }

    // Add click handlers to clear inputs when clicked
    commissionInput.addEventListener('click', function() {
        if (!this.disabled) {
            this.value = '';
            checkCommissionBtn.textContent = 'Check Commission';
            checkCommissionBtn.className = 'btn';
        }
    });

    payoutInput.addEventListener('click', function() {
        if (!this.disabled) {
            this.value = '';
            checkPayoutBtn.textContent = 'Check Payout';
            checkPayoutBtn.className = 'btn';
        }
    });

    // Check commission answer
    checkCommissionBtn.addEventListener('click', function() {
        const userAnswer = parseFloat(commissionInput.value);
        
        if (isNaN(userAnswer)) {
            checkCommissionBtn.textContent = 'Please enter a valid number';
            checkCommissionBtn.className = 'btn incorrect';
            return;
        }

        if (userAnswer === currentCommission) {
            checkCommissionBtn.textContent = 'Correct! Now calculate the payout.';
            checkCommissionBtn.className = 'btn correct';
            stats.correct++;
            
            // Enable payout input
            payoutInput.disabled = false;
            checkPayoutBtn.disabled = false;
            
            // Disable commission input
            commissionInput.disabled = true;
            checkCommissionBtn.disabled = true;
        } else {
            checkCommissionBtn.textContent = 'Incorrect. Try again!';
            checkCommissionBtn.className = 'btn incorrect';
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
            checkPayoutBtn.textContent = 'Please enter a valid number';
            checkPayoutBtn.className = 'btn incorrect';
            return;
        }

        if (userAnswer === currentPayout) {
            checkPayoutBtn.textContent = 'Correct!';
            checkPayoutBtn.className = 'btn correct';
            stats.correct++;
            stats.completed++;
            
            // Change button to Proceed after a short delay
            setTimeout(() => {
                checkPayoutBtn.textContent = 'Proceed';
                checkPayoutBtn.className = 'btn';
            }, 1500);
            
            payoutInput.disabled = true;
        } else {
            checkPayoutBtn.textContent = 'Incorrect. Try again!';
            checkPayoutBtn.className = 'btn incorrect';
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
