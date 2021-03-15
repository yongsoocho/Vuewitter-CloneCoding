const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');
const { isLoggedIn, isLoggedOut } = require('./middlewares');

const userRouter = express.Router();

userRouter.get('/', isLoggedIn, async (req, res, next) => {
	const user = req.user;
	res.json(user);
});

userRouter.post('/', isLoggedOut, async (req, res) => {
	try{
		const hash = await bcrypt.hash(req.body.password, 12);
		const exUser = db.User.findOne({
			where: { email: req.body.email }
		})
		if(exUser){
			return res.statue(403).json({
				errorCode: 1,
				message:'Already Exist!!'
			});
		}
		const newUser = await db.User.create({
			email:req.body.email,
			nicknae:req.body.nickname,
			password:hash,
		});
		res.status(201).json(newUser);
	}catch(err){
		console.log(err);
		next(err);
	}
});

userRouter.post('/login', isLoggedOut, (req, res, next) => {
	passport.authenticate("local", (error, user, info) => {
		if(error){
			console.log(error);
			return next(error);
		}
		if(info){
			return res.status(401).sen(info.reason);
		}
		return req.login(user);
	})(req, res, next);
});

userRouter.post('/logout', isLoggedIn, (req, res, next) => {
	if(req.isAuthenticated()){
		req.logout();
		req.session.destroy();  //optional
		return res.status(200).send('logout Success');
	}
});

module.exports = userRouter