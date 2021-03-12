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

postRouter.post('/:id/comment', isLoggedIni, async (req, res, next) => {
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
})

module.exports = postRouter;