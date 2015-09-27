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

`nombre` Nombre del estado Venezolano deseado. Debe ser un *string*.

### venezuela.municipio(nombre)

Retorna un *Objeto* los detalles de un municipio Venezolano.

`nombre` Nombre *opcional* del municipio Venezolano deseado. Debe ser un *string*. De no suministrarse ningún nombre, el método retorna un municipio aleatorio.

### venezuela.parroquia(nombre)

Retorna un *Arreglo* con los detalles de una o varias parroquias Venezolanas; si existe más de una parroquia con el mismo nombre, retorna todas las coincidencias.

`nombre` Nombre *opcional* de la parroquia Venezolana deseada. Debe ser un *string*. De no suministrarse ningún nombre, el método retorna una parroquia aleatoria.
