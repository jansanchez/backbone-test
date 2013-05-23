
/*cambio el template settings de underscore para usar {{dato}} en mis plantillas*/
_.templateSettings = { interpolate : /\{\{(.+?)\}\}/g };

/*Creo un modelo*/
var Imagen = Backbone.Model.extend({
	defaults : {
		src : 'none.jpg',
		title : 'none',
		main : 0
	},
	view : null,
	initialize : function(){
		this.on('change:title', function(){
			console.log('se cambio el title a: '+this.get('title'));
		});
        this.on('change',function(){
            this.view.render();
        });
	},
	setSrc : function(src){
		this.set({'src' : src});
	},
	setTitle : function(title){
		this.set({'title' : title});
	},
	setMain : function(main){
		this.set({'main' : main});
	}
});

var Imagenes = Backbone.Collection.extend({
	model : Imagen
});

var GalleryView = Backbone.View.extend({
	el : $('#divGallery'),
	contador : 0,
	model: null,
	events: {
		"click #btnChoose" : "addImg"
	},
	initialize: function() {
		_.bindAll(this);
		this.model.on("add", this.addOne);
		this.model.on("remove", this.removeOne);
	},
	render : function(){
		/*aqui renderizo la vista principal, la cargo con datos si deseo*/
	},
	addImg: function(){
		this.contador++;
		this.model.add({src: this.contador+'.jpg', title: this.contador});
	},
	addOne : function(modelo){
		modelo.view = new galleryRow({model : modelo});
		this.$('.dragger').append(modelo.view.render().el);
	},
	removeOne : function(modelo){
		modelo.view.remove();
		modelo.clear();
	}
});

var mainView = new GalleryView({
	model : (function(){
		return new Imagenes();
	})()
});

var galleryRow = Backbone.View.extend({
	className : 'thumb',
	template : null,
	events: {
        "click .remove" : "deleteImage",
        "click .main" : "aaaBbb"
	},
	initialize: function(){
		_.bindAll(this);
		this.template = $.trim($('.tpl .thumb').html());
	},
	render : function(){
		var compiled_template = _.template(this.template);
		this.$el.html(compiled_template(this.model.toJSON()));
		return this;
	},
    deleteImage: function(){
    	this.model.collection.remove(this.model);
    },
    aaaBbb: function(){
    	if (this.model.get('main')==1) {
    		this.model.setMain(0);
    	}else{
    		this.model.setMain(1);
    	}
    }
});