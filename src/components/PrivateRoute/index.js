import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import config from '~/config';
import { AuthContext } from '~/context/AuthProvider';

function PrivateRoute() {
    const { user } = useContext(AuthContext);
    return <>{user ? <Outlet /> : <Navigate to={config.routes.home} />}</>;
}

export default PrivateRoute;
