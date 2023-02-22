
const DEFAULT_VALUE = 16;
const DEFAULT_BACKGROUND = 'white';

let val = DEFAULT_VALUE;

const rangeSlider = document.querySelector('.rangeSlider');
const rangeLabel = document.querySelector('.rangeLabel');
const grid = document.querySelector('.grid');
let cells = document.querySelectorAll('.cell');


rangeSlider.addEventListener('change', () => {updateGrid(); clickChangeColor();});
rangeSlider.addEventListener('mousemove', () => {updateRangeLabel();});
rangeSlider.addEventListener('touchmove', () => {updateRangeLabel();});


function updateRangeLabel() {
    const val = rangeSlider.value;
    rangeLabel.textContent = `${val} x ${val}`;
}

function updateGrid() {
    grid.innerHTML = '';
    const val = rangeSlider.value;
    grid.style.gridTemplateColumns = `repeat(${val}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${val}, 1fr)`;
    for (let i = 1; i <= val * val; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        grid.appendChild(cell);
    }
}

function clickChangeColor() {
    let cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('mousemove', (e) => {
            if (e.buttons === 1) {
                cells[i].style.backgroundColor = 'black';
            }
        })
    }
}

window.onload = () => {
    updateRangeLabel(val);
    updateGrid(val);
    clickChangeColor();
}

