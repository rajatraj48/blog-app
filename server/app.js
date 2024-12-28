import express from "express";
import authRoute from "./route/authRouth.js";
import cors from "cors";
import bodyParser from "body-parser";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
app.use(express.json());
// Middleware
app.use(cors()); // This allows all origins by default


const corsOptions = {
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], 
};

app.use(cors(corsOptions)); // This also allows all origins
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

app.use("/api/v1", authRoute);



app.use(errorHandler);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
