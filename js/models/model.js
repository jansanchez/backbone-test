


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








/* view */

var PhotoSearch = Backbone.View.extend({ 
	tagName: 'div',
	className: 'default',
	id: 'results',
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