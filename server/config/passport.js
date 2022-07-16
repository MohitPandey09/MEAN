var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../schema/user');

var options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.APP_SECRET_KEY;

module.exports = passport => {
	passport.use(new JwtStrategy(options, async function(jwtPayload, done) {
		User.findOne({ email: jwtPayload.email }, function(error, user) {
			if (error) return done(error, false);
			if (user) return done(null, user);
			else return done(null, false);
		});
	}));
}