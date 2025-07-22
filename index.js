const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());
// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to MongoDB");
  app.listen(3500, () => {
    console.log("Server is running on port 3500");
  });
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

app.use("/api", require("./routes/productsRoute"));
app.use("/api", require("./routes/categoryRoutes"));
