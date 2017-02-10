import * as AuthenticationController from './controllers/authentication'
import express from 'express'
import passportService from './config/passport'
import passport from 'passport'
import {Person} from './models/personModel'
import {personRoutes} from './Routes/personRoutes'
import {Case} from './models/caseModel'
import {casseRoutes} from './Routes/caseRoutes'

const requireAuth = passport.authenticate('jwt', { session: false});
const requireLogin = passport.authenticate('local', { session: false });
const REQUIRE_ADMIN = "Admin";
const REQUIRE_OWNER = "Owner";
const REQUIRE_CLIENT = "Client";
const REQUIRE_MEMBER = "Member";

let passRoutes = function (app) {
  // Initializing route groups
  const apiRoutes = express.Router();
  const authRoutes = express.Router();
  let personRouter = personRoutes(Person);
  let caseRouter = casseRoutes(Case);
  //=========================
  // Auth Routes
  //=========================

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);
  apiRoutes.get('/dashboard', requireAuth, function (req, res) {
    res.send('It worked! User id is: ' + req.user.profile.firstName + '.');
  });
  app.use('/api/persons', requireAuth, personRouter)
  app.use('/api/persons/', requireAuth, personRouter)
  app.use('/api/case', requireAuth, caseRouter)
  // Registration route
  authRoutes.post('/register', AuthenticationController.register);

  // Login route
  authRoutes.post('/login', requireLogin, AuthenticationController.login);

  // Set url for API group routes
  app.use('/api2', apiRoutes);
};

export {passRoutes}