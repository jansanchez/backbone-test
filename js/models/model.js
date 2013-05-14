
var Imagen = Backbone.Model.extend({
	defaults : {
		src : 'none.jpg',
		title : 'none',
		main : 0
	},
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



var ImagenCollection = Backbone.Collection.extend({
	model : Imagen
});




var ImagenView = Backbone.View.extend({
	el : $('#divGallery'),
	imagenCollection: null,
	contador : 0,
	events: {
		"click #btnChoose" : "chooseImage"
	},
	initialize: function() {
		
		this.imagenCollection = new this.options.ImageCol;


	},
	chooseImage: function(){

		this.contador++;
		//console.log(this.contador);

		this.imagenCollection.add([{src: this.contador+'.jpg', title: this.contador}]);

		var currentModel = this.imagenCollection.at(this.imagenCollection.length-1);
	
		this.$('.dragger').append('<div class="thumb"><a href="javascript:;" title="'+currentModel.get('title')+'" class="remove"></a>'+currentModel.get('src')+'</div>');

		

	}
});

//var icol = new ImagenCollection();

var galleryImages = new ImagenView({
	ImageCol : ImagenCollection
});


