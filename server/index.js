import express from 'express'
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import reportRoutes from './routes/reports.js';
import bucketRoutes from './routes/buckets.js';
import adminRoutes from './routes/admins.js';
import basicUserRoutes from './routes/basicUsers.js';
import professionalUserRoutes from './routes/professionalUsers.js';
import serviceRoutes from './routes/services.js'
import goalsRoutes from './routes/goals.js';


const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));
app.use(cors());

app.use('/reports', reportRoutes);
app.use('/basicUsers', basicUserRoutes);
app.use('/professionalUsers', professionalUserRoutes);
app.use('/admins', adminRoutes);
app.use('/services', serviceRoutes);
app.use('/goals', goalsRoutes);
app.use('/posts', postRoutes);
app.use('/buckets', bucketRoutes);


const PORT = process.env.PORT || 5000;
let uri = process.env.ATLAS_URI;

const env = process.env.NODE_ENV || 'development';

if (env !== 'test') {

    mongoose.connect(`${uri}`, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => app.listen(PORT, () => console.log('Server running on port: ' + PORT )))
        .catch((error) => console.log(error.message));

    mongoose.set('useFindAndModify', false);
    mongoose.set("useCreateIndex", true);
}



export default app;