# Puntuació

A continuació afegirem puntuació al joc.

# Exercici 1
Afegiu un comptador del temps que està passant mentre es juga una partida.
Feu servir la funció `setInterval` i els mètodes de `Date`

# Exercici 2
Quan es guanyi el joc volem que demani un nom i desi a una taula la seva puntuació.


# Puntuació, segona part

Hem afegit una taula de puntuacions, però es perd cada cop que tanquem la pestanya.
Cal desar aquesta informació de manera permanent.

El navegador ens proporciona 2 funcionalitats principals per a fer-ho:

- galetes (cookies)
- emmagatzemament local (localStorage)

Les galetes són una peça d'informació en forma de clau valor:
"usuari: gerard"
Aquesta informació es pot enviar al servidor web i el servidor web la pot canviar. D'aquesta manera podem implementar un estat de la nostra aplicació (per exemple un login).

Per accedir a les galetes fem servir:
```
document.cookie
```

Si afegim una nova clau valor:

```
document.cookie = "usuari: gerard"
```

Això es concatenarà a les galetes ja existents.

Més informació a [https://www.w3schools.com/js/js_cookies.asp](https://www.w3schools.com/js/js_cookies.asp)

Si la informació que volem desar no cal compartir-la amb el navegador és més adient fer servir localStorage:

Podem desar una clau/valor a local storage:

```
localStorage.setItem("usuari","gerard")
``` 
I recuperar-la:

```
localStorage.getItem("usuari")
"gerard"
```

la informació desada amb localStorage es desa *només al client* i no s'envia mai al servidor.

Tant les galetes com el localStorage es desen per *cada pàgina web*.

# Exercici 3

Fes que la informació de puntuació es desi de manera permanent fent servir localStorage.


# Extres

Per acabar afegirem alguna funcionalitat extra al joc.

Tenim les següents opcions:

# Opció 1 - 1 punt

Fes que es pugui escollir amb un desplegable el tipus de joc:

- 9x9, 10 mines
- 9x9, 35 mines
- 16x16, 99 mines
- 30x16, 99 mines
- 30x16, 170 mines

a part dels 3 inputs on podràs escollir un joc de mida personalitzada.

# Opció 2  - 2 punts

Ara mateix el joc, sempre destapa totes les cel·les del voltant de la que prems.
Fes que es destapin totes les cel·les juntes que tinguin 0's.

Per fer això necessitaràs un algoritme anomenat flood fill:

https://en.wikipedia.org/wiki/Flood_fill

# Opció 3 - 2 punts

Afegeix pistes al joc.

- Quan es premi una cel·la amb els 2 botons del ratolí alhora volem que ressalti (sense destapar) les cel·les del voltant.
- Quan una cel·la tingui exactament el mateix nombre de veïns marcats que el seu número, feu que els dos botons del ratolí a la vegada destapin els veïns restants.
- Quan marquem més mines del compte al voltant d'un número, volem que aquell número es mostri en vermell.

# Opció 4 - 2 punts

Afegeix uns botons per desfer i refer els moviments.


Feu servir aquest Pescamines de [referència](https://www.chiark.greenend.org.uk/~sgtatham/puzzles/js/mines.html)


# Puntuació

La puntuació serà la següent:

Funcionalitats implementades correctament (*5 punts*):

- Es crea el taulell: 0.6666 punts
- Es posen mines: 0.6666 punts
- Es poden destapar les cel·les: 1.5 punts
- Es pot guanyar i perdre: 0.6666 punts
- Es puntua el joc i es desen les puntuacions: 1.5 punts

*2 punts* reservats per puntuar la implementació.
Fins a *4 punts* de funcionalitats extres.

