var db = require('../lib/db.js');

module.exports = function(app){

    var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done) {
        console.log('Seriallize user', user)
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        var user = db.get('users').find({id:id}).value();
        console.log('Deserialize user', id);
        done(null, user);
    });

    passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'pwd'
    },
    function(email, password, done) {
        console.log('Localstrategy', email, password);
        db.get('users').find({email:email, password:password}).value();
        if(user){
            return done(null, user, {
                message: 'Welcome.'
            });
        }else {
            return done(null, false, {
                message:'Incorrect user.'
            })
        }
    }));
    return passport;
}