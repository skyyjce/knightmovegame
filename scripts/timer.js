export class Timer {
    constructor() {
        this.secondsPassed = 0;
        this.timemerId = null;
        this.timerElement = document.querySelector(".time_amount");
    }

    startTimer() {
        this.stopTimer();

        this.timemerId = setInterval(() => {
            this.secondsPassed++;
            this.updateTimerDisplay();
        }, 1000);
    }

    stopTimer() {
        if (this.timemerId !== null) {
            clearInterval(this.timemerId);
            this.timemerId = null;
        }
    }

    resetTimer() {
        this.stopTimer();
        this.secondsPassed = 0;
        this.updateTimerDisplay();
    }

    updateTimerDisplay() {
        if (!this.timerElement) return;

        const mins = String(Math.floor(this.secondsPassed / 60)).padStart(2, '0');
        const secs = String(this.secondsPassed % 60).padStart(2, '0');
        this.timerElement.textContent = `${mins}:${secs}`;
    }
    
    start() {
        this.resetTimer();
        this.startTimer();
    }
}