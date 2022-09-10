import { useCookies } from 'react-cookie';
import { userApi } from '../redux/api/userApi';


const AuthMiddleware = ({ children }) => {
  const [cookies] = useCookies(['logged_in']);

  const { isLoading } = userApi.endpoints.getMe.useQuery(null, {
    skip: !cookies.logged_in,
  });

  if (isLoading) {
    return "Loading...";
  }

  return children;
};

export default AuthMiddleware;