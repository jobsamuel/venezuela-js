#!/usr/bin/env node

'use strict';

const venezuela = require('./index');
const pkg = require('./package.json');
const updateNotifier = require('update-notifier');
const program = require('commander');
const colors = require('colors');

updateNotifier({pkg: pkg}).notify();

program
  .version(pkg.version)
  .usage('<estado|municipio|parroquia> [opciones]')
  .description(colors.yellow('Muestra información sobre el territorio Venezolano.'.bold))
  .option('-a, --ayuda', 'muestra cómo utilizar venezuela-js')
  .option('-c, --capital nombre', 'muestra la capital de la entidad')
  .option('-m, --municipio nombre', 'muestra la información de un municipio')
  .option('-p, --parroquia nombre', 'muestra la información de una parroquia')
  .option('-M, --municipios nombre', 'muestra todos los municipios de un estado')
  .parse(process.argv);

program.on('--help', () => {
  const mensaje = `
  Ejemplos:

    $ venezuela "Nueva Esparta"
    $ venezuela Zulia
    $ venezuela --capital
    $ venezuela --municipio Libertador
    $ venezuela --parroquia "San Juan"
    $ venezuela Bolívar -M
    $ venezuela Falcón -c
  `;

  console.log(mensaje);
});

const crear = (function () {
  return {
    bandera,
    entidad,
    entidades,
    listaDeMunicipios
  };

  function bandera() {
    const amarillo = colors.yellow.bold('▓▒');
    const azul = colors.blue.bold('▓▒');
    const rojo = colors.red.bold('▓▒');
    const bandera = `${amarillo}${azul}${rojo}`;

    return bandera;
  }

  function entidad(datos) {
    return Object.keys(datos).map(nombre => {
      const titulo = nombre.replace('_', ' ').toUpperCase();
      const contenido = String(datos[nombre]).toUpperCase();
      const tituloConEstilo = colors.white.bold(titulo);
      const contenidoConEstilo = colors.yellow.bold(contenido);

      return `${tituloConEstilo} ${contenidoConEstilo}`;
    }).join('\n');
  };

  function entidades(datos) {
    return datos.map(dato => entidad(dato)).join('\n\n');
  }

  function listaDeMunicipios(datos) {
    const titulo = `MUNICIPIOS DEL ESTADO ${datos.estado.toUpperCase()}`;
    const tituloConEstilo = colors.white.bold(titulo);
    const contenido = parrafo(datos.municipios);

    return `${tituloConEstilo}\n\n${contenido}`;
  }

  function parrafo(palabras) {
    const numeroDeGrupos = palabras.length / 3;
    let grupos = [];
    let parrafo;

    for (let n = 0; n < numeroDeGrupos; n++) {
      const grupo = palabras.slice(n*3, n*3+3)
        .map((palabra, indice) => indice === 0 ? palabra : ` • ${palabra}`);

      grupos = [...grupos, grupo];
    }

    parrafo = grupos.map(grupo => grupo.join(''))
      .reduce((parrafo, oracion) => `${parrafo}\n${oracion}`);

    return colors.yellow.bold(parrafo);
  }
})();

const mostrar = (function () {
  return {
    resultado: procesar
  };

  function procesar(datos) {
    let contenido;

    if (!datos) {
      contenido = colors.white.bold('Nombre inválido.');
    } else if (typeof datos === 'string') {
      contenido = colors.white.bold(datos);
    } else if (Array.isArray(datos)) {
      contenido = crear.entidades(datos);
    } else if (Array.isArray(datos.municipios)) {
      contenido = crear.listaDeMunicipios(datos);
    } else {
      contenido = crear.entidad(datos);
    }

    contenido = margen(`\n${crear.bandera()}\n\n${contenido}`);

    console.log(contenido);
  }

  function margen(texto) {
    return texto.split('\n')
      .map(oracion => `${' '.repeat(4)}${oracion}`).join('\n');
  }
})();

(function consultar() {
  const nombre = program.args ? program.args[0] : undefined;
  let necesitaAyuda = false;
  let datos;

  if (!nombre && program.capital) {
    datos = venezuela.capital;
  } else if (program.capital) {
    const data = (venezuela.estado(nombre) ||
      venezuela.municipio(nombre) ||
        venezuela.parroquia(nombre));

    datos = data ? data.capital : undefined;
  } else if (program.municipios) {
    datos = venezuela.estado(nombre, {municipios: true});
  } else if (program.municipio) {
    datos = venezuela.municipio(nombre);
  } else if (program.parroquia) {
    datos = venezuela.parroquia(nombre);
  } else if (program.ayuda || process.argv.length === 2) {
    necesitaAyuda = true;
  } else if (process.argv.length === 3) {
    datos = (venezuela.estado(nombre) ||
      venezuela.municipio(nombre) ||
        venezuela.parroquia(nombre));
  }

  necesitaAyuda ? program.help() : mostrar.resultado(datos);
})();
