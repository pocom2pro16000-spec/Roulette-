let balance = 10000;
let selectedBet = null;
let isSpinning = false;

// Roulette numbers sequence
const numbers = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
const redNumbers = [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3];

function setBet(type) {
    if(isSpinning) return;
    selectedBet = type;
    document.getElementById('status').innerText = "Bet: " + type.toUpperCase();
}

function spinNow() {
    if (isSpinning) return;
    if (!selectedBet) {
        alert("Bhai, pehle bet toh lagao!");
        return;
    }

    isSpinning = true;
    let wheel = document.getElementById('wheel');
    // 3600 (10 full spins) + random degree
    let randomExtra = Math.floor(Math.random() * 360);
    let totalRotation = 3600 + randomExtra; 
    
    wheel.style.transform = `rotate(${totalRotation}deg)`;

    setTimeout(() => {
        isSpinning = false;
        let finalDegree = totalRotation % 360;
        // 37 numbers hote hain (0-36)
        let index = Math.floor((360 - finalDegree) / (360 / 37)) % 37;
        let resultNumber = numbers[index];
        
        checkResult(resultNumber);
        
        // Wheel ko wapas reset (optional) bina animation ke kar sakte ho next turn ke liye
    }, 5000);
}

function checkResult(num) {
    let color = redNumbers.includes(num) ? 'red' : (num === 0 ? 'green' : 'black');
    let statusText = document.getElementById('status');

    if (selectedBet === color) {
        balance += 1000; // Jeetne par 1000 coins
        statusText.style.color = "#00ff00";
        statusText.innerText = `WIN! Number ${num} (${color})`;
    } else {
        balance -= 500; // Haarne par 500 minus
        statusText.style.color = "#ff4d4d";
        statusText.innerText = `LOST! Number ${num} (${color})`;
    }
    
    document.getElementById('balance').innerText = balance;
    selectedBet = null; // Reset bet for next round
}
