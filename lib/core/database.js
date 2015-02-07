var fs = require( 'fs' );
var path = require( 'path' );

var database = {},
	config = {},
	options = {};

database.Sequelize = require( 'sequelize' );

var utils = database.Sequelize.Utils;

console.log( 'Node version: ' + process.version );
console.log( 'Sequelize version: ' + utils._.VERSION );

config.dbname = 'newtree';
config.username = 'root';
config.password = 'findhit';

options.dialect = 'mysql';
options.port = 3306;

options.logging = console.log,
options.paranoid = true,
options.underscored = true,
options.freezeTableName = true,
options.syncOnAssociation = true,

options.charset = 'utf8',
options.collate = 'utf8_general_ci',

options.define = {
	paranoid: true,
	underscored: true,
	freezeTableName: true,
	syncOnAssociation: true,

	charset: 'utf8',
	collate: 'utf8_general_ci',
	
	classMethods: {
		method1: function () {
			return 'm1*****';
		}
	},
	instanceMethods: {
		method2: function () {
			return 'm2*****';
		}
	},
	
	timestamps: true
},

database.sequelize = new database.Sequelize( config.dbname, config.username, config.password, options );

var dirname = path.dirname( __dirname );

var capitalize = utils.inflection.capitalize;

var filesPath = path.join( dirname, 'models', '/' );

fs.readdirSync( filesPath )
	.forEach(function ( file ){
		if( ! file ) throw new Error( 'Error importing models!' );

		if( file.indexOf( '.js' ) !== -1 ){
			database.sequelize.import( filesPath + file );
			console.log( 'Model ' + capitalize( file.substring( 0, file.length - 3 ) ) + ' loaded!' );
		}

	});

database.sequelize.sync();
console.log( 'Models was successfully Loaded!' );

module.exports = database;
