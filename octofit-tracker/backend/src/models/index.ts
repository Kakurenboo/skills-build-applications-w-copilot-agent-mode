import { model, Schema } from 'mongoose';

const collectionSchema = new Schema({}, { strict: false, timestamps: true });

export const User = model('User', collectionSchema, 'users');
export const Team = model('Team', collectionSchema, 'teams');
export const Activity = model('Activity', collectionSchema, 'activities');
export const LeaderboardEntry = model('LeaderboardEntry', collectionSchema, 'leaderboard');
export const Workout = model('Workout', collectionSchema, 'workouts');