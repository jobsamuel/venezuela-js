#!/usr/bin/env node

var vzla = require('./index');
var pkg = require('./package.json');
var updateNotifier = require('update-notifier');
var program = require('commander');
var colors = require('colors');
var bandera = '    ' +
    colors.yellow.bold('• ') +
    colors.blue.bold('• ') +
    colors.red.bold('• ');
var respuesta;
var t1;
var t2;
var t3;
var t4;
var t5;

updateNotifier({pkg: pkg}).notify();

program
    .version(pkg.version)
    .usage('<estado|municipio|parroquia> [opciones]')
    .description(colors.yellow('Muestra información sobre el territorio Venezolano.'.bold))
    .option('-a, --ayuda', 'muestra cómo utilizar venezuela-js')
    .option('-c, --capital nombre', 'muestra la capital de la entidad')
    .option('-m, --municipio nombre', 'muestra la información de un municipio')
    .option('-p, --parroquia nombre', 'muestra la información de una parroquia')
    .parse(process.argv);

program.on('--help', function(){
  console.log('  Ejemplos:');
  console.log('');
  console.log('    $ venezuela --parroquia "San Juan"');
  console.log('    $ venezuela --capital');
  console.log('    $ venezuela Bolívar');
  console.log('');
});

if ((!program.args.length && program.capital) || program.args[0] === 'caracas') {
    respuesta = JSON.stringify(vzla.capital, null, 4);
} else if (process.argv.length <= 2 || program.ayuda) {
    return program.help();
} else if (program.capital) {
    if (vzla.estado(program.args[0]).capital) {
        respuesta = '    ' + vzla.estado(program.args[0]).capital;
    } else if (vzla.municipio(program.args[0]).capital) {
        respuesta = '    ' + vzla.municipio(program.args[0]).capital;
    } else if (vzla.parroquia(program.args[0]).capital) {
        respuesta = '    ' + vzla.parroquia(program.args[0]).capital;
    } else {
        respuesta = '    ' + program.args[0] + ' es un nombre inválido.';
    }
} else if (program.municipio) {
    respuesta = JSON.stringify(vzla.municipio(program.args[0]), null, 4);
} else if (program.parroquia) {
    respuesta = JSON.stringify(vzla.parroquia(program.args[0]), null, 4);
} else {
    if (!/Tal[ ]vez/.test(vzla.estado(program.args[0]))) {
        respuesta = vzla.estado(program.args[0])
        t1 = colors.white.bold('     ISO 31662    ');
        t2 = colors.white.bold('        ESTADO    ');
        t3 = colors.white.bold('       CAPITAL    ');
        t4 = colors.white.bold('    MUNICIPIOS    ');
        t5 = colors.white.bold('    PARROQUIAS    ');
        console.log('');
        console.log(bandera);
        console.log('');
        console.log(t1 + colors.yellow.bold(respuesta.iso_31662));
        console.log(t2 + colors.yellow.bold(respuesta.estado));
        console.log(t3 + colors.yellow.bold(respuesta.capital));
        console.log(t4 + colors.yellow.bold(respuesta.municipios));
        console.log(t5 + colors.yellow.bold(respuesta.parroquias));
        console.log('');
        return;
    } else if (!/Tal[ ]vez/.test(vzla.municipio(program.args[0]))) {
        respuesta = JSON.stringify(vzla.municipio(program.args[0]), null, 4);
    } else if (!/Tal[ ]vez/.test(vzla.parroquia(program.args[0]))) {
        respuesta = JSON.stringify(vzla.parroquia(program.args[0]), null, 4);
    } else {
        respuesta = '    ' + program.args[0] + ' es un nombre inválido.';
    }
}

console.log('');
console.log(bandera);
console.log('');
console.log(colors.white.bold(respuesta));
console.log('');