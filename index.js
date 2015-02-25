var venezuela = require('./venezuela.json');

function Venezuela() {

	// Retorna información sobre las entidades que conforman
	// el territorio Venezuelano.
	function mapa(callback, argumento, sub_argumento){
		return venezuela.map(function (estado) {
			if (callback) {
				return callback(estado, argumento, sub_argumento);	
			} else {

				// Crea una lista de estados.
				return estado.estado;
			}
		});
	}

	// Crea una lista de municipios o parroquias correspondientes a un estado.
	function lista(array, selector, sub_selector) {
		return array[selector].map(function (sub_array) {
			return sub_array[sub_selector];
		});
	}
	
	// Coloca en mayúscula la primera letra de cada palabra.
	// (http://stackoverflow.com/a/196991/3366109)
	function formato(texto)
	{	
	    return texto.replace(/\w\S*/g, function(txt) {
	    	return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	    });
	}
	this.pais = venezuela;
	this.estados = mapa();
	this.estado = function(nombre) {

		// Retorna información sobre una entidad territorial específica.
		venezuela.filter(function(entidad) {
			var _nombre = formato(nombre);
			if (entidad.estado == _nombre) {
				var respuesta = {
					iso_31662: entidad.iso_31662,
					id_estado: entidad.id_estado,
					estado: entidad.estado,
					capital: entidad.capital,
					municipios: entidad.municipios.length
				}
				return console.log(respuesta);
			}
		})
	}
	this.municipios = mapa(lista, "municipios", "municipio");
	this.parroquias = mapa(lista, "municipios", "parroquias");
}

module.exports = new Venezuela();