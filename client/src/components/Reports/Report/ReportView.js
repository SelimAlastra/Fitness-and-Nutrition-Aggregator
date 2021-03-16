





const ReportView = () => {

    const dispatch = useDispatch();

    const { id } = useParams();

    const report = useSelector((state) => id ? state.reports.find(u => u._id === id) : null);
    const post = useSelector((state) => report.postId ? state.posts.find(u => u._id === report.postId) : null);
    
    

    const handleDelete = () => {
        dispatch(deleteBasicUser(user._id));
    }
    
    return(
        <>
            <LinkContainer to='/Reports'>
                <Button variant="primary">Back</Button>
            </LinkContainer>
            <br />
            <br />
            <ListGroup>
                <ListGroupItem>Reporter Username: {report.reporter}</ListGroupItem>
                <ListGroupItem>Reported Username: {user.name}</ListGroupItem>
                <ListGroupItem>Reason: {report.reason}</ListGroupItem>
                <ListGroupItem>isBanned: {""+user.isBanned}</ListGroupItem>
                <ListGroupItem>Gender: {user.gender}</ListGroupItem>
                <ListGroupItem>DOB: {user.dob}</ListGroupItem>
                <ListGroupItem>Created at: {user.createdAt}</ListGroupItem>
            </ListGroup>
            <br />
            <LinkContainer to={{pathname:"/BasicUsers/edit/" + user._id, state: {user: user}}}>
                <Button variant="primary">Edit</Button>
            </LinkContainer>
            &nbsp; &nbsp;
            <Button variant="primary" onClick={ () => { handleBan() }}>Ban</Button>
            &nbsp; &nbsp;
            <LinkContainer to='/BasicUsers'>
                <Button variant="primary" onClick={ () => { handleDelete() }}>Delete</Button>
            </LinkContainer>
        </>
    );
}

export default ReportView