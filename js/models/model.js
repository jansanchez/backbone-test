
_.templateSettings = { interpolate : /\{\{(.+?)\}\}/g };

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
		this.on('change:src', function(){
			console.log('se cambio el src a: '+this.get('src'));
		});
		this.on('change:main', function(){
			console.log('se cambio el main a: '+this.get('main'));
		});
        this.on('change',function(){
            console.log(this.cid);
        });
	},
	setSrc : function(src){
		this.set({'src':src});
	},
	setTitle : function(title){
		this.set({'title':title});
	},
	setMain : function(main){
		this.set({'main':main});
	}
});

var Imagenes = Backbone.Collection.extend({
	model : Imagen
});

var imgs = new Imagenes();

var ImagenView = Backbone.View.extend({
	el : $('#divGallery'),
	contador : 0,
	events: {
		"click #btnChoose" : "addImg"
	},
	initialize: function() {
		_.bindAll(this);
		this.model.on("add", this.addOne);
		this.model.on("remove", this.removeOne);
	},
	render : function(){
		/*
		var template = $.trim($('.thumb').html());
		this.$el.append(template);
		*/
		return this;
	},
	addImg: function(){
		this.contador++;
		imgs.add({src: this.contador+'.jpg', title: this.contador});
	},
	addOne : function(modelo){
		modelo.view = new iView({model : modelo});
		this.$('.dragger').append(modelo.view.render().el);
	},
	removeOne : function(modelo){
		modelo.view.remove();
		modelo.clear();
	}
});

var mainView = new ImagenView({
	model : imgs
});

var iView = Backbone.View.extend({
	className : 'thumb',
	template : null,
	events: {
        "click .remove" : "deleteImage"
	},
	initialize: function() {
		_.bindAll(this);
		this.template = $.trim($('.tpl .thumb').html());
	},
	render : function(){
		var compiled_template = _.template( this.template );
		this.$el.html( compiled_template(this.model.toJSON()));
		return this;
	},
    deleteImage: function(){
		this.model.collection.remove(this.model);
    }
});