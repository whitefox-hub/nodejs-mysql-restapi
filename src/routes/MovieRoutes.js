import { Router } from 'express';
import {getMovies, createMovie, getMovie, updateMovie, deleteMovie} from '../controllers/MovieController.js';

const router = Router();

router.get('/movies', getMovies);
router.post('/movie', createMovie);
router.get('/movie/:id', getMovie);
router.patch('/movie/:id', updateMovie);
router.delete('/movie/:id', deleteMovie);

export default router;
