import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()
const URL = process.env.URL;

export default async function  dbConnection()
{
    return mongoose.connect(URL)
        .then(() => {
            mongoose.connection.on('error', (error) => {
                console.error('MongoDB connection error:', error);
                process.exit(1);
            });

            mongoose.connection.once('open', () => {
                console.log('Connected to MongoDB');
            });
        })
        .catch(error => {
            console.error('Error connecting to MongoDB:', error);
            process.exit(1);
    });
}