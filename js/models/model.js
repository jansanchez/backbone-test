
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

var ImagenView = Backbone.View.extend({
	el : $('#divGallery'),
	Imagenes: Imagenes,
	contador : 0,
	events: {
		"click #btnChoose" : "chooseImage",
        "click .remove" : "deleteImage"
	},
	initialize: function() {
		this.Imagenes = new this.Imagenes;
	},
	chooseImage: function(){

		this.contador++;
		this.Imagenes.add({src: this.contador+'.jpg', title: this.contador});
		var currentModel = this.Imagenes.at(this.Imagenes.length-1);	    
		this.$('.dragger').append('<div class="thumb" data-id="'+currentModel.cid+'"><a href="javascript:;" title="'+currentModel.get('title')+'" class="remove"></a>'+currentModel.get('src')+'</div>');

        console.log(this.Imagenes);
	},
    deleteImage: function(e){

        var element = $(e.currentTarget).parent();
        element.fadeOut('normal', function(){
            $(this).remove();
        });

        this.Imagenes.remove(this.Imagenes.get(element.attr('data-id')));

        console.log(this.Imagenes);
    }
});

//var icol = new ImagenCollection();

var galleryImages = new ImagenView({
});


