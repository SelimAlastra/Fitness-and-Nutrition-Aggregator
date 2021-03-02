import { React, useEffect } from "react";
import reactDom from "react-dom";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Issue from "./Issue/Issue";
import IssueForm from './IssueForm'
import { getIssues } from "../../actions/issues";

const Issues = () => {

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getIssues());
    }, [dispatch]);

    const issues = useSelector((state) => state.issues);

    return (
        <>
        <IssueForm />
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
                {issues.map((issue) => (
                        <tr key={issue._id} >
                            <Issue issue={issue} />
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default Issues;