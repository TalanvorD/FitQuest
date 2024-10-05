const db = require('../config/connection');
const { User, Activity, Quests } = require('../models');
const userSeeds = require('./userSeeds.json');
const activitySeeds = require('./activitySeeds.json');
const questSeeds = require('./questSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Activity', 'activities');
    await cleanDB('User', 'users');
    await cleanDB('Quests', 'quests');

    await User.create(userSeeds);

    await Quests.create(questSeeds);

    for (let i = 0; i < activitySeeds.length; i++) {
      const { _id, activityCreator } = await Activity.create(activitySeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: activityCreator },
        {
          $addToSet: {
            activities: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('All done seeding!');
  process.exit(0);
});
