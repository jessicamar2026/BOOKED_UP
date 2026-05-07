import connectPgSimple from 'connect-pg-simple';
import express, { Express } from 'express';
import session from 'express-session';
import './config.js'; // do not remove this line
import {
  createClub,
  getClubByCreator,
  getClubByTheCreatedDate,
  getClubByTheId,
  getClubByTheMaxMembers,
  getClubByTheName,
  getClubByTheVisibility,
  getClubs,
  joinClub,
  updatedClubJoinCode,
  updatedClubMaxMembers,
  updatedClubName,
  updatedClubVisibility,
} from './controllers/ClubController.js';
import {
  createClubMember,
  getClubMemberByTheId,
  getClubMemberByTheRole,
  getClubMembers,
  updatedClubMemberRole,
} from './controllers/ClubMemberController.js';
import {
  createUser,
  getMe,
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

// Setup static resource file middleware
// This allows the client to access any file inside the `public` directory
// Only put file that you actually want to be publicly accessibly in the `public` folder
app.use(express.static('public', { extensions: ['html'] }));
app.use(express.static('frontend/build'));

// -- Routes --------------------------------------------------
// users
app.post('/api/register', registerUser);
app.post('/api/login', logIn);
app.delete('/sessions', logOut);
app.post('/api/users', createUser);
app.patch('/api/users/:userId/email', updatedUserEmail);
app.get('/api/users', getUsers);
app.get('/api/user/:id', getUserByTheId);
app.get('/api/user/:email', getUserByTheEmail);
app.get('/api/me', getMe);
app.patch('/api/user/:userId/password', updatedUserPassword);
app.patch('/api/user/:userId/first-name', updatedUserFirstName);
app.patch('/api/user/:userId/last-name', updatedUserLastName);
// club members
app.get('/api/club-members', getClubMembers);
app.get('/api/club-member:clubMemberId', getClubMemberByTheId);
app.get('/api/club-member/:ClubRole', getClubMemberByTheRole);
app.post('/api/club-members', createClubMember);
app.patch('/api/club-members/:clubMemberId/role', updatedClubMemberRole);
// club
app.get('/api/clubs', getClubs);
app.get('/api/clubs/:clubId', getClubByTheId);
app.get('/api/club/:clubName', getClubByTheName);
app.get('/api/club/:createdByUser', getClubByCreator);
app.get('/api/club/:visibility', getClubByTheVisibility);
app.get('/api/club/:maxMembers', getClubByTheMaxMembers);
app.get('/api/club/:createdAt', getClubByTheCreatedDate);
app.post('/api/clubs', createClub);
app.post('/api/clubs/join', joinClub);
app.patch('/api/clubs/:clubId/club-name', updatedClubName);
app.patch('/api/clubs/:clubId/join-code', updatedClubJoinCode);
app.patch('/api/clubs/:clubId/visibility', updatedClubVisibility);
app.patch('/api/clubs/:clubId/max-members', updatedClubMaxMembers);

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
