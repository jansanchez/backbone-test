/*Trayendo la plantilla*/
define(['backbone', 'underscore', 'text!templates/includes/thumbView.html'], 
	function(Backbone, _, thumbView) {

		/*Creamos la vista hija "galleryRow" para cada imagen independiente*/
		var galleryRow = Backbone.View.extend({
			className : 'thumb',
			model : null,
			collection: null,
			events: {
		        "click .remove" : "deleteImage",
		        "click .main" : "changeMain"
			},
			template : null,
			initialize: function(){
				_.bindAll(this);

				/*Al iniciar nuestra vista asignamos la plantilla en la variable "template"*/
				this.template = this.template || $.trim(thumbView);

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
		    	this.collection.remove(this.model);
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

		return galleryRow;

	}
);
