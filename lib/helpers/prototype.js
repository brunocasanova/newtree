module.exports = function ( req, res, next ){

	String.prototype.capitalize = function() {
		return this.charAt( 0 ).toUpperCase() + this.slice( 1 );
	};

	String.prototype.decapitalize = function() {
		return this.charAt( 0 ).toLowerCase() + this.slice( 1 );
	}

	String.prototype.extension = function ( ext ) {
		return ext && this.valueOf().concat( '.', ext ) || '';
	}

	String.prototype.extension = function ( ext ) {
		return ext && this.valueOf().concat( '.', ext ) || '';
	}

	/*
	String.prototype.dextension = function () {
		// TODO
		return this.valueOf().substring( 0, this.valueOf().length -3 ) || '';
	}
	*/

	String.prototype.absolutePath = function ( abs ) {
		var a = '..', ab = '../..';
		return abs && ab.concat( '/', this.valueOf() ) || a.concat( '/', this.valueOf() );
	}

	next();

};
