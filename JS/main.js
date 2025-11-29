// Start Button
document.querySelector(".control-buttons span").onclick = function () {
    let yourName = prompt("Enter Your Name");

    if (yourName == null || yourName === "") {
        document.querySelector(".info-container .name span").innerHTML = "Unknown";
    } else {
        document.querySelector(".info-container .name span").innerHTML = yourName;
    }
    document.getElementById("start").play();


    document.querySelector(".control-buttons").remove();

    // Start Timer
    timerInterval = setInterval(() => {
        timer++;
        document.getElementById("timerCount").textContent = timer;
            if (timer >= 180) {
                clearInterval(timerInterval);
                showGameOver();
                document.getElementById("end").play();
            }

    }, 1000);
};

// ===============================
// Game Variables
// ===============================
let duration = 1000;
let timer = 0;
let timerInterval;
let totalMatches = 0;

let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);

// Total pairs
let totalBlocks = blocks.length / 2;
// ===============================
// Shuffle Cards
// ===============================
let orderRange = Array.from(Array(blocks.length).keys());
shuffle(orderRange);

blocks.forEach((block, index) => {
    block.style.order = orderRange[index];

    block.addEventListener("click", function () {
        flipBlock(block);
    });
});
// ===============================
// Flip Block Function
// ===============================
function flipBlock(selectedBlock) {
    selectedBlock.classList.add("is-flipped");

    let allFlippedBlocks = blocks.filter(block => block.classList.contains("is-flipped"));

    if (allFlippedBlocks.length === 2) {
        stopClicking();
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}
// ===============================
// Stop Clicking
// ===============================
function stopClicking() {
    blocksContainer.classList.add("no-clicking");

    setTimeout(() => {
        blocksContainer.classList.remove("no-clicking");
    }, duration);
}
// ===============================
// Matching Logic
// ===============================
let triesElement = document.querySelector(".tries span");
let triesNumber = 0
function checkMatchedBlocks(firstBlock, secondBlock) {

    if (firstBlock.dataset.animals === secondBlock.dataset.animals) {

        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");

        document.getElementById("success").play();

        totalMatches++;

        // Win Condition
        if (totalMatches === totalBlocks) {
            clearInterval(timerInterval);

            setTimeout(() => {
                document.getElementById("winScreen").style.display = "flex";
            }, 600);
        }

    } else {
        triesNumber++;
        triesElement.innerHTML =triesNumber;

        setTimeout(() => {
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        }, duration);

        document.getElementById("fail").play();
    }
}
// ===============================
// Shuffle Function
// ===============================
function shuffle(array) {
    let current = array.length,
        temp,
        random;

    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        /**
         * 1) Save Current Element in Temp
         * 2) Current Element = Random Element
         * 3) Random Element = temp
         */
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }

    return array;
}
function showGameOver() {

    // إيقاف الكلك
    blocksContainer.classList.add("no-clicking");

    // إظهار شاشة Game Over
    let gameOverScreen = document.createElement("div");
    gameOverScreen.className = "game-over-screen";

    gameOverScreen.innerHTML = `
        <div class="game-over-box">
            <h1>Game Over</h1>
            <button id="playAgainBtn">Play Again</button>
        </div>
    `;

    document.body.appendChild(gameOverScreen);

    
    document.getElementById("playAgainBtn").onclick = function () {
        location.reload(); 
    };
}
