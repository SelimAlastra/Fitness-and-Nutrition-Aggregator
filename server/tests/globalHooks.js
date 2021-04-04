import mongoose from "mongoose";
import app from '../index.js';

let server;

export const mochaGlobalSetup = async () => {

    const uri = process.env.TEST_PORT;
    const PORT = process.env.PORT || 5000;

    server = await mongoose.connect(`${uri}`, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => app.listen(PORT, () => console.log('Server running on port: ' + PORT )))
        .catch((error) => console.log(error.message));

    mongoose.set('useFindAndModify', false);
    mongoose.set("useCreateIndex", true);
};

export const mochaGlobalTeardown = async () => {
    server.close();
    console.log('server stopped!');
};