const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("*******MongoDB database connection established successfully********");
})

const basicUsersRouter = require('./routes/basicUsers');
app.use('/basicUsers', basicUsersRouter);

const professionalUsersRouter = require('./routes/professionalUsers');
app.use('/professionalUsers', professionalUsersRouter);

const adminsRouter = require('./routes/admins');
app.use('/admins', adminsRouter);

const servicesRouter = require('./routes/services');
app.use('/services', servicesRouter);

const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);

const commentsRouter = require('./routes/comments');
app.use('/comments', commentsRouter);

const likesRouter = require('./routes/likes');
app.use('/likes', likesRouter);

const subscriptionsRouter = require('./routes/subscriptions');
app.use('/subscriptions', subscriptionsRouter);

const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers', subscribersRouter);





app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});