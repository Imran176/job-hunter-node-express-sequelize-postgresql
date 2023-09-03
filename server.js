const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const { engine } = require("express-handlebars");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

// Load env vars. You need to call dotenv before all the routes.
dotenv.config({ path: "./config/config.env" });

// Import Database
const sequelize = require("./config/db");

// Test Database Connection
const checkDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("\nUnable to connect to the database:", error.message);
  }
};

checkDbConnection();

// Create Express Server
const app = express();

// Handlebars
app.engine(
  "handlebars",
  exphbs.engine({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "handlebars");

// Body parser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Mount Routes
app.use("/", require("./routes/jobs"));

const PORT = 5000;

app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log(`Server listening on Port: ${PORT}`);
});
