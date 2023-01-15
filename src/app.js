import express from 'express';
import cors from 'cors';

import {auth} from 'express-openid-connect';

import MovieRoutes from './routes/MovieRoutes.js';
import AuthRoutes from './routes/AuthRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());

const auth_config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a_long_randomly_generatedstringstored_in_env',
    baseURL: 'http://localhost:3000',
    clientID: 'fQl6PJiHjt9PnIuqUPti019axRmALXJf',
    issuerBaseURL: 'https://dev-i12vydp3hw8gyx7c.us.auth0.com'
};


app.use(auth(auth_config));

// router.get('/profile', requiresAuth(), (req, res) => {
//     res.send(JSON.stringfy(req.oidc.user()));
// });

app.use('/api', AuthRoutes);
app.use('/api', MovieRoutes);


app.use((req, res, next) => {
    res.status(404).json({message:'Endpoint not found'})
});

export default app;
