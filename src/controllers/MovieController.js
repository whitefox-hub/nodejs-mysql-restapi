import {conn} from '../db.js';

export const getMovies = async (req, res) => {
    try{
        const [rows] = await conn.query('SELECT * FROM movies');
        res.json(rows);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const createMovie = async(req, res) => {
    const {title, description, status} = req.body._rawValue;

    try{
        const [rows] = await conn.query('INSERT INTO movies (title, description, status, created_at) VALUES (?, ?, ?, NOW())', [title, description, status]);
        res.send({id:rows.insertId, title:title, description:description, status:status});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const getMovie = async (req, res) => {
    try{
        const [rows] = await conn.query('SELECT * FROM movies WHERE id=?', [req.params.id]);

        if(rows.length <= 0) return res.status(404).send({
            message:'Movie not found'
        });
    
        res.json(rows[0]);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const updateMovie = async (req, res) => {
    const {id} = req.params;
    const {title, description, status} = req.body._rawValue;

    try{
        const [result] = await conn.query('UPDATE movies SET title=IFNULL(?, title), description=IFNULL(?, description), status=IFNULL(?, status) WHERE id=?', [title, description, status, id]);
    
        if(result.affectedRows === 0) return res.status(404).json({
            message:'Movie not found'
        });
    
        const [rows] = await conn.query('SELECT * FROM movies WHERE id=?', [id]);
    
        res.json(rows[0]);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const deleteMovie = async (req, res) => {
    try{
        const [result] = await conn.query('DELETE FROM movies WHERE id=?', [req.params.id]);

        if(result.affectedRows <= 0) return res.status(404).json({
            message:'Movie not found'
        });
    
        res.sendStatus(204);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}
