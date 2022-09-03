import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import { formDialogSelector } from '../../entities/app/selectors';
import ExpanseTable from '../../components/ExpenseTable';
import FormDialog from '../../components/FormDialog';



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
          <FormDialog></FormDialog>
          <ExpanseTable></ExpanseTable>
      </StyledPaper>
  );
};

export default HomeView;
