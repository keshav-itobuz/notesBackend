import { Notes } from '../model/notesModel.js';
import { StatusCodes } from 'http-status-codes';

export async function getNote(req, res) {
    try {
        const notesTitle = req.query.title;
        const noteData = await Notes.find({ title: { "$regex": notesTitle }, userId: req.userId });
        if (noteData.length === 0) {
            throw new Error();
        }
        const data = {
            status: StatusCodes.OK,
            data: noteData,
            message: 'success',
        };
        res.status(StatusCodes.OK).json(data);
    } catch (err) {
        res.status(StatusCodes.NOT_FOUND).json({ data: "undefined", message: 'Error not found' });
    }
}

export async function updateNote(req, res) {
    try {
        const noteId = req.params.id;
        const data = await Notes.findByIdAndUpdate(noteId, { title: req.body.title }, { returnOriginal: false });
        res.status(StatusCodes.OK).json({ data: data, message: 'Succesfully Updated' });
    } catch (err) {
        res.status(StatusCodes.NOT_FOUND).json({ data: "undefined", message: 'Error not found' });
    }
}

export async function addNote(req, res) {
    try {
        const note = new Notes({
            title: req.body.title,
            description: req.body.description,
            userId: req.userId,
            isVisible: true,
        });
        await note.save();
        res.status(StatusCodes.OK).json({ data: req.body, message: 'Succesfully Created' });
    } catch (err) {
        res.status(StatusCodes.NOT_FOUND).json({ data: "undefined", message: 'Error not found' });
    }
}

export async function deleteNote(req, res) {
    try {
        const noteId = req.params.id;
        const data = findById(noteId);
        await Notes.findByIdAndDelete(noteId);
        res.status(StatusCodes.OK).json({ data: data, message: 'Succesfully Deleted Above Data' });
    } catch (err) {
        res.status(StatusCodes.NOT_FOUND).json({ data: "undefined", message: 'Error not found' });
    }
}

export async function latestUpdatedNotes(req, res) {
    try {
        const data = await Notes.find({ userId: req.userId }).sort({ updatedAt: -1 }).limit(3);
        if (!data) {
            throw new Error();
        }
        res.status(StatusCodes.OK).json({data:data , message:"last 3 updated data received"});
    }
    catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: 'null', message: "internal error" })
    }
}

export async function changeVisiblity(){
    try{
        const data = await Notes.updateMany({_id:{$in:req.body.itemIds}}, {isVisible:false});
        res.status(StatusCodes.OK).json({data:data , message:"Updated"});
    }
    catch(err){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ data: 'null', message: "internal error" })
    }
}
