import { useSelector } from 'react-redux';

function TestLoginPage() {
    const username = useSelector(state => state.auth.username);

    return (
        <p>{username}</p>
    );
}

export default TestLoginPage;
