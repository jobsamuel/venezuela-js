#!/usr/bin/env node

var vzla = require('./index');
var program = require('commander');
var path = require('path');
var pkg = require(path.join(__dirname, 'package.json'));

program
    .version(pkg.version)
    .usage('<nombre> [opciones]')
    .description('Muestra información sobre el territorio Venezolano.')
    .option('-c, --capital', 'Retorna la información de la capital.')
    .option('-m, --municipio', 'Retorna la información de un municipio.')
    .option('-p, --parroquia', 'Retorna la información de una parroquia.')
    .parse(process.argv);

var respuesta;

if ((!program.args.length && program.capital) || program.args[0] === 'caracas') {
    respuesta = JSON.stringify(vzla.capital, null, 2);
} else if (program.capital) {
    if (vzla.parroquia(program.args[0]).capital) {
        respuesta = vzla.parroquia(program.args[0]).capital;
    } else if (vzla.municipio(program.args[0]).capital) {
        respuesta = vzla.municipio(program.args[0]).capital;
    } else if (vzla.estado(program.args[0]).capital) {
        respuesta = vzla.estado(program.args[0]).capital;
    } else {
        respuesta = program.args[0] + ' es un nombre inválido.';
    }
} else if (program.municipio) {
    respuesta = JSON.stringify(vzla.municipio(program.args[0]), null, 2);
} else if (program.parroquia) {
    respuesta = JSON.stringify(vzla.parroquia(program.args[0]), null, 2);
} else if (!program.args.length) {
    return program.help();
} else {
    if (!program.args.length) {

    } else if (!/Tal[ ]vez/.test(vzla.estado(program.args[0]))) {
        respuesta =JSON.stringify(vzla.estado(program.args[0]), null, 2);
    } else if (!/Tal[ ]vez/.test(vzla.municipio(program.args[0]))) {
        respuesta = JSON.stringify(vzla.municipio(program.args[0]), null, 2);
    } else if (!/Tal[ ]vez/.test(vzla.parroquia(program.args[0]))) {
        respuesta = JSON.stringify(vzla.parroquia(program.args[0]), null, 2);
    } else {
        respuesta = program.args[0] + ' es un nombre inválido.';
    }
}

console.log(respuesta);