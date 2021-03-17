const passport = require("passport");
const local = require("./local");
const db = require('../models');

module.exports = ()=> {
	passport.serializeUser((user, done) => {
		return done(null, user.id)
	});
	
	passport.deserializeUser(async () => {
		try{
			const user = await db.User.findOne({ 
				where: { id },
				attributes: ['id', 'nickname'],
				include:[{
					model: db.Post,
					attributes: ['id']
				},{
					model: db.User,
					as: 'Followings',
					attributes: ['id']
				}, {
					model: db.User,
					as: 'Followers',
					attributes: ['id']
				}]
			}); //caching after
			return done(null, user) //req.user , req.isAuthenticated() === true
		}catch(error){
			console.error(error);
			return done(error);
		}
	});
	local();
};