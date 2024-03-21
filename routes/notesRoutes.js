import { getNote , updateNote , deleteNote , addNote , latestUpdatedNotes , changeVisiblity } from "../controllers/notesController.js";
import { Router } from "express";
import validateToken from "../middleware/tokenhandler.js";

const router = Router();

router.use(validateToken);

router.get('/latest-notes' , latestUpdatedNotes)

router.get('/get-note',  getNote);

router.put('/update-note:id', updateNote);

router.post('/add-note', addNote);

router.delete('/delete-note:id', deleteNote);

router.post('/change-visiblity' , changeVisiblity);


export default router;