import { Timer } from './timer.js';
import { Field } from './generateField.js';
import { CellManager } from './cellManager.js';

const ROWS = 10;
const COLS = 10;

const scoreAmount = document.querySelector('.score_amount');
const buttonsMenu = document.querySelector('.menu');
let startButton = document.querySelector('.start');

const field = new Field(ROWS, COLS);
const timer = new Timer();

field.render();

let startCell = document.querySelector('.x1_y1');
const cellManager = new CellManager(startCell, scoreAmount);

function handleGameStart() {
  timer.start();
  cellManager.enableStartCell();
  switchButtonToEnd();
}

startButton.addEventListener('click', handleGameStart);

function switchButtonToEnd() {
  startButton.remove();

  const endButton = document.createElement('button');
  endButton.type = 'button';
  endButton.className = 'give-up';
  endButton.textContent = 'End';

  endButton.addEventListener('click', () => {
    timer.stopTimer();
    field.removeField();
    switchButtonToReload();
  });

  buttonsMenu.appendChild(endButton);
}

function switchButtonToReload() {
  document.querySelector('.give-up').remove();

  const reloadButton = document.createElement('button');
  reloadButton.type = 'button';
  reloadButton.className = 'leaders';
  reloadButton.textContent = 'Reload';

  reloadButton.addEventListener('click', () => {
    timer.resetTimer();
    cellManager.resetScore();

    const table = document.querySelector('table');
    const newTbody = document.createElement('tbody');
    table.appendChild(newTbody);

    field.tbody = newTbody; 
    field.render();

    cellManager.startCell = document.querySelector('.x1_y1');

    switchButtonToStart();
  });

  buttonsMenu.appendChild(reloadButton);
}

function switchButtonToStart() {
  document.querySelector('.leaders').remove();

  startButton = document.createElement('button');
  startButton.type = 'button';
  startButton.className = 'start';
  startButton.textContent = 'Start';

  startButton.addEventListener('click', handleGameStart);

  buttonsMenu.appendChild(startButton);
}