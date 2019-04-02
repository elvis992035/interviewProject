const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const serverPath = 3000; // localhost server

// importing routers
const userRouter = require('./controller/userController.js');

// middleware
app.use(express.json());
app.use(cors());

// database
mongoose
  .connect(
    'mongodb+srv://elvis992035:FLCWKJqJy6BtH8Su@cluster0-wvkpb.mongodb.net/test?retryWrites=true',

    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(err => {
    console.log('Connection failed!', err);
  });

// to get rid of this error

mongoose.set('useCreateIndex', true);

// routers
app.use('/', userRouter); // login && logout routers


// running it on the localhost:3000
app.listen(serverPath, () => {
  console.log('the project is running on ' + serverPath);
});
