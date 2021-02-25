import UserMessage from '../models/users.js'

export const getUsers = async (req, res) => {
    try {
        const users = await UserMessage.find();

        console.log(users);

        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createUser = async (req, res) => {
    const user = res.body;

    const newUser = new UserMessage(user);

    try {
        await newUser.save();

        res.status(201).json(newUser);
    } catch(error) {
        res.status(409).json( {message: error.message });
    }

    res.send('User Creation');
};