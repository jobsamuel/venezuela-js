var vzla = require('./venezuela');

function Venezuela () {
    this.pais = vzla;
	this.capital = {
		iso_31662: vzla[23].iso_31662,
  		estado: vzla[23].estado,
  		capital: vzla[23].capital,
  		municipio: vzla[23].municipios[0].municipio,
  		parroquias: vzla[23].municipios[0].parroquias
	};
	this.estados = 24;
	this.municipios = 335;
	this.parroquias = 1139;
}

// Quita acentos de las palabras.
function formato (nombre) {
    var r;
    var _p = 'aeiou';
    var _l = ['á', 'é', 'í', 'ó', 'ú'];
    var re = function (l, p) {
        _l.forEach(function (__l, n) {
            if (__l === l) {
                r = _p[n];
            }
        });
        return r;
    }
    return nombre.toLowerCase().replace(/á|é|í|ó|ú/g, re);
}

function aleatorio (tipo) {

    var e = vzla[Math.floor(Math.random() * (23 - 1) + 1)];
    var m = e.municipios;
    var _m = m[Math.floor(Math.random() * (m.length - 2) + 1)];
    var p = _m.parroquias;
    var _p = p[Math.floor(Math.random() * (p.length - 2) + 1)];
    var r;

    if (tipo === 'municipio') {
        r = _m;
        r.estado = e.estado;
        return r;
    } else if (tipo === 'parroquia') {
        return {
            parroquia: _p,
            municipio: _m.municipio,
            capital: _m.capital,
            estado: e.estado
        }
    }
}

Venezuela.prototype.estado = function (nombre, opciones) {
	if (!nombre) {
		return this.capital;
	} else if (nombre && typeof nombre !== 'string') {
		throw new Error('El nombre no puede ser ' + typeof nombre);
	}

	function contador (municipios) {
	    var m = municipios.map(function (p) {
            return p.parroquias.map(function (_p) { return _p }).length;
        });
		return m.reduce(function (a, b) { return a + b } );
	}

	var resultado;

	vzla.some(function (edo) {
		var _nombre = formato(nombre);
		var _estado = formato(edo.estado);
		if (_estado === _nombre) {
			resultado = {
				iso_31662: edo.iso_31662,
				estado: edo.estado,
				capital: edo.capital,
				municipios: edo.municipios.length,
				parroquias: contador(edo.municipios)
			};
			return true;
		}
	});

	return resultado || nombre + ' no es un Estado. Tal vez sea una Ciudad';
}

Venezuela.prototype.municipio = function (nombre, opciones) {
	if (!nombre) {
        return aleatorio('municipio');
	} else if (nombre && typeof nombre !== 'string') {
		throw new Error('El nombre no puede ser ' + typeof nombre);
	}

	var resultado;

	vzla.forEach(function (e) {
		e.municipios.some(function (m) {
			var _nombre = formato(nombre);
			var _municipio = formato(m.municipio);
			if (_municipio === _nombre) {
				resultado = {
					municipio: m.municipio,
					capital: m.capital,
					estado: e.estado,
					parroquias: m.parroquias
				};
				return true;
			}
		});
	});

	return resultado || nombre + ' no es un Municipio. Tal vez sea una Parroquia';
}

Venezuela.prototype.parroquia = function (nombre, opciones) {
	if (!nombre) {
		return aleatorio('parroquia');
	} else if (nombre && typeof nombre !== 'string') {
		throw new Error('El nombre no puede ser ' + typeof nombre);
	}

	var resultados = [];

    vzla.map(function (p) {
        p.municipios.map(function (_p) {
            return _p.parroquias.filter(function (__p) {
            	var resultado;
            	var _nombre = formato(nombre);
				var _parroquia = formato(__p);
				if (_parroquia === _nombre) {
					resultado = {
						parroquia: __p,
						municipio: _p.municipio,
						capital: _p.capital,
						estado: p.estado
					};
                    resultados.push(resultado);
                    return true;
				}
            });
        });

    });

    if (!resultados[0]) {
        return nombre + ' no es una Parroquia. Tal vez sea un Municipio.';
    }

    return resultados;
}

module.exports = new Venezuela();