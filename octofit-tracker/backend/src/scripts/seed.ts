import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    const userData = [
      { email: 'maya.chen@example.org', name: 'Maya Chen', grade: 10, age: 15 },
      { email: 'jordan.rivera@example.org', name: 'Jordan Rivera', grade: 11, age: 16 },
      { email: 'alex.morgan@example.org', name: 'Alex Morgan', grade: 9, age: 14 },
    ];
    const users = await Promise.all(userData.map((user) =>
      User.findOneAndUpdate(
        { email: user.email },
        { $set: user },
        { upsert: true, new: true },
      ).select('_id'),
    ));
    const [maya, jordan, alex] = users;

    const teamData = [
      {
        slug: 'trail-blazers',
        name: 'Trail Blazers',
        description: 'A team focused on running and outdoor activity.',
        members: [maya._id, jordan._id],
      },
      {
        slug: 'core-crew',
        name: 'Core Crew',
        description: 'A team building strength through consistent training.',
        members: [alex._id],
      },
    ];
    const teams = await Promise.all(teamData.map((team) =>
      Team.findOneAndUpdate(
        { slug: team.slug },
        { $set: team },
        { upsert: true, new: true },
      ).select('_id'),
    ));
    const [trailBlazers, coreCrew] = teams;

    const activityData = [
      {
        seedKey: 'maya-morning-run', user: maya._id, team: trailBlazers._id,
        type: 'running', durationMinutes: 32, distanceKm: 4.8, points: 48,
        completedAt: new Date('2026-09-20T07:30:00Z'),
      },
      {
        seedKey: 'jordan-after-school-walk', user: jordan._id, team: trailBlazers._id,
        type: 'walking', durationMinutes: 45, distanceKm: 3.6, points: 36,
        completedAt: new Date('2026-09-21T15:45:00Z'),
      },
      {
        seedKey: 'alex-strength-session', user: alex._id, team: coreCrew._id,
        type: 'strength', durationMinutes: 35, points: 42,
        completedAt: new Date('2026-09-22T16:00:00Z'),
      },
    ];
    await Promise.all(activityData.map((activity) =>
      Activity.findOneAndUpdate(
        { seedKey: activity.seedKey },
        { $set: activity },
        { upsert: true, new: true },
      ),
    ));

    const leaderboardData = [
      { user: maya._id, team: trailBlazers._id, points: 186, rank: 1 },
      { user: jordan._id, team: trailBlazers._id, points: 154, rank: 2 },
      { user: alex._id, team: coreCrew._id, points: 121, rank: 3 },
    ];
    await Promise.all(leaderboardData.map((entry) =>
      LeaderboardEntry.findOneAndUpdate(
        { user: entry.user },
        { $set: entry },
        { upsert: true, new: true },
      ),
    ));

    const workoutData = [
      {
        slug: 'easy-5k-builder', title: 'Easy 5K Builder', category: 'running',
        description: 'A conversational-pace run with a short warm-up and cool-down.',
        durationMinutes: 30, difficulty: 'beginner',
      },
      {
        slug: 'bodyweight-basics', title: 'Bodyweight Basics', category: 'strength',
        description: 'Three rounds of squats, wall push-ups, lunges, and planks.',
        durationMinutes: 25, difficulty: 'beginner',
      },
      {
        slug: 'recovery-walk', title: 'Recovery Walk', category: 'walking',
        description: 'A relaxed walk to support recovery and build a daily movement habit.',
        durationMinutes: 20, difficulty: 'beginner',
      },
    ];
    await Promise.all(workoutData.map((workout) =>
      Workout.findOneAndUpdate(
        { slug: workout.slug },
        { $set: workout },
        { upsert: true, new: true },
      ),
    ));

    console.log('Seeded users, teams, activities, leaderboard, and workouts');
    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
