// console.log('Hello world!');
import express from 'express';
import { getMember, getMemberX, getMembers, createMember } from './utils/db.js';
import { loggingmd } from './middlewares/mw.js';
import { validateDBUidPhone } from './middlewares/validators.js';
import { productRoutes } from './routes/productRoutes.js';
import { userRoutes } from './routes/userRoutes.js';
const PORT = 8080;
const app = express();
app.use(express.json()); // So express can work with POST json
/* app.use(loggingmd);  // Only use when you want to use this mw globally, mean it will run everytime
                        // if you want to use it for specific routes -> ex: app.get('/...', middleware, (req, res) => { ... }; */
app.get('/', (req, res) => {
    res.status(201).send({ msg: "Hello world!" });
});
/*
    This is API testing
*/
// get all users
app.get('/api/users', loggingmd, async (req, res) => {
    const users = await getMembers();
    res.send(users);
});
// get user with ID
app.get('/api/user/:id', async (req, res) => {
    const id = req.params.id;
    const user = await getMember(id);
    if (user.length > 0) {
        res.send(user);
    }
    else {
        return res.status(400).send({ msg: "Bad request!" });
    }
    ;
});
// get user with ID and Password (multiple params which called "query"). Example URL: /api/user?id=u001&pass=password1
app.get('/api/user', async (req, res) => {
    const id = req.query.id;
    const pass = req.query.pass;
    const user = await getMemberX(id, pass);
    if (user.length > 0) {
        res.send(user);
    }
    else {
        return res.status(400).send({ msg: "Bad request!" });
    }
    ;
});
// create user to the database with validation middleware
app.post('/api/user', validateDBUidPhone, async (req, res) => {
    const userData = req.body;
    const response = await createMember(userData);
    res.status(201).send(response);
});
// search for products, using routes and endpoint
app.use('/api/products', productRoutes);
// login
app.use('/api/users', userRoutes);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// For error catch!
app.use((err, req, res, next) => {
    console.error(err);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
});
// Confirm server running!
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
