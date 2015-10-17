const mongoose = require('mongoose');
const seeder = require('src/migrations/seeder');
const connectionUri = `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_SOURCE}`;

mongoose.connect(connectionUri, {
  user: process.env.DATABASE_USERNAME,
  passport: process.env.DATABASE_PASSWORD
});

// seeder();

module.exports = mongoose;
