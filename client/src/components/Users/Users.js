import { React, useEffect } from "react";
import reactDom from "react-dom";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../actions/users";
import User from "./User/User";
import UserForm from './UserForm'

const Users = () => {

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getUsers());
    }, [dispatch]);

    const users = useSelector((state) => state.users);

    return (
        <>
        <UserForm />
        <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>View</th>
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