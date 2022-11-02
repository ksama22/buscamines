//Matrix a de ser global per reutilizar
var matrixTable = null;
var matrixMines = null;
var nMines = 8;

//Exercici 2
function inicialitzaJoc() {
    //Esborra la taula creada (si ha sigut creada)
    erase();
    //Selecciona els dos imputs
    let rows = document.getElementById('inputRow').value;
    let cols = document.getElementById('inputCol').value;
    //console.log('row', rows, 'col', cols);

    //Crea una taula
    const tbl = document.createElement("table");
    //Crea un element <tbody>
    const tblBody = document.createElement("tbody");
    //Crea tants <tr> com rows
    for (let i = 0; i < rows; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < cols; j++) {
            //Crea tants <td> com cols
            const cell = document.createElement("td");
            //Afegeix els <td> dintre del <tr> 
            row.appendChild(cell);
        }
        // Afegeix els <tr> dintre del <tbody>
        tblBody.appendChild(row);
    }
    /// Afegeix el <tbody> amb els seus subelements a la <table>
    tbl.appendChild(tblBody);
    //Afegeix la <table> a <div> amb id 'taulell"
    document.getElementById('taulell').appendChild(tbl);
    //Emplena la variable matrix
    matrixTable = matriuHTML()
    matrixMines = inicialitzaMines(rows, cols, nMines);
}

//Exercici 2
function matriuHTML() {
    ///Agafa els fills del <tbody>
    let rows = document.querySelector("tbody").children
    //Inicialitza una matrix
    let matrixBi = []
    //Recorre tots els fills de <tbody>
    for (var i = 0; i < rows.length; i++) {
        //Fica a la 'matrix' tots els fills de <tbody> 1 per 1
        matrixBi.push(rows[i].children)
    }
    // console.log("matriu", matrix);
    return matrixBi;
}

function erase() {
    //Agafa el div amb id 'taulell'
    let taulell = document.getElementById('taulell');
    //Mentre existeix el primer fill
    while (taulell.firstChild) {
        //Borra el primer fill
        taulell.removeChild(taulell.firstChild);
    }
    //Acabat el bucle 'taulell' no tindria cap fill
}

function matriuBinaria(midaX, midaY) {
    let finalMatrix = [];
    for (let i = 0; i < midaY; i++) {
        let arrayX = [];
        for (let j = 0; j < midaX; j++) {
            arrayX.push(0);
        }
        finalMatrix.push(arrayX);
    }
    return finalMatrix;
}

function inicialitzaMines(midaX, midaY, nMines) {

    //Crea matrix binaria
    let finalMatrix = matriuBinaria(midaX, midaY);

    //Omple matrix same size
    let numTotal = 0;
    if (midaX * midaY >= nMines) {
        do {
            let x = maxmin(0, midaX);
            let y = maxmin(0, midaY);
            if (finalMatrix[x][y] == 0) {
                finalMatrix[x][y] = 1;
                numTotal++;
            }
        } while (numTotal < nMines);
    } else {
        console.log("Se lo que intentabas");
    }
    return finalMatrix;
}

//Comproba que pinta per 'x' & 'y', cridar despres de inicialitzaJoc()
function testMines() {
    document.getElementById('git').innerText = nMines + " contributions in the last year";
    for (let i = 0; i < matrixTable.length; i++) {
        for (let j = 0; j < matrixTable.length; j++) {
            if (matrixMines[i][j] == 1) {
                matrixTable[i][j].style.background = "green";
            }
        }
    }
}

function maxmin(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}

