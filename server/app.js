import express from "express";
import authRoute from "./route/authRouth.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(express.json());
// Middleware
app.use(cors()); // This allows all origins by default

// If you want to specify CORS options explicitly, you can do this:
const corsOptions = {
  origin: "*", // Allows all origins (can specify a domain here if needed)
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.use(cors(corsOptions)); // This also allows all origins
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

app.use("/api/v1", authRoute);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
