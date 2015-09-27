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

### venezuela.capital

Retorna los detalles de la capital de Venezuela.

### venezuela.estados

Retorna el número de estados que posee el territorio Venezolano.

### venezuela.estado(nombre)

Retorna un *Objeto* los detalles de un estado Venezolano.

`nombre` Nombre del estado Venezolano deseado. Debe ser un *string*.

### venezuela.municipios

Retorna el número de municipios que posee el territorio Venezolano.

### venezuela.municipio(nombre)

Retorna un *Objeto* los detalles de un municipio Venezolano.

`nombre` Nombre *opcional* del municipio Venezolano deseado. Debe ser un *string*. De no suministrarse ningún nombre, el método retorna un municipio aleatorio.

### venezuela.parroquias

Retorna el número de parroquias que posee el territorio Venezolano.

### venezuela.parroquia(nombre)

Retorna un *Arreglo* con los detalles de una o varias parroquias Venezolanas; si existe más de una parroquia con el mismo nombre, retorna todas las coincidencias.

`nombre` Nombre *opcional* de la parroquia Venezolana deseada. Debe ser un *string*. De no suministrarse ningún nombre, el método retorna una parroquia aleatoria.

# por hacer

- [x] Reescribir la clase Venezuela
- [x] Crear las siguientes propiedades:
    - [x] capital - retorna la capital de Venezuela.
    - [x] estados - retorna número estados Venezolanos.
    - [x] municipios - retorna número municipios Venezolanos.
    - [x] parroquias - retorna número parroquias Venezolanas.
- [x] Crear los siguientes métodos:
    - [x] estado - retorna los detalles de un estado.
    - [x] municipio - retorna los detalles de un municipio.
    - [x] parroquia - retorna los detalles de un parroquia.
- [x] Redactar la documentación.
- [x] Mejorar los métodos estado y parroquia.
    - [x] municipio - retornar un municipio aleatorio cuando no se coloque un *nombre*.
    - [x] parroquia - retornar una parroquia aleatoria cuando no se coloque un *nombre*.

# licencia

Licencia [MIT](http://opensource.org/licenses/MIT) :copyright: Jobsamuel Núñez
