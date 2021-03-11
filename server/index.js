import express from 'express'
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import issueRoutes from './routes/issues.js';
import adminRoutes from './routes/admins.js';
import basicUserRoutes from './routes/basicUsers.js';
// import commentRoutes from './routes/comments.js';
// import likeRoutes from './routes/likes.js';
// import postRoutes from './routes/posts.js';
import professionalUserRoutes from './routes/professionalUsers.js';
// import subscriberRoutes from './routes/subscribers.js';
// import subscriptionRoutes from './routes/subscriptions.js';
import serviceRoutes from './routes/services.js'


const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));
app.use(cors());

app.use('/issues', issueRoutes);
app.use('/users', userRoutes);
app.use('/basicUsers', basicUserRoutes);
app.use('/professionalUsers', professionalUserRoutes);
app.use('/admins', adminRoutes);
app.use('/services', serviceRoutes);

app.use('/posts', postRoutes);
// app.use('/comments', commentRoutes);
// app.use('/likes', likeRoutes);
// app.use('/subscriptions', subscriptionRoutes);
// app.use('/subscribers', subscriberRoutes);

const PORT = process.env.PORT || 5000;
const uri = process.env.CONNECTION_URL;

mongoose.connect(`${uri}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log('Server running on port: ' + PORT )))
    .catch((error) => console.log(error.message));

// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log("*******MongoDB database connection established successfully********");
// })
    
mongoose.set('useFindAndModify', false);