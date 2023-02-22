
const DEFAULT_VALUE = 16;
const DEFAULT_BACKGROUND = 'white';
const DEFAULT_DRAW_COLOR = 'black';

let val = DEFAULT_VALUE;
let drawColor = DEFAULT_DRAW_COLOR;

const rangeSlider = document.querySelector('.rangeSlider');
const rangeLabel = document.querySelector('.rangeLabel');
const grid = document.querySelector('.grid');
const colorInput = document.querySelector('.drawColor');

rangeSlider.addEventListener('change', () => {updateGrid(); draw(drawColor);});
rangeSlider.addEventListener('mousemove', () => {updateRangeLabel();});
rangeSlider.addEventListener('touchmove', () => {updateRangeLabel();});
colorInput.addEventListener('change', () => {changeColor(colorInput.value); draw(drawColor);})


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

function draw(drawColor) {
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('mousemove', (e) => {
            if (e.buttons === 1) {
                cells[i].style.backgroundColor = drawColor;
            }
        })
        cells[i].addEventListener('touchmove', (e) => {
            var myLocation = event.touches[0];
            var realTarget = document.elementFromPoint(myLocation.clientX, myLocation.clientY);
            cells.forEach(cell => {
                if (realTarget === cell) {
                    cell.style.backgroundColor = drawColor;
                }
            })
        })
        cells[i].addEventListener('click', (e) => {
            cells[i].style.backgroundColor = drawColor;
        })
    }
}

function changeColor(value) {
    drawColor = value;
}

window.onload = () => {
    updateRangeLabel(val);
    updateGrid(val);
    draw(drawColor);
}

