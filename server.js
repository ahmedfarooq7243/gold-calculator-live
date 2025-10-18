const express = require("express");
const path = require("path");
const compression = require("compression");
const cors = require("cors");

const app = express();

// Enable CORS
app.use(cors());

// Enable compression for faster loading
app.use(compression());

// Serve static files from gold-calculator-live folder
const staticPath = path.join(__dirname, "gold-calculator-live");
app.use(express.static(staticPath, {
  maxAge: '1d',
  etag: true,
  lastModified: true
}));

// Handle all routes
app.get("*", (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"), (err) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).send("Error loading calculator");
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📁 Serving from: ${staticPath}`);
});
