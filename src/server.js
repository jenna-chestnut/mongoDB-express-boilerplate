require('dotenv').config();
const app = require('./app');
const { PORT, ATLAS_URI } = require('./config');
const mongoose = require('mongoose');

mongoose.connect(ATLAS_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const { connection } = mongoose;
connection.once('open', () => {
  console.log('MongoDB database connected successfully');
});

app.listen(PORT, () => {
  console.log(`Express server is running on port: ${PORT}`);
});

