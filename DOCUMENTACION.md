# documentación

> Documentación completa del API de venezuela-js

## instalación

Puedes instalar **venezuela-js** globalmente para utilizarlo en la terminal.

```bash
$ npm install -g venezuela
```

También puedes instalarlo localmente para utilizarlo sólo en tu proyecto.


```bash
$ npm install venezuela
```

## uso

#### global (en tu terminal)


```bash
$ venezuela Zulia
```

![Estado](http://i.imgur.com/LciVjJf.png)

#### local

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

## propiedades

### venezuela.pais

Retorna **todos** los estados, municipios y parroquias de Venezuela.

### venezuela.capital

Retorna los detalles de la capital de Venezuela.

### venezuela.estados

Retorna el número de estados que posee el territorio Venezolano.

### venezuela.municipios

Retorna el número de municipios que posee el territorio Venezolano.

### venezuela.parroquias

Retorna el número de parroquias que posee el territorio Venezolano.

## métodos

### venezuela.estado(nombre)

Retorna un *Objeto* los detalles de un estado Venezolano.

#### argumentos

`nombre` Nombre del estado Venezolano deseado. Debe ser un *string*.

#### ejemplo

Al hacer esto:

```js
var z = venezuela.estado('Zulia');
console.log(z);
```
El resultado será:
```json
{
  "iso_31662": "VE-V",
  "estado": "Zulia",
  "capital": "Maracaibo",
  "municipios": 21,
  "parroquias": 106
}
```

### venezuela.municipio(nombre)

Retorna un *Objeto* los detalles de un municipio Venezolano.

#### argumentos

`nombre` Nombre *opcional* del municipio Venezolano deseado. Debe ser un *string*. De no suministrarse ningún nombre, el método retorna un municipio aleatorio.

#### ejemplo

Al hacer esto:

```js
var l = venezuela.municipio('Libertador');
console.log(l);
```
El resultado será:
```json
{
  "municipio": "Libertador",
  "capital": "Caracas",
  "estado": "Distrito Capital",
  "parroquias": [
    "23 de enero",
    "Altagracia",
    "Antímano",
    "Caricuao",
    "Catedral",
    "Coche",
    "El Junquito",
    "El Paraíso",
    "El Recreo",
    "El Valle",
    "Candelaria",
    "La Pastora",
    "La Vega",
    "Macarao",
    "San Agustín",
    "San Bernardino",
    "San José",
    "San Juan",
    "San Pedro",
    "Santa Rosalía",
    "Santa Teresa",
    "Sucre (Catia)"
  ]
}
```

### venezuela.parroquia(nombre)

Retorna un *Arreglo* con los detalles de una o varias parroquias Venezolanas; si existe más de una parroquia con el mismo nombre, retorna todas las coincidencias.

#### argumentos

`nombre` Nombre *opcional* de la parroquia Venezolana deseada. Debe ser un *string*. De no suministrarse ningún nombre, el método retorna una parroquia aleatoria.

#### ejemplo

Al hacer esto:

```js
var p = venezuela.parroquia('San Juan');
console.log(p);
```
El resultado será:
```json
[
  {
    "parroquia": "San Juan",
    "municipio": "Sucre",
    "capital": "Lagunillas",
    "estado": "Mérida"
  },
  {
    "parroquia": "San Juan",
    "municipio": "Sucre",
    "capital": "Cumaná",
    "estado": "Sucre"
  },
  {
    "parroquia": "San Juan",
    "municipio": "Libertador",
    "capital": "Caracas",
    "estado": "Distrito Capital"
  }
]
```

# licencia

Licencia [MIT](http://opensource.org/licenses/MIT) :copyright: Jobsamuel Núñez