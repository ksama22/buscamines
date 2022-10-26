//Matrix a de ser global per reutilizar
var matrix = null;
var minesArray = null;
var mines = 8;

//Exercici 2
function inicialitzaJoc() {
    document.getElementById('git').innerText = mines + " contributions in the last year";

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
    matrix = matriuBinaria()

    inicialitzaMines(rows, cols, mines);
}

//Exercici 2
function matriuBinaria() {
    ///Agafa els fills del <tbody>
    let rows = document.querySelector("tbody").children
    //Inicialitza una matrix
    let matrix = []
    //Recorre tots els fills de <tbody>
    for (var i = 0; i < rows.length; i++) {
        //Fica a la 'matrix' tots els fills de <tbody> 1 per 1
        matrix.push(rows[i].children)
    }
    // console.log("matriu", matrix);
    return matrix;
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


function inicialitzaMines(midaX, midaY, nMines) {
    //mines = [midaX][midaY];
    let color = "green";
    let numTotal = 0;
    if (midaX * midaY >= nMines) {
        do {
            let x = maxmin(0, midaX);
            let y = maxmin(0, midaY);
            if (matrix[x][y].style.background != color) {
                matrix[x][y].style.background = color;
                numTotal++;
            }
        } while (numTotal < nMines);
    }else{
        console.log("Se lo que intentabas");
    }
    return matrix;
}

//Comproba que pinta per 'x' & 'y', cridar despres de inicialitzaJoc()
function testColor(x, y) {
    matrix[x][y].style.background = "red";
}

function maxmin(min, max) {
    return parseInt(Math.random() * (max - min) + min);

}

