import { Timer } from './timer.js';
import { Field } from './generateField.js';
import { CellManager } from './cellManager.js';

const ROWS = 10;
const COLS = 10;

const scoreAmount = document.querySelector('.score_amount');
const startButton = document.querySelector('.start');
const endButton = document.querySelector('.give-up');
const reloadButton = document.querySelector('.leaders');

const field = new Field(ROWS, COLS);
const timer = new Timer();

field.render();

const startCell = document.querySelector('.x1_y1');
const cellManager = new CellManager(startCell, scoreAmount);

function showStartButton() {
  startButton.classList.remove('hide-button');
  endButton.classList.add('hide-button');
  reloadButton.classList.add('hide-button');
}

function showEndButton() {
  startButton.classList.add('hide-button');
  endButton.classList.remove('hide-button');
  reloadButton.classList.add('hide-button');
}

function showReloadButton() {
  startButton.classList.add('hide-button');
  endButton.classList.add('hide-button');
  reloadButton.classList.remove('hide-button');
}

startButton.addEventListener('click', () => {
  timer.start();
  cellManager.enableStartCell();
  showEndButton();
});

endButton.addEventListener('click', () => {
  timer.stopTimer();
  field.removeField();
  showReloadButton();
});

reloadButton.addEventListener('click', () => {
  window.location.reload();
});