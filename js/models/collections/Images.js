
define(['backbone', 'underscore', 'models/Image'], function(Backbone, _, Image) {

	/*Creamos una colección de imagenes*/
	var Images = Backbone.Collection.extend({
		/*Establecemos como modelo de la colección al modelo: Image*/
		model : Image
	});

	return Images;

});