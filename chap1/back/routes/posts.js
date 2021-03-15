const express = require('express');

const db = require("../models");

const postsRouter = express.Router();

postsRouter.get('/', async (req, res, next) => {
	try{
		const posts = await db.Post.findAll({
			include:[{
				model: db.User,
				attributes: ['id', 'nickname']
			}],
			order: [['createAt', 'DESC']],
			offset: parseInt(req.query.offset, 10),
			limit: parseInt(req.query.limit, 10)
		});
		res.json(posts);
	}catch(err){
		console.log(err);
		next(err);
	}
});

module.exports = postsRouter;