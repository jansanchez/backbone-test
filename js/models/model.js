
/*cambio el template settings de underscore para usar {{dato}} en mis plantillas*/
_.templateSettings = { interpolate : /\{\{(.+?)\}\}/g };

/*Creamos un modelo*/
var Imagen = Backbone.Model.extend({
	/*defino sus valores por defecto*/
	defaults : {
		src : 'none.jpg',
		title : 'none',
		main : 0
	},
	/*defino el objeto vacio "view" para almacenar mi vista para este modelo*/
	view : null,
	/*pseudo constructor del modelo, se ejecuta cuando un modelo es instanciado*/
	initialize : function(){
		/*bindeamos un evento cuando es cambiado el atributo 'title' de nuestro modelo*/
		this.on('change:title', function(){
			console.log('se cambio el title a: '+this.get('title'));
		});
		/*bindeamos un evento global para cualquier cambio en el modelo, sea del atributo que sea*/
        this.on('change',function(model){
        	/*para cualquier cambio en un modelo, renderizamos la vista asociada a este*/
        	this.view.render();
        });
	},
	/*agregamos al modelo funciones de manipulacion de sus atributos*/
	setSrc : function(src){
		/*seteamos el atributo src desde un argumento src*/
		this.set({'src' : src});
	},
	setTitle : function(title){
		this.set({'title' : title});
	},
	setMain : function(main){
		this.set({'main' : main});
	}
});

/*Creamos una coleccionde imagenes*/
var Imagenes = Backbone.Collection.extend({
	/*establecemos como modelo de la coleccion al modelo: Imagen*/
	model : Imagen
});

/*Creamos la vista principal que contendra nuestras vistas hijas*/
var GalleryView = Backbone.View.extend({
	/*declaro el elemento principal de la vista*/
	el : $('#divGallery'),
	contador : 0,
	/*defino el objeto vacio "collection" para almacenar la instancia de la coleccion dentro de la vista principal*/
	collection: null,
	/*defino los eventos para la vista principal*/
	events: {
		/*defino el evento "click" en el elemento "#btnChoose" al ser disparado ejecutara la funcion "addImg" */
		"click #btnChoose" : "addImg"
	},
	initialize: function() {
		/*_.bindAll(this) hace que las funciones apunten siempre al "this" del objeto principal*/
		_.bindAll(this);
		/*escuchamos cuando suceda un "add" en la coleccion y lanzamos la funcion addOne*/
		this.collection.on("add", this.addOne);
		/*escuchamos cuando suceda un "remove" en la coleccion y lanzamos la funcion removeOne*/
		this.collection.on("remove", this.removeOne);
	},
	/*funcion "render" de la vista*/
	render : function(){
		/*aqui renderizo la vista principal, la cargo con datos si deseo, en esta ocacion no la uso*/
	},
	/*funcion de la vista principal para agregar un modelo a la coleccion*/
	addImg: function(){
		this.contador++;
		/*agregamos un modelo de datos nuevo a la coleccion*/
		this.collection.add({src: this.contador+'.jpg', title: this.contador});
	},
	/*cuando hubo un "add" en la coleccion ejecutamos esta funcion y recibimos como parametro el modelo afectado*/
	addOne : function(modelo){
		/*asignamos al modelo recientemente creado la instancia de su vista asociada
		y dentro de esta instancia le pasamos su modelo asociado, de esta forma conectamos la vista con el modelo
		y el modelo con la vista respectiva*/
		modelo.view = new galleryRow({model : modelo});
		/*realizamos un append de la nueva vista desde el elemento que devuelve la funcion render
		 a nuestro contenedor para las imagenes */
		this.$('.dragger').append(modelo.view.render().el);
	},
	/*cuando hubo un "remove" en la coleccion ejecutamos esta funcion y recibimos como parametro el modelo afectado*/
	removeOne : function(modelo){
		/*le quitamos los bindeos al modelo que eliminaremos*/
		modelo.off();
		/*remuevo la vista asociada al modelo*/
		modelo.view.remove();
		/*limpio el modelo*/
		modelo.clear();
	}
});

/*creamos una instancia de nuestra galeria*/
var mainView = new GalleryView({
	/*le pasamos en la variable "collection" una nueva instancia de nuestra coleccion "Imagenes"*/
	collection : (function(){
		return new Imagenes();
	})()
});

/*Creamos la vista hija galleryRow para cada imagen individual*/
var galleryRow = Backbone.View.extend({
	className : 'thumb',
	template : null,
	events: {
        "click .remove" : "deleteImage",
        "click .main" : "changeMain"
	},
	initialize: function(){
		_.bindAll(this);
		/*al iniciar nuestra vista almacenamos la plantilla a la variable "template"*/
		this.template = $.trim($('.tpl .thumb').html());
	},
	render : function(){
		var compiled_template = _.template(this.template);
		/*traemos los datos del modelo(this.model.toJSON()) a su vista(this.$el) correspondiente*/
		this.$el.html(compiled_template(this.model.toJSON()));
		/*por best practice retornamos this*/
		return this;
	},
    deleteImage: function(){
    	/*removemos el modelo seleccionado desde su coleccion correspondiente*/
    	this.model.collection.remove(this.model);
    },
    /*funcion que cambia el contenido de un modelo desde la vista, para demostrar 
    que al cambiar un atributo de un modelo podemos renderizar la vista del modelo correspondiente*/
    changeMain: function(){
    	if (this.model.get('main')==1) {
    		this.model.setMain(0);
    	}else{
    		this.model.setMain(1);
    	}
    }
});