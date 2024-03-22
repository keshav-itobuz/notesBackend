import express from 'express';
import dotenv from 'dotenv';
import notesRoutes from './routes/notesRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import dbConnection from './config/dbConnection.js';

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use('/notes', notesRoutes);
app.use('/users', usersRoutes);

dbConnection();

app.listen(PORT, (error) => {
    console.log(`listening on port ${PORT}`);
});
