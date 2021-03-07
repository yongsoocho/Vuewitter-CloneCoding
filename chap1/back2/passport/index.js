const passport = require("passport");
const mongoUser = require("../models/mongoUser");

module.exports = ()=> {
	passport.serializeUser((user, done) => {
		return done(null, user.id)
	});
	
	passport.deserializeUser(() => {
		
	});
};