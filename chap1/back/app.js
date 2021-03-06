const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:false }));

app.get('/', (req, res) => {
	res.send('Hi');
});

app.post('/user', (req, res) => {
	req.body.email;
	req.body.nickname;
	req.body.password;
})

app.listen(3085, () => {
	console.log(`backend is listening on 3085 port`);
});