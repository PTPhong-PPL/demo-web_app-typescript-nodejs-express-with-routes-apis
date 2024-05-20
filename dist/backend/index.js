// console.log('Hello world!');
import express from 'express';
import { getMember, getMemberX, getMembers, createMember } from './utils/db.js';
import { loggingmd } from './middlewares/mw.js';
import { checkDuplicateUID } from './middlewares/mw.js';
const PORT = 5500;
const app = express();
app.use(express.json()); // So express can work with POST json
// app.use(loggingmd); // Only use when you want to use this mw globally, mean it will run everytime
// if you want to use it for specific routes -> ex: app.get('/...', middleware, (req, res) => { ... };
app.get('/', (req, res) => {
    res.status(201).send({ msg: "Hello world!" });
});
/*
    the routes are '/api/...' is because this is API testing, in real scenerio, you want to make 2 route version. 1 is '/...' for HTML
    page endpoints, which also included security middlewares to ensure sessions before rendering HTML page. 2 is '/api/...' for public
    API use, which has no security middlewares and only return informations.
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
// get user with ID and Password (multiple params). Example URL: /api/user?id=u001&pass=password1
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
// create user to the database
app.post('/api/user', checkDuplicateUID, async (req, res) => {
    const userData = req.body;
    const response = await createMember(userData);
    res.status(201).send(response);
});
// For error catch!
app.use((err, req, res, next) => {
    if (err.statusCode) {
        res.status(err.statusCode).send({ error: err.message });
    }
    else {
        res.status(500).send({ error: 'An unexpected error occurred' });
    }
});
// Confirm server running!
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
