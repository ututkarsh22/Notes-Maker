import express from "express";
import { getAllnotes, addNewNote, updateContent, deleteNote, getNoteById } from "../controller/notes.controller.js";

const router = express.Router();

router.get("/getNotes",getAllnotes);
router.post("/new-Note",addNewNote);
router.get("/getNote/:id",getNoteById);
router.put("/update-note/:id",updateContent);
router.delete("/deletenote/:id",deleteNote);


export default router;
