var assert = require( 'assert' );

describe( 'mocha', function(){  
	
	it( "should fail when throwing an error", function(){
		throw "FAIL";
	});

	it( "should fail when asserting false", function(){
		assert( false )
	});

	it( "should pass when finishing without error", function(){

	});

	it( "should pass when asserting true", function(){
		assert( true );
	});

	it( "should be pending with no function");

});