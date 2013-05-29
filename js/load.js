

/*Asignamos a la variable "imagesCollection" una instancia de nuestra Colección*/
Ins.Models.Collections.imagesCollection = new Urb.Models.Collections.Images();

$(function() {
	/*Creamos una instancia de nuestra galería principal*/
	new Urb.Views.Modules.GalleryView({});
});

