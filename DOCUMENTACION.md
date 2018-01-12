<p align="center">
    <img alt="venezuela-js" src="http://i.imgur.com/uJsAwbR.png" width="auto">
</p>
<p align="center" style="color:#707070;">
  Documentación completa del API de venezuela-js
</p>

---

# ¿por qué venezuela-js?

Nunca fui bueno para aprenderme todos los Estados y Capitales de mi país, así que, como me encanta [Node](https://nodejs.org/en/) y las cosas simples, decidí hacer un módulo que permitiera obtener la información de un Estado, Municipio o Parroquia de Venezuela con tan sólo escribir su nombre en la terminal o un script.

¿Te gustaría utilizarlo?

# índice

1. [Requisitos](#requisitos)
2. [Instalación](#instalación)
3. [Terminal](#terminal)
4. [API](#api)
5. [Referencias](#refencias)
7. [Licencia](#licencia)

# requisitos

Para comenzar, sólo necesitas tener [Node](https://nodejs.org/en/) instalado.

# instalación

Puedes instalar **venezuela-js** globalmente para utilizarlo en la terminal.

```bash
$ npm install -g venezuela
```

También puedes instalarlo localmente para sólo utilizarlo en tu proyecto.


```bash
$ npm install venezuela --save
```

# terminal

Luego de haber instalado **venezuela-js** globalmente, sólo tienes que escribir en la terminal el nombre del módulo más el nombre de un Estado, Municipio o Parroquia de la cual desees información. Por ejemplo:

```bash
$ venezuela Zulia
```

![Estado](https://i.imgur.com/96YB8rM.png)

#### uso

```bash
$ venezuela <estado|municipio|parroquia> [opciones]
```

#### opciones

Si deseas un **resultado específico**, por ejemplo, obtener información sobre la parroquia *Libertador* en vez del municipio que lleva el mismo nombre, puedes utilizar alguna de estas opciones:

```bash
$  -V, --version               # Muestra la versión del módulo
$  -a, --ayuda                 # Muestra cómo utilizar venezuela-js
$  -c, --capital <nombre>      # Muesta la capital de la entidad
$  -m, --municipio <nombre>    # Muesta información de un municipio Venezolano
$  -p, --parroquia <nombre>    # Muesta información de una parroquia Venezolana
$  -M, --municipios <nombre>   # Muesta todos los municipios de un estado
```

El `nombre` debe ser estar entre comillas si está compuesto por más de dos palabras, de resto puede ir sin ellas. Por ejemplo:

```bash
$ venezuela Zulia              # Muestra la informacion del Estado Zulia
$ venezuela "Nueva Esparta"    # Muestra la información del Estado Nueva Esparta
```

Cabe destacar, si el parámetro **nombre** no es suministrado, se muestra un resultado aleatorio.

# api

A continuación se presentan las propiedades y métodos del API de **venezuela-js** para que puedas sacarle el máximo provecho en tu proyecto.

## propiedades

### venezuela.pais

Retorna un *Objeto* con **todos** los estados, municipios y parroquias de Venezuela.

### venezuela.capital

Retorna un *Objeto* con los detalles de la capital de Venezuela.

### venezuela.estados

Retorna el *Número* de estados que posee el territorio Venezolano.

### venezuela.municipios

Retorna el *Número* de municipios que posee el territorio Venezolano.

### venezuela.parroquias

Retorna el *Número* de parroquias que posee el territorio Venezolano.

## métodos

### venezuela.estado(nombre, opciones)

Retorna un *Objeto* con los detalles de un estado Venezolano.

#### argumentos

`nombre` Nombre del estado Venezolano deseado. Debe ser un *String*.

`opciones` Configuración del resultado. Debe ser un *Objeto*.

  - `municipios` Retorna un *Array* con todos los municipios de un estado. Debe ser un *Boolean*. Por defecto, es `false`.

#### ejemplo

Al hacer esto:

```js
const z = venezuela.estado('Zulia');
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

Y si suministras el parámetro `opciones`:

```js
const z = venezuela.estado('Zulia', {municipios: true});
console.log(z);
```

Entonces el resultado será:
```json
{
  "iso_31662": "VE-V",
  "estado": "Zulia",
  "capital": "Maracaibo",
  "municipios": [
    "Almirante Padilla",
    "Baralt",
    "Cabimas",
    "Catatumbo",
    "Colón",
    "Francisco Javier Pulgar",
    "Páez",
    "Jesús Enrique Lossada",
    "Jesús María Semprún",
    "La Cañada de Urdaneta",
    "Lagunillas",
    "Machiques de Perijá",
    "Mara",
    "Maracaibo",
    "Miranda",
    "Rosario de Perijá",
    "San Francisco",
    "Santa Rita",
    "Simón Bolívar",
    "Sucre",
    "Valmore Rodríguez"
  ],
  "parroquias": 106
}
```

### venezuela.municipio(nombre, opciones)

Retorna un *Objeto* con los detalles de un municipio Venezolano.

#### argumentos

`nombre` Nombre *opcional* del municipio Venezolano deseado. Debe ser un *string*. De no suministrarse ningún nombre, el método retorna un municipio aleatorio.

`opciones` Configuración del resultado. Debe ser un *Objeto*.

  - `parroquias` Retorna un *Array* con todas las parroquias de un municipio. Debe ser un *Boolean*. Por defecto, es `false`.

#### ejemplo

Al hacer esto:

```js
const l = venezuela.municipio('Libertador');
console.log(l);
```
El resultado será:
```json
{
  "municipio": "Libertador",
  "capital": "Caracas",
  "estado": "Distrito Capital",
  "parroquias": 22
}
```

Y si suministras el parámetro `opciones`:

```js
const l = venezuela.municipio('Libertador', {parroquias: true});
console.log(l);
```
Entonces el resultado será:

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

Retorna un *Array* con los detalles de una o varias parroquias Venezolanas; si existe más de una parroquia con el mismo nombre, retorna todas las coincidencias.

#### argumentos

`nombre` Nombre *opcional* de la parroquia Venezolana deseada. Debe ser un *String*. De no suministrarse ningún nombre, el método retorna una parroquia aleatoria.

#### ejemplo

Al hacer esto:

```js
const p = venezuela.parroquia('San Juan');
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

# referencias

- [venezuela-json](https://github.com/zokeber/venezuela-json)

# licencia

Licencia [MIT](http://opensource.org/licenses/MIT) :copyright: 2018 Jobsamuel Núñez
