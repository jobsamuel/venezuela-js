#!/usr/bin/env node

const venezuela = require('./index');
const pkg = require('./package.json');
const updateNotifier = require('update-notifier');
const program = require('commander');
const colors = require('colors');
const amarillo = colors.yellow.bold('•');
const azul = colors.blue.bold('•');
const rojo = colors.red.bold('•');
const bandera = `${amarillo} ${azul} ${rojo}`;

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

// TODO: Mostrar resultado de una consulta.

function mostrarMunicipios(info) {
  const titulo = `MUNICIPIOS DEL ESTADO ${info.estado.toUpperCase()}`;
  const tituloConEstilo = colors.white.bold(titulo);
  const municipios = parrafo(info.municipios);
  const informacion = `${tituloConEstilo}\n\n${municipios}`;

  return informacion;
}

function mostrarEstado(info) {
  const titulos = ['ISO 31662', 'ESTADO', 'CAPITAL', 'MUNICIPIOS', 'PARROQUIAS'];

  const titulosConEstilo = titulos.map(titulo => {
    return colors.white.bold(titulo);
  });

  const infoConEstilo = Object.keys(info).map(nombre => {
    return colors.yellow.bold(info[nombre]);
  });

  const informacion = titulosConEstilo.map((titulo, index) => {
    return `${titulo}${' '.repeat(4)}${infoConEstilo[index]}`;
  }).join('\n');

  return informacion;
}

function consulta() {
  const consulta = program.args ? program.args[0] : undefined;
  const necesitaAyuda = 'n/a';

  if (!consulta && program.capital) {
    return venezuela.capital;
  } else if (program.capital) {
    return (venezuela.estado(consulta).capital ||
      venezuela.municipio(consulta).capital ||
        venezuela.parroquia(consulta).capital);
  } else if (program.municipios) {
    return venezuela.estado(consulta, {municipios: true});
  } else if (program.municipio) {
    return venezuela.municipio(consulta);
  } else if (program.parroquia) {
    return venezuela.parroquia(consulta);
  } else if (program.ayuda || process.argv.length === 2) {
    return necesitaAyuda;
  } else if (process.argv.length === 3) {
    return (venezuela.estado(consulta) ||
      venezuela.municipio(consulta) ||
        venezuela.parroquia(consulta));
  } else {
    return false;
  }
}

function parrafo (palabras) {
  const separador = colors.grey.bold('•');
  const numeroDeGrupos = palabras.length / 3;
  let grupos = [];
  let parrafo;

  for (let n = 0; n < numeroDeGrupos; n++) {
    const grupo = palabras.slice(n*3, n*3+3);
    const grupoConEstilo = grupo.map((palabra, indice) => {
      const palabraAmarilla = colors.yellow.bold(palabra);

      return indice === 0 ? palabraAmarilla : ` ${separador} ${palabraAmarilla}`;
    });

    grupos = [...grupos, grupoConEstilo];
  }

  parrafo = grupos.map(grupo => grupo.join())
    .reduce((parrafo, oracion) => `${parrafo}\n  ${oracion}`);

  return parrafo;
}
