var venezuela = require('./venezuela.json');

function Venezuela() {
	function mapa(estados, municipios, parroquias) {
		return venezuela.map(function (estado) {
			if (estados) {
				return estado.estado;
			} else if (municipios) {
				return estado.municipios.map(function (municipio) {
					return municipio.municipio;
				});
			} else {
				return estado.municipios.map(function (municipio) {
					return municipio.parroquias.map(function (parroquia) {
						return parroquia;
					});
				});
			}
		});
	}
	this.pais = venezuela;
	this.estados = mapa(true);
	this.municipios = mapa(null, true);
	this.parroquias = mapa(null, null, true);
}

module.exports = new Venezuela();