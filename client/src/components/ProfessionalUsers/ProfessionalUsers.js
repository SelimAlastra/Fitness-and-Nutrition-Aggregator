import { React, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import ProfessionalUser from "./ProfessionalUser/ProfessionalUser";
import { getProfessionalUsers } from "../../actions/professionals";

const ProfessionalUsers = () => {

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getProfessionalUsers());
    }, [dispatch]);

    const users = useSelector((state) => state.professional);

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
                            <ProfessionalUser user={user} />
                        </tr>
                    ))}
                </tbody>
        </Table>
    );
}

export default ProfessionalUsers;