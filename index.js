//Matrix a de ser global per reutilizar
var matrix = null;

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
    matrix = matriuBinaria()
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

//Comproba que pinta per 'x' & 'y', cridar despres de inicialitzaJoc()
function testColor(x,y) {
    matrix[x][y].style.background = "red";
}