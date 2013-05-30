define(['backbone'], function(Backbone) {
	/*Creamos un modelo*/
	var Image = Backbone.Model.extend({
		/*defino sus valores por defecto*/
		defaults : {
			main : 0,
			src : 'none.jpg',
			title : 'none'
		},
		/*Pseudo constructor del modelo, se ejecuta cuando un modelo es instanciado*/
		initialize : function(){
			/*Bindeamos un evento cuando es cambiado el atributo 'title' de nuestro modelo*/
			this.on('change:title', function(){
				console.log('se cambio el title a: '+this.get('title'));
			});
		},
		/*Agregamos al modelo funciones de manipulacion de sus atributos*/
		setSrc : function(src){
			/*Seteamos el atributo src desde un argumento src*/
			this.set({'src' : src});
		},
		setTitle : function(title){
			this.set({'title' : title});
		},
		setMain : function(main){
			this.set({'main' : main});
		}
	});
	return Image;
});