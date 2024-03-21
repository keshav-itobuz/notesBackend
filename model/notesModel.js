import mongoose from 'mongoose';

const { Schema } = mongoose;


const notesSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  userId : {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  isVisible:{
    type: Boolean,
    required: true
  }

},{timestamps : true});

export const Notes = mongoose.model('Notes', notesSchema);