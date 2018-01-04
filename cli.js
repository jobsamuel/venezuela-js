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
let consulta;
let respuesta;

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

consulta = program.args ? program.args[0] : 'n/a';

if ((!consulta && program.capital) || (consulta && consulta.toLowerCase() === 'caracas')) {
  respuesta = JSON.stringify(venezuela.capital, null, 4);
} else if (program.ayuda || process.argv.length <= 2) {
  return program.help();
} else if (program.capital) {
  if (venezuela.estado(consulta).capital) {
    respuesta = `    ${venezuela.estado(program.args[0]).capital}`;
  } else if (venezuela.municipio(consulta).capital) {
    respuesta = `    ${venezuela.municipio(consulta).capital}`;
  } else if (venezuela.parroquia(consulta).capital) {
    respuesta = `    ${venezuela.parroquia(consulta).capital}`;
  } else {
    respuesta = `    ${consulta} es un nombre inválido.`;
  }
} else if (program.municipio) {
  respuesta = JSON.stringify(venezuela.municipio(consulta), null, 4);
} else if (program.parroquia) {
  respuesta = JSON.stringify(venezuela.parroquia(consulta), null, 4);
} else if (program.municipios && process.argv.length > 3) {
  if (typeof venezuela.estado(consulta) === 'object') {
    const datos = venezuela.estado(consulta, { municipios: true });
    const estado = datos.estado.toUpperCase();
    const titulo = colors.white.bold(`MUNICIPIOS DEL ESTADO ${estado}`);

    respuesta = `\n  ${titulo}\n\n  ${parrafo(datos.municipios)}`;
  } else {
    respuesta = `    ${consulta} es un nombre inválido.`;
  }
} else if (consulta) {
  if (typeof venezuela.estado(consulta) === 'object') {
    const datos = venezuela.estado(consulta)
    const subtitulo1 = colors.yellow.bold(datos.iso_31662);
    const subtitulo2 = colors.yellow.bold(datos.estado);
    const subtitulo3 = colors.yellow.bold(datos.capital);
    const subtitulo4 = colors.yellow.bold(datos.municipios);
    const subtitulo5 = colors.yellow.bold(datos.parroquias);
    const titulo1 = colors.white.bold(`   ISO 31662    ${subtitulo1}`);
    const titulo2 = colors.white.bold(`      ESTADO    ${subtitulo2}`);
    const titulo3 = colors.white.bold(`     CAPITAL    ${subtitulo3}`);
    const titulo4 = colors.white.bold(`  MUNICIPIOS    ${subtitulo4}`);
    const titulo5 = colors.white.bold(`  PARROQUIAS    ${subtitulo5}`);

    respuesta = `${titulo1}\n${titulo2}\n${titulo3}\n${titulo4}\n${titulo5}`
  } else if (typeof venezuela.municipio(consulta) === 'object') {
    respuesta = JSON.stringify(venezuela.municipio(consulta), null, 4);
  } else if (typeof venezuela.parroquia(consulta) === 'object') {
    respuesta = JSON.stringify(venezuela.parroquia(consulta), null, 4);
  } else {
    respuesta = `    ${consulta} es un nombre inválido.`;
  }
} else {
  respuesta = '    Debes ingresar un nombre.';
}

const mensaje = `  ${bandera}\n${respuesta}`;

console.log(mensaje);

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
