import connectPgSimple from 'connect-pg-simple';
import express, { Express } from 'express';
import session from 'express-session';
import './config.js'; // do not remove this line
import {
  createClubMember,
  getClubMemberByTheId,
  getClubMemberByTheRole,
  getClubMembers,
  updatedClubMemberRole,
} from './controllers/ClubMemberController.js';
import {
  createUser,
  getUserByTheEmail,
  getUserByTheId,
  getUsers,
  logIn,
  logOut,
  registerUser,
  updatedUserEmail,
  updatedUserFirstName,
  updatedUserLastName,
  updatedUserPassword,
} from './controllers/UserController.js';
import {
  getClubs,
  getClubByTheId,
  getClubByTheName,
  getClubByCreator,
  getClubByTheVisibility,
  getClubByTheMaxMembers,
  getClubByTheCreatedDate,
  createClub,
  updatedClubName,
  updatedClubJoinCode,
  updatedClubVisibility,
  updatedClubMaxMembers,
} from './controllers/ClubController.js';
import { sessionMiddleware } from './sessionConfig.js';

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
// club
app.get('/clubs', getClubs);
app.get('/clubs/:clubId', getClubByTheId);
app.get('/club/:clubName', getClubByTheName);
app.get('/club/:createdByUser', getClubByCreator);
app.get('/club/:visbility', getClubByTheVisibility);
app.get('/club/:maxMembers', getClubByTheMaxMembers);
app.get('/club/:createdAt', getClubByTheCreatedDate);
app.post('/clubs', createClub);
app.patch('/clubs/:clubId/club-name', updatedClubName);
app.patch('/clubs/:clubId/join-code', updatedClubJoinCode);
app.patch('/clubs/:clubId/visbility', updatedClubVisibility);
app.patch('/clubs/:clubId/max-members', updatedClubMaxMembers);

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
