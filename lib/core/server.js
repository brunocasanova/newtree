var morgan = require( 'morgan' );
var favicon = require( 'serve-favicon' );
var path = require( 'path' );
var prototype = require( '../helpers/prototype.js' );
var ECT = require( 'ect' );

var middlewares = {};
var express = require( 'express' );
var app = express();
var router = middlewares.router = express.Router();
//var connect = require( 'connect' );

var session = require( 'express-session' );
var cookieParser = require( 'cookie-parser' );
var bodyParser = require( 'body-parser' );

//////////////////// CONFIGURE /////////////////////////////

app.use( morgan( 'dev' ) );
app.set( 'dirname', path.dirname( __dirname ) );
app.use( prototype );

app.set( 'views', path.join( app.get( 'dirname' ), 'views/' ) );

app.set( 'view engine', 'ect' );

app.engine( 'ect', ECT({ watch: true, root: path.join( app.get( 'dirname' ), 'views/' ) }).render );

app.use( '/assets/css', express.static( path.join( app.get( 'dirname' ), '/assets/css' ) ) );
app.use( '/assets/javascript', express.static( path.join( app.get( 'dirname' ), '/assets/javascript' ) ) );

app.use( '/bower_components', express.static( path.join( app.get( 'dirname' ).replace( '/lib', '' ), '/bower_components' ) ) );

app.use( favicon( path.join( app.get( 'dirname' ), 'assets', 'icons', 'favicon' ) + '.ico' ) );

app.use( cookieParser() );
app.use( session({ secret: 'session', resave: false, saveUninitialized: true }) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

var controller = require( '../controllers' )( middlewares );
app.use( router );

app.use(function ( err, req, res, next ){
	if( err ){
		req.body.message = err.message || JSON.stringify( err );
		req.body.title = 'Error';
		req.body.path = 'error/index';
		res.render( 'render', req.body );
	}
});

/////////////////// START SERVER /////////////////////////////

app.set( 'port', process.env.PORT || 3080 );

app.listen( app.get( 'port' ), function (){
	console.log( 'Listening express at http://localhost:', app.get( 'port' ) );
});

/*
// EVENT EMITER TEST
var EventEmitter = require( 'events' ).EventEmitter;
var server = new EventEmitter();

server.on( 'Router', function (){
	console.log( '!!ROUTER CALLED!!' );
});
server.emit( 'Router' );

server.on( 'error', function (){
	console.log( '!!ERROR CALLED!!' );
});
server.emit( 'error' );
*/
