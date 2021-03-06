const { sequelize, Datatypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	const Post = sequelize.define('Post', { //table:posts
		content: {
			type:DataTypes.TEXT,
			allowNull:false,
		} // createAt, updateAt auto create
	}, {
		charset: 'utf8mb4',
		collate: 'utf8mb4_general_ci',
	});
	
	Post.associate = (db) => {
		db.Post.belongsTo(db.User); // UserId auto create
		db.Post.hasMany(db.Comment);
		db.Post.hasMany(db.Image);
		db.User.belongsToMany(db.User, { through:'Like', as: 'Likers' });
		db.Post.belongsToMany(db.Hashtag, {through:'PostHashTag'});
		db.Post.belongsTo(db.Post, { as: 'retweet' }); // PostId created -> as retweet
	};
	
	return Post;
}