import React, { useEffect, useState } from 'react';
import { Button, ListGroup, ListGroupItem, Container } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { getReport, deleteReport } from "../../../actions/reports";
import { getPost, deletePost } from "../../../actions/posts";
import { useParams } from "react-router-dom";
import Post from "../../Posts/Post/Post";
import '../../admin.css';

const ReportView = () => {

    const dispatch = useDispatch();

    const report = useSelector((state) => state.reports);

    const { id } = useParams();

    useEffect(() => {
        dispatch(getReport(id));
    }, []);


    useEffect(() => {
        if (report) {
            dispatch(getPost(report.postId));
        }
    }, [report]);


    const post = useSelector((state) => state.posts);


    const handleDelete = () => {
        dispatch(deleteReport(report._id));
        window.location.href = "/admin/reports";
    }

    const handleDelete2 = () => {
        dispatch(deletePost(report.postId));
        window.location.href = "/admin/reports";
    }

    return (
        <>
            <Button variant="primary" onClick={() => { window.location.href = "/admin/reports" }}>Back</Button>
            <br />
            <br />
            <ListGroup>
                <ListGroupItem>Reporter Username: {report.reporterUsername}</ListGroupItem>
                <ListGroupItem>Reported Username: {report.reportedUsername}</ListGroupItem>
                <ListGroupItem>Reason: {report.reason}</ListGroupItem>
                <ListGroupItem style={{ "justifyContent": "center", "display": "flex" }}>
                    <p style={{ "marginTop": "12%", "marginBottom": "12%"}}>Post:</p>
                    <Post post={post} />
                </ListGroupItem>
                <ListGroupItem>Created at: {report.createdAt}</ListGroupItem>
            </ListGroup>
            <Button className="adminB" variant="primary" onClick={() => { handleDelete() }}>Delete Report</Button>
            <Button className="adminB" variant="primary" onClick={() => { handleDelete2() }}>Delete Report & Post</Button>
        </>
    );
}

export default ReportView