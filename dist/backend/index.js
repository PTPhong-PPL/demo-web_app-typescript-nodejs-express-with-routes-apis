// console.log('Hello world!');
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { getMember, getMemberX, getMembers, createMember } from './utils/db.js';
import { loggingmd } from './middlewares/mw.js';
import { validateDBUidPhone } from './middlewares/validators.js';
import { productRoutes } from './routes/productRoutes.js';
import { userRoutes } from './routes/userRoutes.js';
const PORT = 8080;
const app = express();
app.use(session({
    secret: "testing",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 * 60 }
}));
app.use(express.json()); // So express can work with POST json
app.use(cookieParser()); // So express can parse cookies
/**
 * app.use(loggingmd); <-- middleware
 *
 * Only put it/code it like that when you want to use this mw globally, mean it will run everytime
 * if you want to use it for specific routes -> ex: app.get('/...', middleware, (req, res) => { ... };
 */
// Homepage test
app.get('/', (req, res) => {
    res.status(201).send({ msg: "Hello world!" });
});
// Start of API experimenting //
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
// search for products, using routes
app.use('/api/products', productRoutes);
// login, using routes -> to -> controllers with services class
app.use(userRoutes);
// cookies testing
// get a cookie
app.get("/cookies/get", async (req, res) => {
    res.cookie("cookieTest", "Hi there!", { maxAge: 60000 * 60 }); // cookies expired in 1 hour
    return res.status(200).send({ msg: "Cookies created!" });
});
// check cookies
app.get("/cookies/check", async (req, res) => {
    console.log(req.cookies);
    const cookieValue = req.cookies.cookieTest;
    if (!req.cookies.cookieTest) {
        return res.status(200).send({ msg: "Checking cookies: not found!", });
    }
    return res.status(200).send({ msg: "Checking cookies:", cookies: `${cookieValue}` });
});
// express-session testing
app.get("/session/check", async (req, res) => {
    console.log(req.session);
    console.log(req.sessionID);
    console.log(req.session.id);
    req.session.visited = true;
    return res.status(200).send({ msg: "Checking cookies:" });
});
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
