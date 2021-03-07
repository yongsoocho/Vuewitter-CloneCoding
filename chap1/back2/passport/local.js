const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../models');
const { Strategy: LocalStrategy } = require('passport-local');

module.exports =  () => {
	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
	}, async (email, password, done) => {
		try{
			const exUser = await db.User.findOne({ where: { email } });
			if(!exUser){
				return done(null, false, { reason:'Not exist' });
			}
			const result = await bcrypt.compare(password, exUser.password);
			if(result){
				return done(null, exUser);
			}else{
				return done(null, false, { reason:'Check your password' });
			}
		}catch(error){
			console.log(error);
			return done(error);
		}
	}));
};