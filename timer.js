var velocity = 800;
var seconds = 0;
var appendSeconds = document.getElementById("timer");
var Interval;


//Inicia el contador
function startTime() {
    //
    resetTime();
   // clearInterval(Interval);
    Interval = setInterval(startTimer, velocity);
    document.getElementById("day-today").innerText  = getDateToday();
}

//Para de contar
function stopTime() {
    clearInterval(Interval);
}

//Fa reset del contador i el mostra
function resetTime() {
    clearInterval(Interval);
    seconds = "0";
    appendSeconds.innerHTML = "START";
}

//Inicia el temporitzador
function startTimer() {
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