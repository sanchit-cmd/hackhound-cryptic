const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const passport = require("passport");
const session = require("express-session");

require("./config/passport");

const userRouter = require("./routes/userRouter");
const questionsRouter = require("./routes/questionsRouter");
const playRouter = require("./routes/playRouter");
const viewRouter = require("./routes/viewRouter");

const AppError = require("./utils/appError");

const errHandler = require("./utils/errorHandler");
const { globalLimiter, gameLimiter, authLimiter } = require("./config/rateLimit");

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "public", "views"));

mongoose
  .connect(process.env.MONGO_SRV, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

// Apply rate limiters
app.use(globalLimiter); // Global rate limiting
app.use('/api/v1/play', gameLimiter); // Stricter limits for game submissions
app.use('/api/v1/users/auth', authLimiter); // Limit auth attempts

// Security middlewares
app.set('trust proxy', 1); // Trust first proxy - important for rate limiting behind Ngrok
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      connectSrc: ["'self'"],
    },
  },
}));
app.use(xss());

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

// Mounting routers
app.use("/api/v1/users", userRouter);
app.use("/api/v1/questions", questionsRouter);
app.use("/api/v1/play", playRouter);
app.use("/", viewRouter);

app.all("*", (req, res) => {
  throw new AppError("This page does not exist on the server!", 404);
});

// Error handler
app.use(errHandler);
module.exports = app;
