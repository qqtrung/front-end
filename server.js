const express = require("express");
const cors = require("cors");

try {
  // Import the models data
  const models = require("./src/modelData/models");

  const app = express();
  const port = 3002;

  // Enable CORS
  app.use(cors());

  // Request logging middleware
  app.use((req, res, next) => {
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.url} from ${req.ip}`
    );
    next();
  });

  // Routes

  app.get("/", (req, res) => {
    res.send("hello, world");
  });

  app.get("/test/info", (req, res) => {
    try {
      res.json(models.schemaInfo());
    } catch (e) {
      console.error("Error in /test/info:", e);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/user/list", (req, res) => {
    try {
      res.json(models.userListModel());
    } catch (e) {
      console.error("Error in /user/list:", e);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/user/:id", (req, res) => {
    try {
      const user = models.userModel(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (e) {
      console.error("Error in /user/:id:", e);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/photosOfUser/:id", (req, res) => {
    try {
      const photos = models.photoOfUserModel(req.params.id);
      res.json(photos);
    } catch (e) {
      console.error("Error in /photosOfUser/:id:", e);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
} catch (e) {
  console.error("Error starting server:", e);
}
