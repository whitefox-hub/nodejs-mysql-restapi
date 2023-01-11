import express from 'express';
import UserRoutes from './routes/UserRoutes.js';

const app = express();
app.use(express.json());

app.use('/api', UserRoutes);
app.use((req, res, next) => {
    res.status(404).json({message:'Endpoint not found'})
});

export default app;