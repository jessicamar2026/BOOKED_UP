import express, { Express } from 'express';
import './config.js'; // do not remove this line
import { sessionMiddleware } from './sessionConfig.js';
import {
  getUsers,
  getUserByTheEmail,
  registerUser,
  logIn,
  createUser,
  updatedUserEmail,
  logOut,
} from './controllers/UserController.js';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';

const app: Express = express();
const { PORT, COOKIE_SECRET } = process.env;
const PostgresStore = connectPgSimple(session);

app.use(sessionMiddleware); // Setup session management middleware
app.use(express.json()); // Setup JSON body parsing middleware
app.use(express.urlencoded({ extended: false })); // Setup urlencoded (HTML Forms) body parsing middleware
app.use(
  session({
    store: new PostgresStore({ createTableIfMissing: true }),
    secret: COOKIE_SECRET,
    cookie: { maxAge: 8 * 60 * 60 * 1000 },
    name: 'session',
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(express.json());

// Setup static resource file middleware
// This allows the client to access any file inside the `public` directory
// Only put file that you actually want to be publicly accessibly in the `public` folder
app.use(express.static('public', { extensions: ['html'] }));

// -- Routes --------------------------------------------------
app.post('/users', registerUser);
app.post('users/login', logIn);
app.delete('/sessions', logOut);
app.post('/users', createUser);
app.patch('/users/:id/email', updatedUserEmail);
app.get('/users', getUsers);
app.get('/user/:id', getUserByTheEmail);

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
