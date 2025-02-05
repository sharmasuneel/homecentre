import Header from 'component/custom/Header/Header';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
const Dashboard = () => {
const { isAuthenticated } = useSelector((state) => state.auth);
const navigate = useNavigate();
if (!isAuthenticated) {
     navigate('/login');
}
return (
     <>
        <h1>dashboard</h1>
        <Header />
    </>
)
}

export default Dashboard