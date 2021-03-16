import React from "react";
import { Button,Container } from "react-bootstrap";
import { deleteReport } from "../../../actions/reports";
import { useDispatch, useSelector } from 'react-redux';
import Post from '../../Posts/Post/Post'

const Report = ({ report }) => {

    const dispatch = useDispatch();
    const postId = "604fe8ac453c911868472376";

    const postx = useSelector((state) => postId ? state.posts.find(u => u._id === postId) : null);
    return (
        <>
            <td>{report.reporterId}</td>
            <td>{report.reportedId}</td>
            <td>{report.reason}</td>
            <td><Post post={postx} /></td>
            <td>{report.createdAt}</td>
            <td></td>
            <td>
                <Container>
                    <Button variant="primary" onClick={ () => { dispatch(deleteReport(report._id)) }}>Delete</Button> &nbsp;
                    <Button variant="primary" onClick={ () => {}}>View Post</Button>
                </Container>
            </td>
        </>
    )
}

export default Report;