
const DEFAULT_VALUE = 16;
const DEFAULT_BACKGROUND = 'white';
const DEFAULT_DRAW_COLOR = 'black';
const DEFAULT_ERASE_TOGGLE = 'false';

let val = DEFAULT_VALUE;
let drawColor = DEFAULT_DRAW_COLOR;
let backgroundColor = DEFAULT_BACKGROUND;
let eraser = false;

const rangeSlider = document.querySelector('.rangeSlider');
const rangeLabel = document.querySelector('.rangeLabel');
const grid = document.querySelector('.grid');
const colorInput = document.querySelector('.drawColor');
const backgroundInput = document.querySelector('.backgroundColor');
const clearInput = document.querySelector('.clearDrawing');
const eraseButton = document.querySelector('.eraseBlock');

rangeSlider.addEventListener('change', () => {changeBackgroundColor(backgroundColor); updateGrid(); draw();});
rangeSlider.addEventListener('mousemove', () => {updateRangeLabel();});
rangeSlider.addEventListener('touchmove', () => {updateRangeLabel();});
colorInput.addEventListener('change', () => {changeColor(colorInput.value); draw();});
backgroundInput.addEventListener('input', () => {backgroundColor = backgroundInput.value; changeBackgroundColor(backgroundColor);});;
clearInput.addEventListener('click', () => {changeBackgroundColor(backgroundColor);})
eraseButton.addEventListener('click', (e) => {toggleEraser(e);})

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
        cell.style.backgroundColor = backgroundColor;
        grid.appendChild(cell);
    }
}

function draw() {
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('mousemove', (e) => {
            if (e.buttons === 1) {
                if (eraser === false)
                    cells[i].style.backgroundColor = drawColor;
                else
                    cells[i].style.backgroundColor = backgroundColor;

            }
        })
        cells[i].addEventListener('touchmove', (e) => {
            var myLocation = event.touches[0];
            var realTarget = document.elementFromPoint(myLocation.clientX, myLocation.clientY);
            cells.forEach(cell => {
                if (realTarget === cell) {
                    if (eraser === false)
                    cells[i].style.backgroundColor = drawColor;
                    else
                        cells[i].style.backgroundColor = backgroundColor;
                }
            })
        })
        cells[i].addEventListener('click', (e) => {
            if (eraser === false)
                cells[i].style.backgroundColor = drawColor;
            else
                cells[i].style.backgroundColor = backgroundColor;
        })
    }
}
function changeColor(value) {
    drawColor = value;
}

function changeBackgroundColor(value) {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.backgroundColor = value;
    })
}

function toggleEraser(e) {
    if (e.target.value === "OFF") {
        e.target.value = 'ON';
        eraseButton.classList.remove('deactivated');
        eraseButton.classList.add('activated');
        eraser = true;
    }
    else if (e.target.value === 'ON') {
        e.target.value = 'OFF';
        eraseButton.classList.add('deactivated');
        eraseButton.classList.remove('activated');
        eraser=false;

    }
        
    draw();
}
 

window.onload = () => {
    updateRangeLabel();
    updateGrid();
    draw();
}

