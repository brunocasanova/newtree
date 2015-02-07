var fs = require( 'fs' );
var path = require( 'path' );

var Controller = module.exports = function ( middlewares ){
	middlewares.router.use(function ( req, res, next ){
		var config = req.config = {};

		// Get urls
		config.url = { absolute: req.protocol + '://' + req.get( 'host' ) + req.originalUrl };
		var validateURL = /^http:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*$/.test( config.url.absolute );
		config.url.short = ( typeof req.url == 'string' && validateURL ) && req.url || false;

		// Parse url into an object
		var urlDefault = { controller: 'home', action: 'index' };
		var parsed = config.url.short.split( '/' );
		
		var root = ( parsed[0].length == 0 && parsed[1].length == 0 );

		config.controller = ! root && parsed[1] || urlDefault.controller;
		config.action = ! root && parsed[2] || urlDefault.action;
		if( parsed[3] ) config.target = parsed[3];

		if( parsed.length > 4 ){
			for( var i = 4, values; i < parsed.length; i++ ){
				values = parsed[i].split( '/' );
				if( values[0].length == 0 ) req.config[ 'value' + ( i - 3 ) ] = values[0];
			}
		}

		// Filter and config method
		config.method = ( req.method && typeof req.method == 'string' ) && req.method.toUpperCase() || false;

		var methods = [ 'GET', 'POST', 'PUT', 'DELETE' ];
		if( ! config.method || config.method.indexOf( methods ) !== -1 ) return next( 'error' );
		config.method = config.method.toLowerCase();

		// Get the requested controller
		var files = [];

		fs.readdirSync( path.join( path.dirname( __dirname ), 'controllers' ) )
		.forEach(function ( file ){
			if( ! file ) return next( 'error' );

			if( file.indexOf( '.js' ) !== -1 && file !== 'index.js' ){
				files.push( path.basename( file, '.js' ) );
			}
		});

		if( files.indexOf( req.config.controller ) === -1 ) return next( 'error' );

		var controller = require( './' + req.config.controller );

		// Dispatch the method and the controller to next route
		Controller.middleware( middlewares, req.config.method, controller );

		// Set the route inside of dispatch method
		next( 'route' );
	});
};

Controller.middleware = function ( middlewares, method, controller ){
	middlewares.router[ method ](
		controller.routes,
		function ( req, res, next ){
			try{
				controller[ req.config.action ]( req, res, next );
			}catch( e ){
				next( 'error' );
			}
		},
		function ( req, res, next ){
			var body = req.body,
				config = req.config;

			if( ! body || typeof config != 'object' || ! config.controller || ! config.action ) return next( 'error' );

			body.path = path.join( config.controller, config.action );
			body.data = req.data || {};
			body.logged = req.session.logged;
			body.me = req.session.user || { id: false };
			body.title = ( config.controller && config.action ) && config.controller + ' - ' + config.action || config.controller;
			
			res.render( 'render', body );
		}
	);

};
