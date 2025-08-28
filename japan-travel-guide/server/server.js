// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const placeRoutes = require('./routes/places.routes');
// const foodRoutes = require('./routes/foods.routes');
// const festivalRoutes = require('./routes/festivals.routes');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/places', placeRoutes);
// app.use('/api/foods', foodRoutes);
// app.use('/api/festivals', festivalRoutes);

// // DB Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('MongoDB connected');
//     app.listen(process.env.PORT, () =>
//       console.log(`Server running on http://localhost:${process.env.PORT}`)
//     );
//   })
//   .catch(err => console.error(err));

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import placeRoutes from "./routes/places.routes.js";
import foodRoutes from "./routes/foods.routes.js";
import festivalRoutes from "./routes/festivals.routes.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is missing from .env file");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("DB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/places", placeRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/festivals", festivalRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

 