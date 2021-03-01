import express from 'express'
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from './routes/users.js'
import issueRoutes from './routes/issues.js'

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));
app.use(cors());

app.use('/issues', issueRoutes);
app.use('/users', userRoutes);

const CONNECTION_URL = "mongodb+srv://khalid:khalid123123@cluster0.bqcmt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log('Server running on port: ' + PORT )))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);