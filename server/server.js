import express from "express";
import cors from "cors";
import connection from "./db/conn.js";
import dotenv from "dotenv";
import userRoute from "./routes/user.js";
import countryRoute from "./routes/country.js";
// import bodyParser from "body-parser";

// Loading environment variables from the config file
dotenv.config({ path: "./config.env" });

// Importing the database connection
connection();

// Creating an instance of the Express app
const app = express();

// Defining the port for the server to listen on
const port = process.env.PORT || 3000;

// Applying middleware
app.use(express.json());
// app.use(bodyParser.json());
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/countries", countryRoute);

// CORS

app.use(cors());

// Testing route to check if the server is working
app.get("/", (req, res) => {
  res.status(200).json("Working!");
});

// Starting the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is up on PORT: ${port}`);
});
