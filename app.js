const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const path = require("path");
var ejs = require('ejs');

const app = express();
// bring  route
const indexRouter = require('./routes/index');
const ouath2Router = require('./routes/oauth2');

//Set view engine to ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", 'ejs');

var sess = {
    secret: "my super secret",
    resave: false,
    saveUninitialized: true,
};

app.use(express.json());

// Middleware for bodyparser
// parse application/x-www-form-urlencoded
app.use(
    bodyparser.urlencoded({
        extended: false,
    })
);
// parse application/json
app.use(bodyparser.json());
//session middleware
app.use(session(sess));
// Middleware for passport
app.use(passport.initialize());

//mongoDB configuration
const mongodbURL = require("./setup/myurl").mongoURL;

// Attempt to connect to database
mongoose
    .connect(mongodbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Mongodb is connected");
    })
    .catch((err) => {
        console.log("mondb not connected");
        console.log(err);
    });

// just for testing route
// app.get('/', (req,res)=>{
//     res.send("Hey there Big stack");
// });

// actual route
app.use(ouath2Router);
app.use("/", indexRouter);



// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });
// // error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get("env") === "development" ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render("error");
// });

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`app is running at port ${port}`));