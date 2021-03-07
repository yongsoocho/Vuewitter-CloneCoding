const passport = require("passport");
const mongoUser = require("../models/mongoUser");
const local = require("./local");

module.exports = ()=> {
	passport.serializeUser((user, done) => {
		return done(null, user.id)
	});
	
	passport.deserializeUser(() => {
		try{
			const user = await db.User.findOne({ where:{id} });
			return done(null, user) //req.user , req.isAuthenticated() === true
		}catch(error){
			console.error(error);
			return done(error);
		}
	});
	local();
};