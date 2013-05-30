


/*Urb Object*/
window.Urb = window.Urb || {};

/*Urb.Views*/
Urb.Views = Urb.Views || {},
Urb.Views.Modules = Urb.Views.Modules || {},
Urb.Views.Modules.Childrens = Urb.Views.Modules.Childrens || {},
Urb.Views.Pages = Urb.Views.Pages || {},
Urb.Views.Lightboxes = Urb.Views.Lightboxes || {},
Urb.Views.Tooltips = Urb.Views.Tooltips || {},
Urb.Views.Notifications = Urb.Views.Notifications || {},
Urb.Views.Tpl = Urb.Views.Tpl || {};
Urb.Views.Tpl.Modules = Urb.Views.Tpl.Modules || {};
Urb.Views.Tpl.Modules.Childrens = Urb.Views.Tpl.Modules.Childrens || {};

/*Urb.Services*/
Urb.Services = Urb.Services || {},
Urb.Services.Facebook = Urb.Services.Facebook || {};
Urb.Services.Twitter = Urb.Services.Twitter || {};
Urb.Services.Google = Urb.Services.Google || {};

/*Urb.Models*/
Urb.Models = Urb.Models || {},
Urb.Models.Collections = Urb.Models.Collections || {};

/*Urb.router*/
Urb.router = {};

/*Urb Object*/
window.Ins = window.Ins || {};

Ins.Models = Ins.Models || {},
Ins.Models.Collections = Ins.Models.Collections || {};

/*Require Config*/
require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'libs/jquery/jquery-1.9.1.min',
		underscore: 'libs/underscore/underscore',
		backbone: 'libs/backbone/backbone',
		text: 'libs/require/text'
    },
	shim: {
		underscore: {
		  exports: '_'
		},
		backbone: {
		  deps: ["underscore", "jquery"],
		  exports: "Backbone"
		}
	}
});

//the "main" function to bootstrap your code
require(['jquery', 'underscore', 'backbone', 'text'], function ($, _, Backbone, text) {
// or, you could use these deps in a separate module using define
	
	_.templateSettings = { interpolate : /\{\{(.+?)\}\}/g };


	require(['js/views/modules/GalleryView.js'],
		function (GalleryView){
			/*Creamos una instancia de nuestra galería principal*/
			new GalleryView({});
	});	


});