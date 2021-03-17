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

userRouter.get('/:id', async (req, res, next) => {
	try{
		const user = await db.User.findOne({
			where:{ id: parseIne(req.params.id, 10) },
			include: [{
				model: db.Post,
				as: 'Posts',
				attributes: ['id']
			}, {
				model: db.User,
				as: 'Followings',
				attributes: ['id']
			}, {
				model: db.User,
				as: 'Followers',
				attributes: ['id']
			}],
			attributes: ['id', 'nickname']
		});
		res.json(user);
	}catch(err){
		console.error(err);
		next(err);
	}
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
		return req.login(user, async (err) => {
			if(err) {
				console.error(err);
				return next(err);
			}
			const fullUser = await db.User.findOne({
				where: { id: user.id },
				attributes: ['id', 'email', 'nickname'],
				include:[{
					model: db.Post,
					attributes: ['id']
				}, {
					model: db.User,
					as: 'Followings',
					attributes: ['id']
				}, {
					model: db.User,
					as: 'Followers',
					attributes: ['id']
				}]
			})
			return res.json(fullUser);
		});
	})(req, res, next);
});

userRouter.post('/logout', isLoggedIn, (req, res, next) => {
	if(req.isAuthenticated()){
		req.logout();
		req.session.destroy();  //optional
		return res.status(200).send('logout Success');
	}
});

userRouter.post('/:id/follow', isLoggedIn, async (req, res, next) => {
	try{
		const me = db.User.findOne({
			where:{ id: req.body.id }
		});
		await me.addFollowing(req.params.id);
		res.send(req.params.id)
	}catch(err){
		console.error(err);
		next(err);
	}
});

userRouter.delete('/:id/follow', isLoggedIn, async (req, res, next) => {
	try{
		const me = db.User.findOne({
			where:{ id: req.body.id }
		});
		await me.removeFollowing(req.params.id);
		res.send(req.params.id)
	}catch(err){
		console.error(err);
		next(err);
	}
});

userRouter.patch('/:id/follow', isLoggedIn, async (req, res, next) => {
	try{
		await db.User.update({
			nickname: req.body.nickname
		}, {
			where: { id: req.user.id }
		});
	}catch(err){
		console.error(err);
		next(err);
	}
});

userRouter.get('/:id/following', isLoggedIn, async (req, res, next) => {
	try{
		const user = await db.User.findOne({
			where: { id: req.user.id }
		})
		const followings = await user.getFollowings({
			attributes:['id', 'nickname'],
			limit: parseInt(req.query.limit || 3, 10),
			offset: parseInt(req.query.offset || 0, 10),
		});
		res.json(followings)
	}catch(err){
		console.error(err);
		next(err);
	}
});

userRouter.get('/:id/follower', isLoggedIn, async (req, res, next) => {
	try{
		const user = await db.User.findOne({
			where: { id: req.user.id }
		})
		const followers = await user.getFollowers({
			attributes:['id', 'nickname'],
			limit: parseInt(req.query.limit || 3, 10),
			offset: parseInt(req.query.offset || 0, 10),
		});
		res.json(followers)
	}catch(err){
		console.error(err);
		next(err);
	}
});

userRouter.delete('/:id/follower', async (req, res, next) => {
	try{
		const me = await db.User.findOne({
			where: { id: req.user.id }
		});
		await me.removeFollower(req.params.id);
		res.send(req.params.id)
	}catch(err){
		console.error(err);
		next(err);
	}
});

userRouter.post('/:id/posts', isLoggedIn, async (req, res, next) => {
	try{
		const posts = await db.Post.findAll({
			where: {
				[db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10),
				UserId: parseInt(req.params.id, 10),
				Retweet: null
			},
			include: [{
				model: db.User,
				attributes: ['id', 'nickname']
			}, {
				model: db.Image
			}, {
				model: db.User,
				through: 'Like',
				as: 'Likers',
				attributes: ['id'],
			}]
		});
		res.json(posts)
	}catch(err){
		console.error(err);
	}
});

module.exports = userRouter