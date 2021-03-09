exports.isLoggedIn = (req, res, next) => {
	if(req.isAuthenticated()){
		return next();
	}
	return res.status(401).send('LogIn please')
};

exports.isLoggedOut = (req, res, next) => {
	if(!req.isAuthenticated()){
		return next();
	}
	return res.status(401).send('Access refused')
};