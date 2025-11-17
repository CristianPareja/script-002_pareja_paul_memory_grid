let correctIndices = [];
let aciertos = 0;
let fallos = 0;
let clicksHabilitados = false;

function addClass(containerDiv, className) {
    containerDiv.classList.add(className);
}

function createMatrix(dimension, container) {
    container.innerHTML = "";
    let counter = 1;

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement("div");
        addClass(row, "demo");

        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement("div");
            addClass(cell, "content");
            cell.textContent = counter;
            row.appendChild(cell);
            counter++;
        }
        container.appendChild(row);
    }
}

function random(totalCells, count) {
    const indices = new Set();
    while (indices.size < count) {
        const indiceRandom = Math.floor(Math.random() * totalCells);
        indices.add(indiceRandom);
    }
    return [...indices];
}

function pintarRandom(cells, numCells, seconds) {
    correctIndices = random(cells.length, numCells);

    correctIndices.forEach(index => {
        cells[index].style.backgroundColor = "yellow";
    });

    setTimeout(() => {
        correctIndices.forEach(index => {
            cells[index].style.backgroundColor = "";
        });
        clicksHabilitados = true;
    }, seconds * 1000);
}

function activarClicks(cells) {
    aciertos = 0;
    fallos = 0;

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {

            if (cell.classList.contains("seleccionada")) return;
            cell.classList.add("seleccionada");

        
            if (correctIndices.includes(index)) {
                cell.style.backgroundColor = "green";
                aciertos++;
                document.getElementById("miPuntajeCorrecto").innerHTML = aciertos;

                if (aciertos === correctIndices.length) {
                    alert("¡GANASTE!");
                }

            } else {
                cell.style.backgroundColor = "red";
                fallos++;
                document.getElementById("miPuntajeFallo").innerHTML = fallos;
            }
        });
    });
}

function buttonClicked() {
    clicksHabilitados = false;

    const dimensionValue = parseInt(document.getElementById("dimension").value);
    const cajitasValue = parseInt(document.getElementById("cajas-divisor").value);
    const tiempoValue = parseInt(document.getElementById("tiempo-divisor").value);
    const matrixContainer = document.getElementById("matrix-container");

    createMatrix(dimensionValue, matrixContainer);

    const cells = matrixContainer.querySelectorAll(".content");

    activarClicks(cells);
    pintarRandom(cells, cajitasValue, tiempoValue);
}

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("matrix-container");
    createMatrix(5, container);

    document.getElementById("generate").addEventListener("click", buttonClicked);
});