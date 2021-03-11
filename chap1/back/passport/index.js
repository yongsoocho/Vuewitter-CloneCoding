const passport = require("passport");
const mongoUser = require("../models/mongoUser");
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
			}); //caching after
			return done(null, user) //req.user , req.isAuthenticated() === true
		}catch(error){
			console.error(error);
			return done(error);
		}
	});
	local();
};