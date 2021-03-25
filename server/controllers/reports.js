import Report from '../models/reports.js'
import mongoose from "mongoose";

export const getReports = async (req, res) => {
    try {
        const reports = await Report.find();

        res.status(200).json(reports);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createReport = async (req, res) => {
    const report = req.body;

    const newReport = new Report(report);

    try {
        await newReport.save();

        res.status(201).json(newReport);
    } catch(error) {
        res.status(409).json( {message: error.message });
    }
};

export const deleteReport = async (req, res) => {
    const { id: _id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return (res.status(404).send('No report with that id'));

    await Report.findByIdAndRemove(_id);

    res.json({ message: 'Report deleted successfully' });
};

export const getReport = async (req, res) => {
    Report.findById(req.params.id)
      .then(report => res.json(report))
      .catch(err => res.status(400).json('Error: Cannot find this Report' + err));
  };