import express, { json } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'; 
import connectDB from './config/db.js';

dotenv.config();

const port = process.env.PORT || 5001;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Server is ready');
});     

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => 
    console.log(`Server is running on port ${port}`)
);