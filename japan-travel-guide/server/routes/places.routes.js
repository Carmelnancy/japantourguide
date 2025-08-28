// const express = require('express');
// const router = express.Router();
// const Place = require('../models/Place');

// // Get all places
// router.get('/', async (req, res) => {
//   const places = await Place.find();
//   res.json(places);
// });

// module.exports = router;/

import { Router } from "express";
import Place from "../models/Place.js";

const r = Router();

r.get("/", async (req, res) => res.json(await Place.find().sort({ createdAt: -1 })));
r.post("/", async (req, res) => res.status(201).json(await Place.create(req.body)));
r.get("/:id", async (req, res) => {
  const doc = await Place.findById(req.params.id);
  if (!doc) return res.sendStatus(404);
  res.json(doc);
});
r.put("/:id", async (req, res) => {
  const doc = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!doc) return res.sendStatus(404);
  res.json(doc);
});
r.delete("/:id", async (req, res) => {
  await Place.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

export default r;

