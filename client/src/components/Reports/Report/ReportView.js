import React, { useEffect, useState } from 'react';
import { Button, ListGroup, ListGroupItem, Container } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { getReport, deleteReport } from "../../../actions/reports";
import { getPost, deletePost } from "../../../actions/posts";
import { useParams } from "react-router-dom";
import Post from "../../Posts/Post/Post";



const ReportView = () => {

    const dispatch = useDispatch();

    const report = useSelector((state) => state.reports);

    const { id } = useParams();

    useEffect(() => {
        dispatch(getReport(id));
    }, []);

    
    useEffect(() => {
        if (report){
            dispatch(getPost(report.postId));
        }
    }, [report]);


    const post = useSelector((state) => state.posts);

    

    const handleDelete = () => {
        dispatch(deleteReport(report._id));
        window.location.href="/admin/reports";
    }

    const handleDelete2 = () => {
        dispatch(deleteReport(report._id));
        dispatch(deletePost(post._id));
        window.location.href="/admin/reports";
    }

    return(
        <>
            <Button variant="primary" onClick={() => {window.location.href="/admin/reports"}}>Back</Button>
            <br />
            <br />
            <ListGroup>
                <ListGroupItem>Reporter Username: {report.reporterUsername}</ListGroupItem>
                <ListGroupItem>Reported Username: {report.reportedUsername}</ListGroupItem>
                <ListGroupItem>Reason: {report.reason}</ListGroupItem>
                <ListGroupItem>Post: <Post post={post} /> </ListGroupItem>
                <ListGroupItem>Created at: {report.createdAt}</ListGroupItem>
            </ListGroup>
            <br />
            <Button variant="primary" onClick={ () => { handleDelete() }}>Delete Report</Button>
            <br />
            <br />
            <Button variant="primary" onClick={ () => { handleDelete2() }}>Delete Report & Post</Button>
        </>
    );
}

export default ReportView