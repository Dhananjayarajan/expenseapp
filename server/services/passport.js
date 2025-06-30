require("dotenv").config();
const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
require("../models/authModels");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user));
});

// passport.deserializeUser(async(id, done)=> {
//   await User.findById(id)
//if (!user) return done(null, false);
// })

passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          const user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          })
            .save()
            .then((user) => {
              done(null, user);
            });
        }
      });
    }
  )
);

// passport.use(
//   new googleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "/auth/google/callback",
//     },
//     async (accessToken, refreshToken, profile, done) => {
//     const existingUser = await User.findOne({ googleId: profile.id })
//         if (existingUser) {
//           done(null, existingUser);
//         } else {
//           const user = await new User({
//             googleId: profile.id,
//             name: profile.displayName,
//             email: profile.emails[0].value,
//           })
//             .save()
//done(null, user)
//         }
//       })
//   )
