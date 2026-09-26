import { Router } from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const apiRouter = Router();

apiRouter.get('/users/', async (_request, response, next) => {
  try {
    response.json(await User.find().lean());
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/teams/', async (_request, response, next) => {
  try {
    response.json(await Team.find().lean());
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/activities/', async (_request, response, next) => {
  try {
    response.json(await Activity.find().lean());
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/leaderboard/', async (_request, response, next) => {
  try {
    response.json(await LeaderboardEntry.find().lean());
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/workouts/', async (_request, response, next) => {
  try {
    response.json(await Workout.find().lean());
  } catch (error) {
    next(error);
  }
});

export default apiRouter;