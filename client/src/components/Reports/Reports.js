import { React, useEffect } from "react";
import reactDom from "react-dom";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Report from "./Report/Report";
import ReportForm from './ReportForm'
import { getReports } from "../../actions/reports";
import { getPosts } from "../../actions/posts";
import '../sharedStyles/admin.css';


const Reports = () => {

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getReports());
    }, [dispatch]);

    const reports = useSelector((state) => state.reports);

    return (
        <Table className="admin">
                <thead>
                    <tr>
                        <th>Reporter Username</th>
                        <th>Reported Username</th>
                        <th>Reason</th>
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
    );
}

export default Reports;