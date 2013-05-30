
/*
Modelo Backbone
*/

var Imagen = Backbone.Model.extend({
	defaults: {
		alt : '',
		src : 'none.jpg',
		main : 0
	},
	initialize : function(){

		//console.log('inicializando modelo');

		this.on('change:src', function(){
			console.log('el src nuevo es: '+ this.get('src'));
		});
		this.on('change:alt', this.changeAlt);
	},
	setSrc : function (src){
		this.set({'src' : src});
	},
	setAlt : function (alt){
		this.set({'alt' : alt});
	},
	changeAlt : function(){
		console.log('el alt nuevo es: '+ this.get('alt'));
	}
});

//var nuevoModelo = new Imagen({alt:'xxxx',src:'ttt'});
//nuevoModelo.setSrc('jaime.jpg');
//console.log(nuevoModelo);


/*
Colleccion Imagenes
*/
var Imagenes = Backbone.Collection.extend({
	model : Imagen,
	initialize : function(){
		this.on('add' , function(model){
			console.log('agregando un nuevo modelo a la Collection');
		});
		this.on('remove' , function(){
			
		});
	}
});


/*
Methods

	GET, POST, PUT, REMOVE

*/


var imgCol= new Imagenes();

/* select * from images order by alt desc limit 4 */



imgCol.add([
	{alt:'nuevo alt', src : 'nuevo src', main : 1},
	{alt:'nuevo alt 2', src : 'nuevo src 2', main : 1},
	{alt:'nuevo alt 3', src : 'nuevo src 3', main : 1}
]);


console.log(imgCol);


/*
Vista
*/

var GalleryView = Backbone.View.extend({
	el : $('#divGallery'),
	/*Defino la lista de eventos para nuestra vista principal*/
	events: {
	/*Defino el evento "click" en el elemento "#btnChoose" al ser disparado ejecutara la funcion "addImg" */
		"click #btnChoose" : "addImg"

	},
	initialize: function() {
		
	},
	/*Función "render" de la vista*/
	render : function(){
	/*Aqui renderizo la vista principal, la cargo con datos si deseo, en esta ocasión no la usamos*/

	}

});



new GalleryView();









