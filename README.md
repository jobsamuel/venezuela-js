# venezuela-js [![npm version](https://badge.fury.io/js/venezuela.svg)](http://badge.fury.io/js/venezuela) [![npm](https://img.shields.io/npm/dt/venezuela.svg)]() [![npm](https://img.shields.io/npm/l/venezuela.svg)]()

> Analiza, verifica, utiliza y muestra la organización territorial de Venezuela con Javascript.

# instalación

```bash
$ npm install venezuela
```

# uso

Ejemplo.js
```js
var venezuela = require('venezuela');

var mcbo = venezuela.municipio('Maracaibo');

console.log(mcbo);
```

El resultado será algo así

```json
{
  "municipio": "Maracaibo",
  "capital": "Maracaibo",
  "estado": "Zulia",
  "parroquias": [
    "Antonio Borjas Romero",
    "Bolívar",
    "Cacique Mara",
    "Carracciolo Parra Pérez",
    "Cecilio Acosta",
    "Cristo de Aranza",
    "Coquivacoa",
    "Chiquinquirá",
    "Francisco Eugenio Bustamante",
    "Idelfonzo Vásquez",
    "Juana de Ávila",
    "Luis Hurtado Higuera",
    "Manuel Dagnino",
    "Olegario Villalobos.",
    "Raúl Leoni",
    "Santa Lucía",
    "Venancio Pulgar",
    "San Isidro"
  ]
}
```

# api

[Documentación del API de venezuela-js](DOCUMENTACION.md)

# licencia

Licencia [MIT](http://opensource.org/licenses/MIT) :copyright: Jobsamuel Núñez
