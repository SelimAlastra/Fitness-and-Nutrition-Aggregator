import { React, useEffect } from "react";
import reactDom from "react-dom";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Report from "./Report/Report";
import ReportForm from './ReportForm'
import { getReports } from "../../actions/reports";

const Reports = () => {

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getReports());
    }, [dispatch]);

    const reports = useSelector((state) => state.reports);

    return (
        <>
        <ReportForm />
        <Table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Description</th>
                        <th>Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {reports.map((report) => (
                        <tr key={report._id} >
                            <Report report={report} />
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default Reports;