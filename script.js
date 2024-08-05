document.addEventListener('DOMContentLoaded', () => {
    const gameImage = document.getElementById('gameImage');
    const clickCountElem = document.getElementById('clickCount');
    const messageElem = document.getElementById('message');
    const progressBar = document.getElementById('progressBar');
    const questionContainer = document.getElementById('questionContainer');
    const questionText = document.getElementById('questionText');
    const answerInput = document.getElementById('answerInput');
    const submitAnswer = document.getElementById('submitAnswer');

    let clickCount = 0;
    let correctAnswer = 0;
    let awaitingAnswer = false;

    function generateQuestion() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        correctAnswer = num1 * num2;
        questionText.textContent = `Jawab pertanyaan nya dulu bre: ${num1} x ${num2} = ?`;
        answerInput.value = '';
        questionContainer.classList.remove('hidden');
        awaitingAnswer = true;
    }

    submitAnswer.addEventListener('click', () => {
        const userAnswer = parseInt(answerInput.value, 10);
        if (userAnswer === correctAnswer) {
            messageElem.textContent = 'Oke lanjut bre';
            questionContainer.classList.add('hidden');
            awaitingAnswer = false;
        } else {
            messageElem.textContent = 'Salah bre, matematika mu pasti 0 :D';
        }
    });

    gameImage.addEventListener('click', () => {
        if (awaitingAnswer) {
            messageElem.textContent = 'Jawab pertanyaan nya dulu bre';
            return;
        }

        clickCount++;
        clickCountElem.textContent = clickCount;

        // Update progress bar
        const progressPercentage = (clickCount / 1000) * 100;
        progressBar.style.width = `${progressPercentage}%`;

        // Add animation class
        gameImage.classList.add('clicked');

        // Remove animation class after animation ends to allow it to be triggered again
        setTimeout(() => {
            gameImage.classList.remove('clicked');
        }, 600); // Match the duration of the animation

        if (clickCount >= 1000) {
            messageElem.textContent = 'Congratulations! You have won 50 XRD!';
            gameImage.style.pointerEvents = 'none'; // Disable further clicks
        } else if (clickCount % 100 === 0) {
            generateQuestion();
        }
    });
});
