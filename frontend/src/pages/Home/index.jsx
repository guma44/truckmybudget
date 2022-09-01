import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';

import { applicationUserSelector } from '../../entities/app/selectors';

const StyledPaper = styled(Paper)`
  width: 60%;
  margin: 4rem auto;
  padding: 2rem;
  background-color: #f0f0f0;

  @media (min-width: 768px) {
    margin-top: 8rem;
    margin-bottom: 8rem;
  }
`;

const HomeView = () => {
    const user = useSelector(applicationUserSelector);
    return (
        <div>

        {user ? (
            <span>Hey {user.username}!</span>
        ) : (
            <span>
                Loading...
            </span>
        )}
        </div>
    );
};

export default HomeView;
