require('colors');
require('dotenv').config();
require('./models/Node-form');
const app = require('./app');
const mongoose = require('mongoose');


mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection
  .on('open', () => {
    console.log('-: Mongoose connection open :-');
  })
  .on('error', (err) => {
    console.log(`-: Connection error: ${err.message} :-`);
  });

/*  
const app = require('./app');
*/
const server = app.listen(3000, () => {
      console.log(`.: --------------------------------:.`.bgGray.red);
      console.log(`.: Express is running on port ${server.address().port} :.`.bgGray.blue);
      console.log(`.: --------------------------------:.`.bgGray.red);
});
