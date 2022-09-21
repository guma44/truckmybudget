import { useCookies } from 'react-cookie';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { userApi } from '../../redux/api/userApi';

const RequireUser = ({ allowedRoles }) => {
  const [cookies] = useCookies(['logged_in']);
  const location = useLocation();

  const { isLoading, isFetching } = userApi.endpoints.getMe.useQuery(null, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  const loading = isLoading || isFetching;

  const user = userApi.endpoints.getMe.useQueryState(null, {
    selectFromResult: ({ data }) => data,
  });

  if (loading) {
    return "Loading..."
  }

  if ((cookies.logged_in || user)) {
    return (<Outlet />)
  }
  else {
    if (cookies.logged_in && user) {
      return <Navigate to='/' state={{ from: location }} replace />
    }
    else {
      return <Navigate to='/login' state={{ from: location }} replace />
    }
  }
};

export default RequireUser;
