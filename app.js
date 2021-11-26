const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const cors = require("cors");

const authController = require("./routes/auth.routes");

const app = express();

app.use(express.json({ extended: true }));

app.use(cors());

app.use("/api/auth", authController);

const PORT = config.get("port") || 5000;

const start = async () => {
  try {
    await mongoose.connect(config.get("mongoURI"), {
      useUnifiedTopology: true,
      // useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
  } catch (error) {
    console.log("Server Error", error.message);
    process.exit(1);
  }
};

start();
