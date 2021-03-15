const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../models');
const { isLoggedIn, isLoggedOut } = require('./middlewares');

postRouter = express.Router();

const upload = multer({
	storage: multer.diskStorage({
		destination: function (req, file, done) {
			done(null, '/uploads')
		},
		filename: function (req, file, done) {
			const ext = path.extname(file.originalname);
			const basename = path.basename(file.originalname);
    		done(null, basename + Date.now() + ext)
 		}
	}),
	limit:{ fileSize: 20*1024*1024 } //B KB MB
})

postRouter.post('/', isLoggedIn, async (req, res, next) => {
	try{
		const hashtags = req.body.content.match(/#[^\s#]+/g);
		const newPost = await db.Post.create({
			content: req.body.content,
			UserId: req.body.id,	
		})
		if(hashtags){
			const result = await Promise.all(hashtags.map(tag => db.Hashtag.findOrCreate({
				where: {name: tag.slice(1).toLowerCase()}
			})));
			await newPost.addHashtags(result.map(r => r[0]));
		}
		if(req.body.image){
			if(Array.isArray(req.body.image)){
				const images = await Promise.all(req.body.image.map((image) => {
					return db.Image.create({ src: image, PostId: newPost.id });
				}));
			}else{
				const image = await db.Image.create({ src: req.body.image, PostId: newPost.id });
			}
		}
		const fullPost = await db.Post.findOne({
			where: { id: newPost.db },
			include: [{
				model: db.User,
				attributes: ['id', 'nickname']
			}, {
				model: db.Image
			}],
		});
		return res.json(fullPost);
	}catch(err){
		
	}
});

postRouter.post('/images', upload.array('image'), isLoggedOut, (req, res) => {
	console.log(req.files);
	res.json(req.files.map(v => v.filename));
})

postRouter.post('/:id/comment', isLoggedIn, async (req, res, next) => {
	try{
		const post = await db.Post.findOne({ where: { id: req.params.id } });
		if(!post){
			return res.status(404).send('Not exist post');
		};
		const newComment = await db.Comment.create({
			PostId: post.id,
			UserId: req.user.id,
			content: req.body.content,
		});
		const comment = await db.Comment.findOne({
			where: {
				id: newComment.id
			},
			include: [{
				model: db.User,
				attributes: ['id', 'nickname']
			}]
		});
		return res.json(comment);
	}catch(err){
		
	}
});

postRouter.get('/:id/comments', async (req, res, next) => {
	try{
		const post = await db.Post.findOne({ where: { id: req.params.id } });
		if(!post){
			return res.status(404).send('Not found');
		}
		const comments = await db.Comment.findAll({
			where: { 
				PostId: req.params.id,
			},
			include: [{
				model: db.User,
				attributes: ['id', 'nickname']
			}],
			order: [['createAt', 'ASC'], ['updatedAt', 'ASC']]
		});
		res.json(comments)
	}catch(err){
		console.log(err);
	}
});

postRouter.delete('/:id', async (req, res, next) => {
	try{
		await db.Post.destroy({
			where: {
				id: req.params.id
			}
		});
		res.send('Delete Complete!');
	}catch(err){
		console.log(err);
		next(err);
	}
});

postRouter.post('/:id/retweet', async (req, res, next) => {
	try{
		const post = await db.Post.findOne({
			where: { id:req.params.id },
			include:[{
				model: db.Post,
				as: 'Retweet' //리트윗한 게시글 리트윗시 원본게시글
			}]
		});
		if(!post){
			return res.status(404).send('Not Found Post');
		};
		if(req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.User.id)){
			return res.status(404).send(`You can't retweet your post!`);
		};
		const retweetTargetId = post.RetweetId || post.id;
		const exPost = await db.Post.findOne({
			where: {
				UserId: req.user.id,
				RetweetId: retweetTargetId
			},
		});
		if(exPost){
			return res.status(404).send('Already Retweeted');
		};
		const retweet = await db.Post.create({
			UserId: req.user.id,
			RetweetId: retweetTargetId,
			content: 'retweet'
		});
		const retweetWithPrevPost = await db.Post.findOne({
			where:{
				id: retweet.id
			},
			include:[{
				model: db.User,
				attributes: ['id', 'nickname']
			}, {
				model: db.Post,
				as: 'Retweet',
				include:[{
					model: db.User,
					attributes: ['id', 'nickname']
				}, {
					model: db.Image,
				}],
			}]
		});
		res.json(retweetWithPrevPost);
	}catch(err){
		console.error(err);
		next(err);
	}
});

postRouter.post('/:id/like', isLoggedIn, async (req, res, next) => {
	try{
		const post = await db.Post.findOne({
			where:{
				id: req.params.id
			}
		});
		if(!post){
			return res.status(404).send('Not Found');
		}
		await post.addLiker(req.user.id); // addLiker 가 자동으로 추가
		res.json({ userId: req.user.id });
	}catch(err){
		console.error(err);
		next(err);
	}
});

postRouter.delete('/:id/like', isLoggedIn, async (req, res, next) => {
	try{
		const post = await db.Post.findOne({
			where:{
				id: req.params.id
			}
		});
		if(!post){
			return res.status(404).send('Not Found');
		}
		await post.removeLiker(req.user.id); // addLiker 가 자동으로 추가
		res.json({ userId: req.user.id });
	}catch(err){
		console.error(err);
		next(err);
	}
});

module.exports = postRouter;