import http from "http";
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import url from "url";
const app = express();

// registering middle ware with express app
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors configurations
const allowedOrigins = ["http://localhost:5173"];

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(
  cors({
    origin: function (origin, callback) {
      // retrun null if no origin available
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
// connecting DATABASE

// registering routes
const server = http.createServer(app);
const PORT = 8000;

app.get("/data", (req, res) => {
  const processedData = JSON.parse(
    fs.readFileSync("./services/processed_data.json", "utf-8")
  );
  res.json(processedData);
});

server.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
