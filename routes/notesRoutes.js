import { getNote , updateNote , deleteNote , addNote } from "../controllers/notesController.js";
import { Router } from "express";

const router = Router();


router.get('/:id',  getNote);

router.put('/:id', updateNote);

router.post('/', addNote);

router.delete('/:id', deleteNote);

export default router;