import { Timer } from './timer.js';
import { Field } from './generateField.js';
import { CellManager } from './cellManager.js';

const ROWS = 10;
const COLS = 10;

const scoreAmount = document.querySelector('.score_amount');
const buttonsMenu = document.querySelector('.menu');
const startButton = document.querySelector('.start');

// 1. Створюємо екземпляри
const field = new Field(ROWS, COLS);
const timer = new Timer();

// 2. Будуємо розмітку поля
field.render();

// 3. Знаходимо стартову клітинку та передаємо таблицю в CellManager
const startCell = document.querySelector('.x1_y1');
const cellManager = new CellManager(startCell, scoreAmount);

// Функція заміни кнопки "Start" на "End"
function switchButtons() {
  startButton.remove();

  const endButton = document.createElement('button');
  endButton.type = 'button';
  endButton.className = 'give-up';
  endButton.textContent = 'End';

  endButton.addEventListener('click', () => {
    timer.stopTimer();
  });

  buttonsMenu.appendChild(endButton);
}

// Запуск гри за кліком
startButton.addEventListener('click', () => {
  timer.start();
  cellManager.enableStartCell();
  switchButtons();
});