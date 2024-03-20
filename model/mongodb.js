import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()
const URL = process.env.URL;
mongoose.connect(URL);

const { Schema } = mongoose;


const notesSchema = new Schema({
  notesId : String,
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },

});

export const Notes = mongoose.model('Notes', notesSchema);