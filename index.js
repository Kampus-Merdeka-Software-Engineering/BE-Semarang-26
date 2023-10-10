// import library express.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import PatientRoute from "./routes/patientroutes.js"; //1
import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import nurseRoutes from "./routes/nurseRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import db from "./config/database.js";

const app = express(); // call function express.js
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// create logger middleware function
function LoggerMiddleware(req, res, next) {
  console.log(`Request received at: ${new Date()}`);
  next(); // continue process next function
}

app.use(LoggerMiddleware);

// ROUTES
app.get("/", (req, res) => {
  res.send("Selamat Datang di SahihSejahtera - Dental Booking App");
});

// middleware
app.use(PatientRoute);
app.use(authRoutes);
app.use(doctorRoutes);
app.use(nurseRoutes);
app.use(bookingRoutes);
app.use(contactRoutes);

// db.sync() is for synchronize all models at once
db.sync({ alter: true })
    .then(() => {
      console.log("Database connected")
      app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch(error => {
        console.log(`Database connection failed: ${error}`);
    });