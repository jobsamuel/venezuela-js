var vzla = require('./venezuela.json');

function Venezuela () {
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
		// TODO: return municipio aleatorio de cualquier parte del país.
		return this.capital.municipio;
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
		// TODO: return parroquia aleatoria de cualquier parte del país.
		return this.capital.parroquia;
	} else if (nombre && typeof nombre !== 'string') {
		throw new Error('El nombre no puede ser ' + typeof nombre);
	}
	// TODO: return información detallada de la parroquia indicada.
	return vzla.map(function (p) {
        return p.municipios.map(function (_p) {
            return _p.parroquias.map(function (__p) { return __p });
        });
    });
}

module.exports = new Venezuela();