import express, { Express } from 'express';
import './config.js'; // do not remove this line
import { sessionMiddleware } from './sessionConfig.js';
import {
  getUsers,
  getUserByTheId,
  getUserByTheEmail,
  registerUser,
  logIn,
  createUser,
  updatedUserEmail,
  logOut,
  updatedUserPassword,
  updatedUserFirstName,
  updatedUserLastName,
} from './controllers/UserController.js';
import {
  updatedClubMemberRole,
  getClubMembers,
  getClubMemberByTheId,
  getClubMemberByTheRole,
  createClubMember,
} from './controllers/ClubMemberController.js';
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
// users
app.post('/users', registerUser);
app.post('users/login', logIn);
app.delete('/sessions', logOut);
app.post('/users', createUser);
app.patch('/users/:userId/email', updatedUserEmail);
app.get('/users', getUsers);
app.get('/user/:id', getUserByTheId);
app.get('/user/:email', getUserByTheEmail);
app.patch('/user/:userId/password', updatedUserPassword);
app.patch('/user/:userId/first-name', updatedUserFirstName);
app.patch('/user/:userId/last-name', updatedUserLastName);
// club members
app.get('/club-members', getClubMembers);
app.get('/club-member:clubMemberId', getClubMemberByTheId);
app.get('/club-member/:ClubRole', getClubMemberByTheRole);
app.post('/club-members', createClubMember);
app.patch('/club-members/:clubMemberId/role', updatedClubMemberRole);

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
