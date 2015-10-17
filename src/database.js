const mongoose = require('mongoose');
const connectionUri = `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_SOURCE}`;

mongoose.connect(connectionUri, {
  user: process.env.DATABASE_USERNAME,
  passport: process.env.DATABASE_PASSWORD
});

module.exports = mongoose;
