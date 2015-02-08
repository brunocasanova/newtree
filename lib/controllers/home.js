//var database = require( '../core/database' );

var home = module.exports = {

	routes: [
		'/',
		'/home',
		'/home/index',
	],

	index: function( req, res, next ){
		req.body.message = req.session.message || '!Default home index message!';
		next();
	},

	register: function( req, res, next ){
		res.send( 'Register view!' );
	},

};