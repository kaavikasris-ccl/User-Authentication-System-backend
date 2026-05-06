const express = require("express");
const cors = require("cors");

require("module-alias/register");

const authRoutes = require("./routes/authroutes");

const app = express();

app.use(express.json());
app.use(cors());

// routes
app.use("/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});