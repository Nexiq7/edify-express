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

app.use(cors({
     origin: process.env.ORIGIN,
     credentials: true,
     optionsSuccessStatus: 200,
}));

app.use(express.json());

app.use(session({
     secret: process.env.SESSION_SECRET,
     resave: false,
     saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
     clientID: process.env.GOOGLE_CLIENT_ID,
     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
     callbackURL: "/api/v1/auth/google/callback",
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

app.get("/api/v1/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/api/v1/auth/google/callback", passport.authenticate("google", {
     failureRedirect: "/login",
     session: true,
}), (req, res) => {
     res.redirect(process.env.ORIGIN);
});

app.get('/api/v1/profile', (req, res) => {
     if (!req.isAuthenticated()) return res.status(401).json({ error: 'Unauthorized' });
     res.json(req.user);
});

app.get("/api/v1/logout", (req, res) => {
     req.logout(() => {
          res.json({ message: "Logged out successfully" });
     });
});

// Routes
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/boards', boardsRoutes);
app.use('/api/v1/videos', videosRoutes);
app.use('/api/v1/likes', likesRoutes);

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, HOST, () => console.log(`Server running on ${HOST}:${PORT}`));
