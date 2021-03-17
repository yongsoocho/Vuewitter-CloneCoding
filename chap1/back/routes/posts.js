const express = require('express');

const db = require("../models");

const postsRouter = express.Router();

postsRouter.get('/', async (req, res, next) => {
	try{
		let where = {};
		if(parseInt(req.query.lastId, 10)) {
			where = {
				id: {
					[db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10), //less than
				}
			}
		}
		const posts = await db.Post.findAll({
			include:[{
				model: db.User,
				attributes: ['id', 'nickname']
			}, {
				model: db.Image
			}, {
				model: db.User,
				as: 'Likers',
				attributes: ['id']
			}, {
				model: db.Post,
				as: 'Retweet',
				include: [{
					model: db.User,
					attributes: ['id', 'nickname']
				}, {
					model: db.Image
				}]
			}],
			order: [['createAt', 'DESC']],
			limit: parseInt(req.query.limit, 10)
		});
		res.json(posts);
	}catch(err){
		console.log(err);
		next(err);
	}
});

module.exports = postsRouter;