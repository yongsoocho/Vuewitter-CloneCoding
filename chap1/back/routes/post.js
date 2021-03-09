const express = require('express');
const multer = require('multer');
const path = require('path');
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
	limit:{ fileSize: 20*1024*1024 }
})

postRouter.post('/', isLoggedIn, (req, res) => {
	
});

postRouter.post('images', upload.array('image'), isLoggedOut, (req, res) => {
	res.json(req.files.map(v => v.filename));
})

module.exports = postRouter;