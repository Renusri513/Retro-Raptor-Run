const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');
const gameOverScreen = document.getElementById('game-over');
const currentScoreDisplay = document.getElementById('current-score');
const bestScoreDisplay = document.getElementById('best-score');
const restartBtn = document.getElementById('restart-btn');
const jumpSound = document.getElementById('jump-sound');
const gameOverSound = document.getElementById('game-over-sound');
let isJumping = false;
let score = 0;
let bestScore = localStorage.getItem('bestScore') || 0;
let isGameOver = false;

function jump() {
    if (!isJumping && !isGameOver) {
        let position = 0;
        isJumping = true;
        jumpSound.play();
        let upInterval = setInterval(() => {
            if (position >= 150) {
                clearInterval(upInterval);
                let downInterval = setInterval(() => {
                    if (position <= 0) {
                        clearInterval(downInterval);
                        isJumping = false;
                    } else {
                        position -= 5;
                        dino.style.bottom = position + 'px';
                    }
                }, 20);
            } else {
                position += 30;
                dino.style.bottom = position + 'px';
            }
        }, 20);
    }
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        jump();
    }
});

function checkCollision() {
    if (isGameOver) return;
    const dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'));
    const obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
    if (obstacleLeft > 50 && obstacleLeft < 100 && dinoBottom <= 40) {
        endGame();
    }
}

function increaseScore() {
    if (!isGameOver) {
        score++;
        scoreDisplay.innerText = 'Score: ' + score;
    }
}

function endGame() {
    isGameOver = true;
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('bestScore', bestScore);
    }
    currentScoreDisplay.innerText = 'Score: ' + score;
    bestScoreDisplay.innerText = 'Best Score: ' + bestScore;
    gameOverSound.play();
    gameOverScreen.style.display = 'flex';
    obstacle.style.animation = 'none';
}

restartBtn.addEventListener('click', function() {
    score = 0;
    scoreDisplay.innerText = 'Score: ' + score;
    isGameOver = false;
    obstacle.style.animation = 'moveObstacle 2s linear infinite';
    gameOverScreen.style.display = 'none';
});

setInterval(checkCollision, 10);
setInterval(increaseScore, 100);
