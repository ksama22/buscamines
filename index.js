//Matrix a de ser global per reutilizar
var matrixTable = null;
var matrixMines = null;
var matriuBinari = null;
var nMines = 8;

//Exercici 2
function inicialitzaJoc() {
    //Esborra la taula creada (si ha sigut creada)
    erase();
    //Selecciona els dos imputs
    let rows = document.getElementById('inputRow').value;
    let cols = document.getElementById('inputCol').value;

    //Crea una taula
    const tbl = document.createElement("table");
    //Crea un element <tbody>
    const tblBody = document.createElement("tbody");
    //Crea tants <tr> com rows
    for (let i = 0; i < rows; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < cols; j++) {
            //Crea tants <td> com cols
            let cell = document.createElement("td");
            //Posa una id
            cell.id = i + '-' + j;
            //Crida la funcion dins de a variable 'funcionClicar'
            cell.onclick = funcionClicar;
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
    matrixBinari = matriuBinaria(rows, cols);
    matrixMines = inicialitzaMines(rows, cols, nMines);
    //explotarMines();
}


//li posa la funciona a cada cella per event
var funcionClicar = function (event) {
    let pos = (event.target.id).split("-");
    if (matrixMines[pos[0]][pos[1]] == 1) {
        explotarMines();
        console.log("KABOOM");
    } else {
        matrixTable[pos[0]][pos[1]].style.background = "lightgray";
        //console.log('Posicio: ', pos[0], " & ", pos[1], matrixMines[pos[0]][pos[1]]);

    }
};

//Exercici 2
function matriuHTML() {
    ///Agafa els fills del <tbody>
    let rows = document.querySelector("tbody").children
    //Inicialitza una matrix
    let mMatrixHTML = []
    //Recorre tots els fills de <tbody>
    for (var i = 0; i < rows.length; i++) {
        //Fica a la 'matrix' tots els fills de <tbody> 1 per 1
        mMatrixHTML.push(rows[i].children);
    }
    return mMatrixHTML;
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
    for (let i = 0; i < midaX; i++) {
        let arrayX = [];
        for (let j = 0; j < midaY; j++) {
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
    } /*else {  console.log("Mina out of range");}*/
    return finalMatrix;
}

//Comproba que pinta per 'x' & 'y', cridar despres de inicialitzaJoc()
function explotarMines() {
    document.getElementById('git').innerText = nMines + " MAKE BOOM";
    for (let i = 0; i < matrixTable.length; i++) {
        //fallabaesto matrixTable 
        for (let j = 0; j < matrixTable[i].length; j++) {
            if (matrixMines[i][j] == 1) {
                matrixTable[i][j].style.background = "red";
            }
        }
    }
}

function maxmin(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}

