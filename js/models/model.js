
/*Cambio el templateSettings de underscore para usar {{atributoModelo}} en mis plantillas*/
_.templateSettings = { interpolate : /\{\{(.+?)\}\}/g };


var App = {
	Models:{},
	Collections:{},
	MainViews:{},
	Views:{}
};

var Instances = {
	Models:{},
	Collections:{},
	MainViews:{},
	Views:{}
}

/*Creamos un modelo*/
App.Models.Image = Backbone.Model.extend({
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

/*Creamos una colección de imagenes*/
App.Collections.Images = Backbone.Collection.extend({
	/*Establecemos como modelo de la colección al modelo: Image*/
	model : App.Models.Image
});

/*Asignamos a la variable "imagesCollection" una instancia de nuestra Colección*/
Instances.Collections.imagesCollection = new App.Collections.Images();

/*Creamos la vista principal que contendrá nuestras vistas hijas*/
App.MainViews.GalleryView = Backbone.View.extend({
	/*Declaro el elemento principal de la vista*/
	el : $('#divGallery'),
	contador : 0,
	/*Defino la lista de eventos para nuestra vista principal*/
	events: {
		/*Defino el evento "click" en el elemento "#btnChoose" al ser disparado ejecutara la funcion "addImg" */
		"click #btnChoose" : "addImg"
	},
	initialize: function() {
		/*_.bindAll(this) hace que las funciones apunten siempre al "this" del objeto principal*/
		_.bindAll(this);
		/*Desde la vista escuchamos cuando suceda el evento "add" en la colección y lanzamos la función addOne*/
		this.listenTo(Instances.Collections.imagesCollection, 'add', this.addOne);
		/*Desde la vista escuchamos cuando suceda el evento "remove" en la colección y lanzamos la función removeOne*/
		this.listenTo(Instances.Collections.imagesCollection, 'remove', this.removeOne);
	},
	/*Función "render" de la vista*/
	render : function(){
		/*Aqui renderizo la vista principal, la cargo con datos si deseo, en esta ocasión no la usamos*/
	},
	/*Función de la vista principal para agregar un modelo a la colección*/
	addImg: function(){
		this.contador++;
		/*Agregamos un modelo de datos nuevo a la colección*/
		Instances.Collections.imagesCollection.add({src: this.contador+'.jpg', title: this.contador});
	},
	/*Cuando hubo un "add" en la colección ejecutamos esta función y recibimos como parametro el modelo afectado*/
	addOne : function(modelo){
		/*Creamos una instancia de una vista hija y le pasamos su modelo recientemente creado*/
		var view = new App.Views.galleryRow({model : modelo});
		/*Appeneamos dentro de $('.dragger') el nuevo elemento que nos devuelve la función render de la vista hija*/
		//console.profile('selector');
		this.$('.dragger').append( view.render().el );
		//console.profileEnd('selector');
	},
	/*Cuando hubo un "remove" en la colección ejecutamos esta función y recibimos como parametro el modelo afectado*/
	removeOne : function(modelo){
		//Destruimos el modelo
		//console.profile('destr');
        modelo.destroy();
        //console.profileEnd('destr');
	}
});

/*Creamos la vista hija "galleryRow" para cada imagen independiente*/
App.Views.galleryRow = Backbone.View.extend({
	className : 'thumb',
	model : null,
	events: {
        "click .remove" : "deleteImage",
        "click .main" : "changeMain"
	},
	template : null,
	initialize: function(){
		_.bindAll(this);
		/*Al iniciar nuestra vista asignamos la plantilla en la variable "template"*/
		this.template = $.trim($('.tpl .thumb').html());
		/*Nos podemos a escuchar desde la vista hija actual cuando ocurra un evento "change" en el modelo y lanzamos la función "render" de la vista hija actual*/
		this.listenTo(this.model, 'change', this.render);
		/*Nos podemos a escuchar desde la vista hija actual cuando ocurra un evento "destroy" en el modelo y lanzamos la función "remove" de la vista hija actual*/
		this.listenTo(this.model, 'destroy', this.remove);
	},
	render : function(){
		var compiled_template = _.template(this.template);
		/*Traemos los datos del modelo(this.model.toJSON()) a su vista(this.$el) correspondiente*/
		this.$el.html(compiled_template(this.model.toJSON()));
		/*Retornamos this para poder usar el elemento generado*/
		return this;
	},
    deleteImage: function(){
    	/*Removemos el modelo seleccionado desde su colección correspondiente*/
    	Instances.Collections.imagesCollection.remove(this.model);
    },
    /*Función que cambia el contenido de un modelo desde la vista, para demostrar 
    que al cambiar un atributo de un modelo podemos renderizar la vista del modelo correspondiente*/
    changeMain: function(){
    	if (this.model.get('main')==1) {
    		this.model.setMain(0);
    	}else{
    		this.model.setMain(1);
    	}
    }
});

$(function() {
	/*Creamos una instancia de nuestra galería principal*/
	new App.MainViews.GalleryView({});
});