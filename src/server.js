import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "./prisma.js";
import usersRoutes from './routes/users.routes.js';
import boardsRoutes from './routes/boards.routes.js';
import videosRoutes from './routes/videos.routes.js';
import likesRoutes from './routes/likes.routes.js';
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Session setup
app.use(session({
     secret: process.env.SESSION_SECRET,
     resave: false,
     saveUninitialized: false,
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
     clientID: process.env.GOOGLE_CLIENT_ID,
     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
     callbackURL: "/auth/google/callback",
}, async (accessToken, refreshToken, profile, done) => {
     try {
          let user = await prisma.user.findUnique({ where: { googleId: profile.id } });
          if (!user) {
               user = await prisma.user.create({
                    data: {
                         googleId: profile.id,
                         username: profile.displayName,
                         email: profile.emails[0].value,
                         picture: profile.photos[0]?.value,
                    },
               });
          }
          return done(null, user);
     } catch (err) {
          return done(err, null);
     }
}));

passport.serializeUser((user, done) => {
     done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
     try {
          const user = await prisma.user.findUnique({ where: { id } });
          done(null, user);
     } catch (err) {
          done(err, null);
     }
});

// Google Auth routes
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", passport.authenticate("google", {
     failureRedirect: "/login",
     session: true,
}), (req, res) => {
     // Successful authentication
     res.redirect("/profile");
});

app.get('/profile', (req, res) => {
     if (!req.isAuthenticated()) return res.redirect('/');
     res.json(req.user);
});

app.get("/logout", (req, res) => {
     req.logout(() => {
          res.redirect("/");
     });
});

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/boards', boardsRoutes);
app.use('/api/videos', videosRoutes);
app.use('/api/likes', likesRoutes);

app.listen(4000, () => console.log("Server running on port 4000"));
