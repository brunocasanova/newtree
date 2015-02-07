module.exports = function( sequelize, DT ){
	
	return sequelize.define( 'user', {

		id: {
			type: DT.INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true
		},

		username: {
			type: DT.STRING( 40 ),
		},

		password: {
			type: DT.STRING( 20 ),
		},

		gender: {
			type: DT.STRING( 1 ),
		},

	},{

		classMethods: {
			method1: function(){
				return false;
			}
		},

		instanceMethods: {
		}

	});

};