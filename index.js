'use strict';

const pais = require('./venezuela');

function venezuela() {
  const api = {
    pais,
    estado,
    municipio,
    parroquia,
    estados: 24,
    municipios: 335,
    parroquias: 1139,
    capital: estado(pais[23].estado)
  };

  return api;
}

// Quita acentos de las vocales.
function formato(nombre) {
  const x = 'aeiou';
  const y = 'áéíóú';

  return nombre.toLowerCase().replace(/á|é|í|ó|ú/g, letra => x[y.indexOf(letra)]);
}

// Retorna un Municipio o parroquia aleatoria.
function aleatorio(tipo) {
  const estado = pais[Math.floor(Math.random() * 24)];
  const municipios = estado.municipios;
  const municipio = municipios[Math.floor(Math.random() * municipios.length)];
  const parroquias = municipio.parroquias;
  const parroquia = parroquias[Math.floor(Math.random() * parroquias.length)];

  if (tipo === 'municipio') {
    return {
      municipio: municipio.municipio,
      capital: municipio.capital,
      estado: estado.estado,
      parroquias: parroquias.length
    };
  }

  if (tipo === 'parroquia') {
    return {
      parroquia,
      estado: estado.estado,
      municipio: municipio.municipio,
      capital: municipio.capital
    };
  }
}

// Retorna información sobre un Estado.
function estado(nombre, opciones) {
  if (!nombre) {
    return this.capital;
	}

  if (typeof nombre !== 'string') {
		throw new Error(`El nombre no puede ser '${typeof nombre}'`);
	}

  let resultado;

  pais.some(edo => {
    if (formato(edo.estado) === formato(nombre)) {
      resultado = {
				iso_31662: edo.iso_31662,
				estado: edo.estado,
				capital: edo.capital,
				municipios: detalles(edo.municipios),
				parroquias: contador(edo.municipios)
			};

			return true;
		}
	});

	return resultado;

  function detalles(municipios) {
    if (opciones && opciones.municipios) {
      return municipios.map(data => data.municipio);
    } else {
      return municipios.length;
    }
  }

  function contador(municipios) {
    return municipios.map(data => data.parroquias.length).reduce((a, b) => a + b);
  }
}

// Retorna información sobre un Municipio.
function municipio(nombre, opciones) {
  if (!nombre) {
    return aleatorio('municipio');
	}

  if (typeof nombre !== 'string') {
		throw new Error(`El nombre no puede ser '${typeof nombre}'`);
	}

	let resultado;

	pais.some(estado => {
		return estado.municipios.some(municipio => {
			if (formato(municipio.municipio) === formato(nombre)) {
				resultado = {
					municipio: municipio.municipio,
					capital: municipio.capital,
					estado: estado.estado,
					parroquias: detalles(municipio.parroquias)
				};

        return true;
			}
		});
	});

  return resultado;

  function detalles(parroquias) {
    if (opciones && opciones.parroquias) {
      return parroquias.map(data => data);
    } else {
      return parroquias.length;
    }
  }
}

// Retorna información sobre una Parroquia.
function parroquia(nombre, opciones) {
  if (!nombre) {
    return aleatorio('parroquia');
	}

  if (typeof nombre !== 'string') {
		throw new Error(`El nombre no puede ser '${typeof nombre}'`);
	}

	let resultados = [];

  pais.forEach(estado => {
    estado.municipios.forEach(municipio => {
      municipio.parroquias.forEach(parroquia => {
        if (formato(parroquia) === formato(nombre)) {
          let resultado = {
            parroquia,
            municipio: municipio.municipio,
            capital: municipio.capital,
            estado: estado.estado
          };

          resultados = [...resultados, resultado];
        }
      });
    });
  });

  return resultados[0] ? resultados : undefined;
}

module.exports = venezuela();
