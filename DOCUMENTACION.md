# documentación

> Documentación completa del API de venezuela-js

## instalación

```bash
$ npm install venezuela
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