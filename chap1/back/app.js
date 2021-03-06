const express = require('express');
const cors = require('cors');
const db = require('./models');
const app = express();
const bcrypt = require('bcrypt');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./passport');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');

passportConfig();
db.sequelize.sync({ force:false });


app.use(morgan('dev'));
app.use(cors({
	origin:'https://vuewitter.run.goorm.io:3080',
	credentials:true
}));
app.use('/', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(cookie('cookieSecret'));
app.use(session({
	resave:false,
	saveUninitialized:false,
	secret: 'cookieSecret',
	cookie: {
		httpOnly: true,
		secure: false
	}
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
	res.send('Hi');
});

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter);


app.listen(3085, () => {
	console.log(`backend is listening on 3085 port`);
});