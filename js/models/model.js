
/********************************************/


var MyModel = Backbone.Model.extend({name:'uno', name:'dos', name:'tres', name:'cuatro', name:'cinco'});

var FooView = Backbone.View.extend({
	events: {
		"change #name": "setName",
		"click #say": "sayName"
	},

	setName: function(e){
		var name = $(e.currentTarget).val();
		this.model.set({name: name});
	},

	sayName: function(e){
		e.preventDefault();
		var name = this.model.get("name");
		alert("Hello " + name);
	},

	render: function(){
		// do some rendering here, for when this is just running JavaScript

	}
	});

	$(function(){
		var model = new MyModel();
		var view = new FooView({
		model: model,
		el: $("#foo")
	});
});


/********************************************/



var UserCollection = Backbone.Collection.extend({
  model: MyModel
});


UserListView = Backbone.View.extend({
  attach: function(){
    this.el = $("#user-list");
    this.$("li").each(function(index){
      var userEl = $(this);
      var id = userEl.attr("data-id");
      console.log(id);
      var user = this.collection.get(id);
      new UserView({
        model: user,
        el: userEl
      });
    });
  }
});

UserView = Backbone.View.extend({
  initialize: function(){
    this.model.bind("change:name", this.updateName, this);
  },

  updateName: function(model, val){
    this.el.text(val);
  }
});

var userData = {name:'uno', name:'dos', name:'tres', name:'cuatro', name:'cinco'};
var userList = new UserCollection(userData);
var userListView = new UserListView({collection: userList});
userListView.attach();



var Usuario = Backbone.Model.extend({
	defaults : {
		id: 0,
		nombre: 'ninguno'
	},
	initilize : function(){
		this.on('change:nombre', function(){ 
			console.log('se cambio el Nombre a: '+ this.get('nombre'));
		});
	}
});


var usuarioView = Backbone.View.extend({
	el : '#tabla',
	Usuario: null,
	events: {
		"click .table-row": "userClick"
	},
	userClick : function(e){
		
		this.Usuario.set('nombre','cambio de nombre');
		$(e.currentTarget).fadeOut();
	},
	initialize: function() {
		_.bindAll(this);
		this.Usuario = new this.options.Usuario; // trae la variable que le hayamos pasado osea los modelos
		this.Usuario.on('change', this.cambiarVista);

	},
	cambiarVista : function(){

		console.log('cambiar vista => '+ this.Usuario.get('nombre'));

	},
	render: function( event ){

		//var compiled_template = _.template( $("#results-template").html() );
		//this.$el.html(); 
		return this;

	}
});





var uView = new usuarioView({
	el : 'body',
	Usuario : Usuario
});


/*
var Photo = Backbone.Model.extend({
	defaults : {
		name:'Nombre por defecto'
	},
	initialize : function(){
		this.on('change:name', function(){ 
			console.log('se cambio el Nombre a: '+ this.get('name'));
		});

	},
	setName : function(newName){
		this.set({name:newName});
	}
});




var PhotoSearch = Backbone.View.extend({ 
	tagName: 'div',
	className: 'default',
	el: '#results',
	render: function( event ){

		var compiled_template = _.template( $("#results-template").html() );
		this.$el.html( compiled_template(this.model.toJSON()) ); return this;

	},
	events: {
	"click #send": "clickeo"
	},
	clickeo : function(e){
		console.log('click!');
	},
	initialize: function() {
			
		this.model = new Photo();			
		this.model.on('change', this.render);
 
		this.render();
	},
});


var ps = new PhotoSearch();
*/