import { React } from "react";
import reactDom from "react-dom";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import Issue from "./Issue/Issue";
import IssueForm from './IssueForm'

const Issues = () => {

    const issues = useSelector((state) => state.issues);

    console.log(issues);

    return (
        <>
        <IssueForm />
        <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
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