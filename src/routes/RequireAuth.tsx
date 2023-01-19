import { useLocation, Navigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
    const isAuthenticated = localStorage.getItem('token')
        ? true :
        false

    const location = useLocation()

    return (
        isAuthenticated ?
            <Outlet />
            : <Navigate replace to='/auth' state={{ from: location }} />
    )
}

export default RequireAuth