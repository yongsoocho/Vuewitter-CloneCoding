const { sequelize, Datatypes } = require('sequelize');

module.exports = (sequelize, Datatypes) => {
	const User = sequelize.define('User', {
		email:{
			type: Datatypes.STRING(30),
			allowNull: false,
			unique: true,
		},
		nickname:{
			type: Datatypes.STRING(10),
			allowNull: false,	
		},
		password:{
			type: Datatypes.STRING(20),
			allowNull: false,
		}
	}, {
		charset:'utf8',
		collate:'utf8_general_ci'
	});
	
	User.associate = (db) => {
		db.User.hasMany(db.Post);
		db.User.hasMany(db.Comment);
	};
	
	return User;
}