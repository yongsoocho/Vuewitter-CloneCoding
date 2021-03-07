const express = require('express');
const cors = require('cors');
// const db = require('./models');
const app = express();
const bcrypt = require('bcrypt');
const session = require('express-session');
const passport = require('passport');
// const passportConfig = require('./passport');
const cookie = require('cookie-parser');
const morgan = require('morgan');


// db.sequelize.sync({ force:false });


app.use(morgan('dev'));
app.use(cors('https://vuewitter.run.goorm.io:8000'));
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(cookie('cookieSecret'));
app.use(session({
	resave:false,
	saveUninitialized:false,
	secret: 'cookieSecret'
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
	res.send('Hi');
});

app.post('/user', async (req, res) => {
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

app.post('/user/login', (req, res, next) => {
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

app.listen(3085, () => {
	console.log(`backend is listening on 3085 port`);
});