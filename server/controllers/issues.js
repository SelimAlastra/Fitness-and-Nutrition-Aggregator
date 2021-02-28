import Issue from '../models/issues.js'
import mongoose from "mongoose";

export const getIssues = async (req, res) => {
    try {
        const issues = await Issue.find();

        console.log(issues);

        res.status(200).json(issues);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createIssue = async (req, res) => {
    const issue = req.body;

    const newIssue = new Issue(issue);

    try {
        await newIssue.save();

        res.status(201).json(newIssue);
    } catch(error) {
        res.status(409).json( {message: error.message });
    }

    res.send('Issue Creation');
};

export const deleteIssue = async (req, res) => {
    const { id: _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return (res.status(404).send('No issue with that id'));

    await Issue.findByIdAndRemove(_id);

    res.json({ message: 'Issue deleted successfully' });
};