import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import ExpanseTable from '../../components/ExpenseTable';
import FormDialog from '../../components/FormDialog';
import { Alert, Button, Snackbar } from '@mui/material';
import { toggleSnackbar } from '../../entities/app';
import { snackbarSelector } from '../../entities/app/selectors';


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
  const { isOpen, message } = useSelector(snackbarSelector);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(toggleSnackbar({ isOpen: false, message: "" }));
  }
  return (
    <StyledPaper>
      <FormDialog></FormDialog>
      {isOpen && (<Snackbar open={true} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>)}
      <Button onClick={() => dispatch(toggleSnackbar({ isOpen: true, message: "Test" }))}>Test</Button>
      <ExpanseTable></ExpanseTable>
    </StyledPaper>
  );
};

export default HomeView;
