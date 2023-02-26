
const DEFAULT_VALUE = 16;
const DEFAULT_BACKGROUND = 'rgb(255,255,255)';
const DEFAULT_DRAW_COLOR = 'rgb(0,0,0)';
const DEFAULT_ERASE_TOGGLE = false;
const DEFAULT_LIGHTEN_TOGGLE = false;
const DEFAULT_SHADE_TOGGLE = false;

let val = DEFAULT_VALUE;
let drawColor = DEFAULT_DRAW_COLOR;
let backgroundColor = DEFAULT_BACKGROUND;
let eraser = DEFAULT_ERASE_TOGGLE;
let lighten = DEFAULT_LIGHTEN_TOGGLE;
let shade = DEFAULT_SHADE_TOGGLE;

const rangeSlider = document.querySelector('.rangeSlider');
const rangeLabel = document.querySelector('.rangeLabel');
const grid = document.querySelector('.grid');
const colorInput = document.querySelector('.drawColor');
const backgroundInput = document.querySelector('.backgroundColor');
const clearInput = document.querySelector('.clearDrawing');
const eraseButton = document.querySelector('.eraseBlock');
const lightenButton = document.querySelector('.lightenBlock');
const shadeButton = document.querySelector('.shadeBlock');
const toggleButtons = [eraseButton, lightenButton, shadeButton];

rangeSlider.addEventListener('change', () => {changeBackgroundColor(backgroundColor); updateGrid(); draw();});
rangeSlider.addEventListener('mousemove', () => {updateRangeLabel();});
rangeSlider.addEventListener('touchmove', () => {updateRangeLabel();});
colorInput.addEventListener('change', () => {changeColor(colorInput.value); draw();});
backgroundInput.addEventListener('input', () => {backgroundColor = backgroundInput.value; changeBackgroundColor(backgroundColor);});;
clearInput.addEventListener('click', () => {changeBackgroundColor(backgroundColor);})
eraseButton.addEventListener('click', () => {eraser = toggleButton(eraseButton, eraser); draw();})
lightenButton.addEventListener('click', () => {lighten = toggleButton(lightenButton, lighten); draw();})
shadeButton.addEventListener('click', () => {shade = toggleButton(shadeButton , shade); draw();})


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
                if (eraser === true)
                    cells[i].style.backgroundColor = backgroundColor;
                else if (lighten === true) 
                    lightenBlock(cells[i]);
                else if (shade === true)
                    shadeBlock(cells[i]);
                else
                    cells[i].style.backgroundColor = drawColor;
            }
        })
        cells[i].addEventListener('touchmove', (e) => {
            var myLocation = event.touches[0];
            var realTarget = document.elementFromPoint(myLocation.clientX, myLocation.clientY);
            cells.forEach(cell => {
                if (realTarget === cell) {
                    if (eraser === true)
                        cell.style.backgroundColor = backgroundColor;
                    else if (lighten === true) 
                        lightenBlock(cell);
                    else if (shade === true)
                        shadeBlock(cell);
                    else
                        cell.style.backgroundColor = drawColor;
                }
            })
        })
        cells[i].addEventListener('click', (e) => {
            if (eraser === true)
                cells[i].style.backgroundColor = backgroundColor;
            else if (lighten === true) 
                lightenBlock(cells[i]);
             else if (shade === true)
                shadeBlock(cells[i]);
            else
                cells[i].style.backgroundColor = drawColor;
        })
    }
}
function lightenBlock(block) {
    let color = block.style.backgroundColor;
    let [h,s,l] = convertToHSL(color);
    block.style.backgroundColor = `hsl(${h},${s}%,${l+0.7}%)`;
}
function shadeBlock(block) { 
    let color = block.style.backgroundColor;
    let [h, s, l] = convertToHSL(color);
    block.style.backgroundColor = `hsl(${h}, ${s}%, ${l-0.7}%)`;
}
function convertToHSL(color) {
    let h, s, l;
    let max, min;
    color = color.substring(4);
    color = color.replace(")", "");
    let [r, g, b] = color.split(",")
    r = r / 255; g = g / 255; b = b / 255;
    max = r;
    min = r;
    if (max < g) max = g;
    if (min < g) min = g;
    if (min > b) min = b;
    if (max < b) max = b;
    l = Math.round((min + max) * 50);
    if (min === max) {
        s = 0;
        h = 0;
    }
    else {
        if ((l / 100) <= 0.5)
            s = (max-min)/(max+min);
        else
            s = (max-min)/(2.0 -max-min);
        s = Math.round(s * 100);
        if (max === r)
            h = (g-b)/(max-min);
        else if (max === g)
            h = 2.0 + (b-r)/(max-min);
        else
            h = 4.0 + (r-g)/(max-min);
        
        h = h * 60;
        if (h < 0)
            h = h + 360;
        h = Math.round(h);
    }
    return [h, s, l];
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

function toggleButton(selectedButton, buttonValue) {
    if (selectedButton.value === "OFF") {
        toggleButtons.forEach(button => {
            if (button !== selectedButton) {
                if (button.className === 'eraseBlock activated')
                    eraser = toggleButton(eraseButton, eraser);
                if (button.className === 'lightenBlock activated')
                    lighten = toggleButton(lightenButton, lighten);
                if (button.className === 'shadeBlock activated')
                    shade = toggleButton(shadeButton, shade);
            }
        })
        selectedButton.value = 'ON';
        selectedButton.classList.remove('deactivated');
        selectedButton.classList.add('activated');
        buttonValue = true;
        return buttonValue;
    }
    else if (selectedButton.value === 'ON') {
        selectedButton.value = 'OFF';
        selectedButton.classList.add('deactivated');
        selectedButton.classList.remove('activated');
        buttonValue = false;
        return buttonValue;
    }
}

window.onload = () => {
    updateRangeLabel();
    updateGrid();
    draw();
}

