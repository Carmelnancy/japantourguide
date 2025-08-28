import { Router } from "express";
import Festival from "../models/Festival.js";
const r = Router();

r.get("/", async (req,res)=> res.json(await Festival.find().sort({ createdAt: -1 })));
r.post("/", async (req,res)=> res.status(201).json(await Festival.create(req.body)));
r.get("/:id", async (req,res)=> {
  const doc = await Festival.findById(req.params.id);
  if(!doc) return res.sendStatus(404);
  res.json(doc);
});
r.put("/:id", async (req,res)=> {
  const doc = await Festival.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if(!doc) return res.sendStatus(404);
  res.json(doc);
});
r.delete("/:id", async (req,res)=> { await Festival.findByIdAndDelete(req.params.id); res.sendStatus(204); });

export default r;
