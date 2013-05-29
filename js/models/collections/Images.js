
define(['backbone', 'underscore', 'models/Image'], function(Backbone, _, Image) {

	/*Creamos una colección de imagenes*/
	Urb.Models.Collections.Images = Backbone.Collection.extend({
		/*Establecemos como modelo de la colección al modelo: Image*/
		model : Urb.Models.Image
	});

	return Urb.Models.Collections.Images;

});