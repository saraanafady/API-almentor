const express = require("express");
const connectDB = require("./db");
const userRoutes = require("../routes/userRoute");
const app = express();
const cors = require("cors");

// Connect To LocalHost
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

connectDB().then(() => {
  app.use("/api/users", userRoutes);

  app.use((err, res) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
