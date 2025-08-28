import { Router } from "express";
import Food from "../models/Food.js";
const r = Router();

r.get("/", async (req,res)=> {
  res.json(await Food.find().sort({ createdAt: -1 }));
});
r.post("/", async (req,res)=> res.status(201).json(await Food.create(req.body)));
r.get("/:id", async (req,res)=> {
  const doc = await Food.findById(req.params.id);
  if(!doc) return res.sendStatus(404);
  res.json(doc);
});
r.put("/:id", async (req,res)=> {
  const doc = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if(!doc) return res.sendStatus(404);
  res.json(doc);
});
r.delete("/:id", async (req,res)=> { await Food.findByIdAndDelete(req.params.id); res.sendStatus(204); });

export default r;
