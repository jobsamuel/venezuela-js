var venezuela = require('./venezuela.json');

function Venezuela() {
	function mapa(callback, argumento, sub_argumento){
		return venezuela.map(function (estado) {
			if (callback) {
				return callback(estado, argumento, sub_argumento);	
			} else {
				return estado.estado;
			}
		});
	}
	function lista(array, selector, sub_selector) {
		return array[selector].map(function (sub_array) {
			return sub_array[sub_selector];
		});
	}
	this.pais = venezuela;
	this.estados = mapa();
	this.municipios = mapa(lista, "municipios", "municipio");
	this.parroquias = mapa(lista, "municipios", "parroquias");
}

module.exports = new Venezuela();