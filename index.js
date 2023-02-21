document.addEventListener('DOMContentLoaded', () => {
    const val = document.querySelector('.rangeValue').value;
    updateRangeLabel(val);
    updateGrid(val);
    document.querySelector('.rangeValue').addEventListener('input', function() {
        const val = document.querySelector('.rangeValue').value;
        updateRangeLabel(val);
        updateGrid(val);
    })
})

function updateRangeLabel(value) {
        document.querySelector('.rangeLabel').textContent = `${value} x ${value}`;
}

function updateGrid(val) {
    console.log(val);
}