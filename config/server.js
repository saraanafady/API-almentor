const express = require("express");
const connectDB = require("./db");
const userRoutes = require("../routes/userRoute");
const userSubscriptionRoutes = require("../routes/userSubscriptionRoutes");
const subscriptionRoutes = require("../routes/subscriptionRoutes");
const cors = require("cors");

const app = express();

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
  // Routes
  app.use("/api/users", userRoutes);
  app.use("/api/userSubscriptions", userSubscriptionRoutes);
  app.use("/api/subscriptions", subscriptionRoutes);

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
