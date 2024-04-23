import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'; 

dotenv.config();

const port = process.env.PORT || 5001;

const app = express();

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => 
    console.log(`Server is running on port ${port}`)
);