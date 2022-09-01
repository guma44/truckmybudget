import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';

import { applicationUserSelector } from '../../entities/app/selectors';
import ExpanseTable from '../../components/ExpenseTable';

const StyledPaper = styled(Paper)`
  width: 90%;
  margin: 4rem auto;
  padding: 2rem;
  background-color: #f0f0f0;

  @media (min-width: 768px) {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`;

const HomeView = () => {
    return (
        <StyledPaper>
            <ExpanseTable></ExpanseTable>
        </StyledPaper>
    );
};

export default HomeView;
