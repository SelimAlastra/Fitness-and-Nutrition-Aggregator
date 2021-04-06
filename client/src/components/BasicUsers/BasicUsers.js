import { React, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import BasicUser from "./BasicUser/BasicUser";
import { getBasicUsers } from "../../actions/basicUsers";

const BasicUsers = () => {

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getBasicUsers());
    }, [dispatch]);

    const users = useSelector((state) => state.basicUsers);

    return (
        
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
                            <BasicUser user={user} />
                        </tr>
                    ))}
                </tbody>
        </Table>
    );
}

export default BasicUsers;