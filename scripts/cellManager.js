export class CellManager {
    constructor(startCell, scoreElement, onGameOver = () => { }) {
        this.startCell = startCell;
        this.tableContainer = document.querySelector('#field table tbody');
        this.tdCells = document.querySelectorAll('td');
        this.score = 0;
        this.scoreElement = scoreElement;
        this.onGameOver = onGameOver;
        this.preHeaderStatus = document.querySelector("h2");

        this.initEventListeners();
    }

    initEventListeners() {
        this.tableContainer.addEventListener('click', (event) => {
            if (event.target.tagName !== "TD") {
                return;
            }
            const targetCell = event.target;

            if (!targetCell.classList.contains('possible')) {
                return;
            }
            this.handleCellClick(targetCell);
        })
    }

    findNoPossibleMoves() {

    }

    highLightNextPossibleMoves(currentCell) {
        const currentCellPosition = currentCell.className.split(' ')[0];
        const [currentCellPositionX, currentCellPositionY] = currentCellPosition.match(/\d+/g).map(Number);
        let possibleCells = document.querySelectorAll('.possible');
        for (let i = 0; i < possibleCells.length; i++) {
            possibleCells[i].classList.remove('possible');
        }
        for (let i = 0; i < this.tdCells.length; i++) {
            if (!this.tdCells[i].classList.contains('visited')) {
                if (this.tdCells[i].classList.contains(`x${currentCellPositionX - 1}_y${currentCellPositionY + 2}`)) {
                    this.tdCells[i].classList.add('possible')
                } else if (this.tdCells[i].classList.contains(`x${currentCellPositionX + 1}_y${currentCellPositionY + 2}`)) {
                    this.tdCells[i].classList.add('possible')
                } else if (this.tdCells[i].classList.contains(`x${currentCellPositionX + 1}_y${currentCellPositionY - 2}`)) {
                    this.tdCells[i].classList.add('possible')
                } else if (this.tdCells[i].classList.contains(`x${currentCellPositionX + 2}_y${currentCellPositionY + 1}`)) {
                    this.tdCells[i].classList.add('possible')
                }
                else if (this.tdCells[i].classList.contains(`x${currentCellPositionX + 2}_y${currentCellPositionY - 1}`)) {
                    this.tdCells[i].classList.add('possible')
                } else if (this.tdCells[i].classList.contains(`x${currentCellPositionX - 1}_y${currentCellPositionY - 2}`)) {
                    this.tdCells[i].classList.add('possible')
                } else if (this.tdCells[i].classList.contains(`x${currentCellPositionX - 2}_y${currentCellPositionY - 1}`)) {
                    this.tdCells[i].classList.add('possible')
                } else if (this.tdCells[i].classList.contains(`x${currentCellPositionX + 2}_y${currentCellPositionY + 1}`)) {
                    this.tdCells[i].classList.add('possible')
                } else if (this.tdCells[i].classList.contains(`x${currentCellPositionX - 2}_y${currentCellPositionY + 1}`)) {
                    this.tdCells[i].classList.add('possible')
                }
            }

            currentCell.classList.add('visited');
            currentCell.classList.remove('current');
        }
        this.checkGameOver();
    }

    checkGameOver() {
        if (document.querySelector('.possible') == null) {
            if (this.score == 100) {
                this.preHeaderStatus.textContent = "You Win! 🎉"
            } else {
                this.preHeaderStatus.textContent = "You Lost! 😭"
            }
            this.onGameOver();
        }
    }

    handleCellClick(cell) {
        cell.classList.remove('possible');
        cell.classList.add('current');
        this.score += 1;
        this.scoreElement.textContent = this.score;
        this.highLightNextPossibleMoves(cell);
    }

    resetScore() {
        this.scoreElement.textContent = 0;
    }

    enableStartCell() {
        this.startCell.classList.add("possible");
    }
}