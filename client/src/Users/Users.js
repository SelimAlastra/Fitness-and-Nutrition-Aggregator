import { React } from "react";
import reactDom from "react-dom";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import User from "./User/User";
import UserForm from './UserForm'

const Users = () => {

    const users = useSelector((state) => state.users);

    console.log(users);

    return (
        <>
        <UserForm />
        <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>isBanned?</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} >
                            <User user={user} />
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default Users;