
/*Cambio el templateSettings de underscore para usar {{atributoModelo}} en mis plantillas*/
_.templateSettings = { interpolate : /\{\{(.+?)\}\}/g };

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
Urb.Views.templateCache = Urb.Views.templateCache || {};

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



require.config( {
	paths: {
		text: 'js/libs/require/text'
	},
	baseUrl: 'http://backbone.pe/'
	}
);