export class CellManager {
  constructor(startCell, scoreElement, onGameOver = () => {}) {
    this.startCell = startCell;
    this.scoreElement = scoreElement;
    this.onGameOver = onGameOver;
    this.score = 0;

    this.table = document.querySelector('#field table');
    this.preHeaderStatus = document.querySelector('h2');

    this.initEventListeners();
  }

  initEventListeners() {
    this.table.addEventListener('click', (event) => {
      const targetCell = event.target;
      if (targetCell.tagName !== 'TD' || !targetCell.classList.contains('possible')) {
        return;
      }
      this.handleCellClick(targetCell);
    });
  }

  handleCellClick(cell) {
    const previousCurrent = this.table.querySelector('.current');
    if (previousCurrent) {
      previousCurrent.classList.remove('current');
      previousCurrent.classList.add('visited');
    }

    cell.classList.remove('possible');
    cell.classList.add('current');

    this.score += 1;
    this.scoreElement.textContent = this.score;

    this.highLightNextPossibleMoves(cell);
  }

  highLightNextPossibleMoves(currentCell) {
    // Clear all existing possible moves
    const currentPossibles = this.table.querySelectorAll('.possible');
    currentPossibles.forEach((c) => c.classList.remove('possible'));

    const [x, y] = currentCell.className.match(/\d+/g).map(Number);

    const knightMoves = [
      [-1, 2], [1, 2],
      [-1, -2], [1, -2],
      [2, 1], [2, -1],
      [-2, 1], [-2, -1],
    ];

    knightMoves.forEach(([dx, dy]) => {
      const nextX = x + dx;
      const nextY = y + dy;

      const target = this.table.querySelector(`.x${nextX}_y${nextY}`);

      if (target && !target.classList.contains('visited') && !target.classList.contains('current')) {
        target.classList.add('possible');
      }
    });

    this.checkGameOver();
  }

  checkGameOver() {
    const hasPossibleMoves = this.table.querySelector('.possible') !== null;

    if (!hasPossibleMoves) {
      if (this.score >= 100) {
        this.preHeaderStatus.textContent = 'You Win! 🎉';
      } else {
        this.preHeaderStatus.textContent = 'You Lost! 😭';
      }
      this.onGameOver();
    }
  }

  resetScore() {
    this.score = 0;
    this.scoreElement.textContent = 0;
    if (this.preHeaderStatus) {
      this.preHeaderStatus.textContent = '';
    }
  }

  enableStartCell() {
    const start = this.table.querySelector('.x1_y1');
    if (start) {
      start.classList.add('possible');
    }
  }
}