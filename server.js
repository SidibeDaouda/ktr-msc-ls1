const express = require('express')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const businessCardRoute = require("./routes/businessCard.routes");
const path = require("path");
require('dotenv').config({path:'./config/.env'})
require('./config/db');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');

const app = express()

// PUG
app.set('views', path.join(__dirname, './public/views'))
app.set('view engine', 'pug')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

// fichier static
app.use('/js', express.static(`${__dirname}/public/js/`))
app.use('/css', express.static(`${__dirname}/public/css/`))
app.use('/images', express.static(`${__dirname}/public/images/`))

// routes
app.get("/", (req, res) => {
  if (res.locals.user === null) res.redirect("/login");
  else res.redirect("/businessCard");
});
app.get("/login", (req, res) => res.render("login"));
app.get("/register", (req, res) => res.render("register"));
app.use("/businessCard", businessCardRoute);
app.use("/api/user", userRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    msg: "Page non éxistante",
  });
});



app.listen(process.env.PORT,()=>{
  console.log(
    `Le serveur a démarré sur le port ${process.env.PORT} => http://localhost:${process.env.PORT}`
  );
})
