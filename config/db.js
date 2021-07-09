const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const connectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.slrp1.mongodb.net/ktr-msc-ls1?retryWrites=true&w=majority`,
    connectionOptions
  )
  .then(() => {
    console.log("Connecté à MongoDB avec succèss :D");
  })
  .catch((e) => console.log("Erreur de connexion à MongoDB", e));



