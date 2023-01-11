import {conn} from '../db.js';

export const getUsers = async (req, res) => {
    try{
        const [rows] = await conn.query('SELECT * FROM users');
        res.json(rows);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const createUser = async(req, res) => {
    const {name, email} = req.body;

    try{
        const [rows] = await conn.query('INSERT INTO users (name, email, created_at) VALUES (?, ?, NOW())', [name, email]);
        res.send({id:rows.insertId, name:email, email:email});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const getUser = async (req, res) => {
    try{
        const [rows] = await conn.query('SELECT * FROM users WHERE id=?', [req.params.id]);

        if(rows.length <= 0) return res.status(404).send({
            message:'User not found'
        });
    
        res.json(rows[0]);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const updateUser = async (req, res) => {
    const {id} = req.params;
    const {name, email} = req.body;

    try{ 
        const [result] = await conn.query('UPDATE users SET name=IFNULL(?, name), email=IFNULL(?, email) WHERE id=?', [name, email, id]);
    
        if(result.affectedRows === 0) return res.status(404).json({
            message:'User not found'
        });
    
        const [rows] = await conn.query('SELECT * FROM users WHERE id=?', [id]);
    
        res.json(rows[0]);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const deleteUser = async (req, res) => {
    try{
        const [result] = await conn.query('DELETE FROM users WHERE id=?', [req.params.id]);

        if(result.affectedRows <= 0) return res.status(404).json({
            message:'User not found'
        });
    
        res.sendStatus(204);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}
