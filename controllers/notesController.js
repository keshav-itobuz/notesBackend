import { Notes } from '../model/mongodb.js';
import { StatusCodes } from 'http-status-codes';

export async function getNote(req, res) {
    try {
        const noteId = req.params.id;
        const noteData = await Notes.findById(noteId);
        const data = {
            status: StatusCodes.OK,
            data: noteData,
            message: 'success',
        };
        res.status(StatusCodes.OK).json(data);
    } catch (err) {
        res.status(StatusCodes.NOT_FOUND).json({ message: 'Error not found' });
    }
}

export async function updateNote(req, res) {
    try {
        const noteId = req.params.id;
        await Notes.findByIdAndUpdate(noteId, { title: req.body.title });
        res.status(StatusCodes.OK).json({ message: 'Succesfully Updated' });
    } catch (err) {
        res.status(StatusCodes.NOT_FOUND).json({ message: 'Error not found' });
    }
}

export async function addNote(req, res) {
    try {
        const note = new Notes({
            notesId:Date.now(),
            title:req.body.title,
            description:req.body.description
        });
        await note.save();
        res.status(StatusCodes.OK).json({ message: 'Succesfully Created' });
    } catch (err) {
        res.status(StatusCodes.NOT_FOUND).json({ message: 'Error not found' });
    }
}

export async function deleteNote(req, res) {
    try {
        const noteId = req.params.id;
        await Notes.findByIdAndDelete(noteId);
        res.status(StatusCodes.OK).json({ message: 'Succesfully Deleted' });
    } catch (err) {
        res.status(StatusCodes.NOT_FOUND).json({ message: 'Error not found' });
    }
}
