import { getNote , updateNote , deleteNote , addNote , latestUpdatedNotes } from "../controllers/notesController.js";
import { Router } from "express";

const router = Router();

router.get('/latestNotes' , latestUpdatedNotes)

router.get('/:title',  getNote);

router.put('/:id', updateNote);

router.post('/', addNote);

router.delete('/:id', deleteNote);


export default router;