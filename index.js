//Matrix a de ser global per reutilizar
var matrixTable = null;
var matrixMines = null;
var matriuBinari = null;
var matriuClicat = null;
//https://learnersbucket.com/examples/algorithms/flood-fill-algorithm-in-javascript/
var colorMina = "lightblue";
var nMines = 8;

//Variables timer
var velocity = 800;
var seconds = 0;
var Interval;

//Busca mina
var numMinesTrobades = 0;
var totalMines = null;
var totalLliures = null;
var totalCaselles = null;
var isInput = true;
let mrows = null;
let mcols = null;
//Exercici 2
function inicialitzaJoc() {
    //Esborra la taula creada (si ha sigut creada)
    erase();
    let typeHtml = document.getElementById('selecttaula').selectedOptions[0].value;
    if (typeHtml == "0") {
        mrows = parseInt(document.getElementById('inputRow').value);
        mcols = parseInt(document.getElementById('inputCol').value);
        nMines = parseInt(document.getElementById('inputMines').value);
    } else {
        //Utilitza els valos del deplegable
        //Omple mrows, mcols, nmines
        newGameWithThisTable();
    }
    //Guarda cuantes caselles hi han en total
    totalCaselles = mrows * mcols;

    //Indica la quantitat de mines
    document.getElementById('git').innerText = "Hi han " + nMines + " mines. Taulell: " + mrows + "x" + mcols + "";

    //Crea una taula
    const tbl = document.createElement("table");
    //Crea un element <tbody>
    const tblBody = document.createElement("tbody");
    //Crea tants <tr> com rows
    for (let i = 0; i < mrows; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < mcols; j++) {
            //Crea tants <td> com cols
            let cell = document.createElement("td");
            //Posa una id
            cell.id = i + '-' + j;
            //Un padding buit es veu estrany al ficar el un buit
            cell.innerHTML = "&nbsp";
            //Crida la funcion dins de a variable 'funcionClicar'
            cell.onclick = funcionClickIzquierdo;
            cell.oncontextmenu = funcionClickDerecho;
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
    console.log("Taulell creat");

    //Emplena la variable matrix
    matrixTable = matriuHTML()
    matrixBinari = matriuBinaria(mrows, mcols);
    matrixMines = inicialitzaMines(mrows, mcols, nMines);

    //Prepara la matriu de clicat per a la funcion recursiva
    matriuClicat = matrixMines;

    //explotarMines();   
}


//Aquesta funcio es crida al cambiard
function mostraInputs() {
    let typeHtml = document.getElementById('selecttaula').selectedOptions[0].value;
    let inrow = document.getElementById("inputRow");
    let incol = document.getElementById("inputCol");
    if (typeHtml == "0") {
        inrow.style.display = "inline";
        incol.style.display = "inline";
    } else {
        inrow.style.display = "none";
        incol.style.display = "none";
    }
}

//li posa la funciona a cada cella per event
var funcionClickIzquierdo = function (event) {
    let pos = (event.target.id).split("-");
    if (matrixMines[pos[0]][pos[1]] == 1) {
        console.log("Era una mina: (" + pos[0] + ', ' + pos[1] + ")");
        //Descobreix totes les mines
        explotarMines();
    } else {
        // Pinta un cercle al voltant de la casella selecionada
        console.log('NO era una mina:');
        // Pinta les caselles del voltant i el numero 0 a color
        //RECURSIVO
        fillMatrix1(matriuClicat, parseInt(pos[0]), parseInt(pos[1]));
    }
};

function minesTrobades() {
    let totalMines = nMines;
    let casellesSenseMines = totalCaselles - nMines;
    numMinesTrobades++;
    console.log("Trobada:", numMinesTrobades, "Total:", totalMines, "Has de trobal", casellesSenseMines);
    if (casellesSenseMines == numMinesTrobades) {
        stopTime();
        console.log("GUANYADOR");
        document.getElementById("guanyador").style.display = "block";
    }
}
//Posa bandereta al click dret casella
var funcionClickDerecho = function (event) {
    let pos = (event.target.id).split("-");
    let i = parseInt(pos[0]);
    let j = parseInt(pos[1]);
    matrixTable[i][j].innerHTML = "🚩";
}



//Exercici 2
function matriuHTML() {
    ///Agafa els fills del <tbody>
    let rows = document.querySelector("tbody").children;
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
        //Acabat el bucle 'taulell' no tindria cap fill
    }

    // Reinicia el joc
    totalMines = 0;
    totalLliures = 0;
    totalCaselles = 0;
    numMinesTrobades = 0;
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
    document.getElementById('git').innerText = "Has perdut: Game Over";
    for (let i = 0; i < matrixTable.length; i++) {
        //fallabaesto matrixTable 
        for (let j = 0; j < matrixTable[i].length; j++) {
            if (matrixMines[i][j] == 1) {
                matrixTable[i][j].style.background = "red";
                matrixTable[i][j].innerText = "BOOM";
            }

            // Desactiva tots el  td
            matrixTable[i][j].disabled = true;

        }
    }

    //Para el temps
    stopTime()
}

function maxmin(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}

/* COPIA D'EXERCICIS ANTERIORS */
// Pinta un cercle al voltant de la casella selecionada
function fillMatrix1(matrix, row, col) {


 

    if (!validCoordinates(matrix, row, col))
        return;

    if (matrix[row][col] == 1)
        return;

    let count =  countNeighbours(matrix, matrixTable,row, col);
    matrixTable[row][col].innerText = count;
    matrixTable[row][col].style.background = colorMina;

    matrix[row][col] = 1;
    minesTrobades();

    fillMatrix1(matrix, row + 1, col);
    fillMatrix1(matrix, row - 1, col);
    fillMatrix1(matrix, row, col + 1);
    fillMatrix1(matrix, row, col - 1);


}

//https://codeguppy.com/blog/flood-fill/index.html
function validCoordinates(matrix, row, col) {
    return (row >= 0 && row < matrix.length && col >= 0 && col < matrix[row].length);}

// https://codeberg.org/ksama/matrius-kevin-part2/src/branch/master/matrius.js
/* COPIA D'EXERCICIS ANTERIORS */
function countNeighbours(matriuClica, matriuHTML,x, y) {
    let count = 0;
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            //Fila mes gran a o igual a 0 i mes petita que la fila(taula)  
            //Columna mes gran a i igual 0 i mes petita que la columna (taula)
            if ((0 <= i && i < matriuHTML.length) && (0 <= j && j < matrixTable[0].length)) {
                /*if ((matrixTable[i][j].style.backgroundColor) == "red") { count++;}*/
                //Ara no ha de contar les pintades, ha de mirar la matrix mines
                if (matriuClica[i][j] == 1) {
                    count++;
                }
            }
        }
    }
    return count;
}
/* COPIA D'EXERCICIS ANTERIORS */
function paintAllNeighbours() {
    //BORRAR FUNCION
    explotarMines();
    //Fa el bucle per buscar 
    for (let i = 0; i < matrixTable.length; i++) {
        for (let j = 0; j < matrixTable[i].length; j++) {
            let count = countNeighbours(i, j);
            matrixTable[i][j].innerText = count;
        }
    }
}

//Inicia el contador
function startTime() {
    //
    resetTime();
    // clearInterval(Interval);
    Interval = setInterval(startTimer, velocity);
    document.getElementById("day-today").innerText = getDateToday();
}

//Para de contar
function stopTime() {
    clearInterval(Interval);
}

//Fa reset del contador i el mostra
function resetTime() {
    let appendSeconds = document.getElementById("timer");
    clearInterval(Interval);
    seconds = "0";
    appendSeconds.innerHTML = "START";
}

//Inicia el temporitzador
function startTimer() {
    let appendSeconds = document.getElementById("timer");
    if (seconds < 10) {
        //Si els segons son menos a 10, es mostra 01, 02
        appendSeconds.innerHTML = "0" + seconds;
    } else {
        //Si els segons son major a 10, es mostra 11,12,13
        appendSeconds.innerHTML = seconds;
    }
    seconds++;
}

//Retorna la date de avui
function getDateToday() {
    const d = new Date();
    day = d.getDate();
    month = d.getMonth() + 1;
    year = d.getFullYear();
    return `${day}/${month}/${year}`
}

function onWinUser() {
    let nom = document.getElementById("nom-guanyar").value;
    if (nom != "") {
        localStorage.setItem(nom, seconds);
    } else {
        alert("Omple el camp 'nom'");
    }
    document.getElementById("guanyador").style.display = "none";

    //Mostra la taula de resultats
    let score = document.getElementById("puntuacio");
    generateListScore(score);
}

//Crea Score
function generateListScore(father) {
    //Borra la llista anterior
    while (father.firstChild) {
        taulell.removeChild(taulell.firstChild);
        //Acabat el bucle 'taulell' no tindria cap fill
    }


    //Llista tots el localStorage
    let lStorage = Object.keys(localStorage);
    let lValue = Object.values(localStorage);
    //Crea la taula
    let taula = document.createElement("table");
    let headtitol = document.createElement("tr");
    let td1 = document.createElement("th");
    td1.innerText = "Name";
    let td2 = document.createElement("th");
    td2.innerText = "Time";
    headtitol.appendChild(td1);
    headtitol.appendChild(td2);
    taula.appendChild(headtitol);
    for (let i = 0; i < lStorage.length; i++) {
        let tr1 = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.innerText = lStorage[i]
        let td2 = document.createElement("td");
        td2.innerText = lValue[i]
        tr1.appendChild(td1)
        tr1.appendChild(td2)
        taula.appendChild(tr1);
    }
    father.appendChild(taula)
}

function newGameWithThisTable() {
    let nvalue = document.getElementById('selecttaula').selectedOptions[0].value;
    switch (nvalue) {
        case "1":
            mrows = 9;
            mcols = 9;
            nMines = 10;
            break;
        case "2":
            mrows = 9;
            mcols = 9;
            nMines = 35;
            break;
        case "3":
            mrows = 16;
            mcols = 16;
            nMines = 99;
            break;
        case "4":
            mrows = 30;
            mcols = 16;
            nMines = 99;
            break;
        case "5":
            mrows = 30;
            mcols = 16;
            nMines = 170;
            break;
        default:
            break;
    }

}