import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated ? 'Logged in' : 'Not logged in');
});



export default router;
