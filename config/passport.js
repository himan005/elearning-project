let passport = require('passport');
let FacebookStrategy = require('passport-facebook').Strategy;
let secret = require('../config/secret');
let User = require('../models/user');

passport.serializeUser((user,done)=>{
    done(null, user_id);
})

passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
        done(err, user);
    });
});

passport.use(new FacebookStrategy(secret.facebook,(req, token, refreshToken, profile, done)=>{
    User.findOne({facebook: profile.id},(err, user)=>{
        if(err) return done(err);
        if(user){
            return done(null, user);
        }else{
            let newUser = new User();
            newUser.email = profile._json.email;
            newUser.email = profile.id;
            newUser.tokens.push({kind: 'facebook', token: token});
            newUser.profile.name = profile.displayName;
            newUser.profile.picture = 'https://graph.facebook.com' + profile.id + '/picture?type= large';

            newUser.save((err)=>{
                if(err) throw err;
                return done(null, newUser)
            });
        }
    });
}));