import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import ExpanseTable from '../../components/ExpenseTable';
import FormDialog from '../../components/FormDialog';
import { Alert, Button, Snackbar } from '@mui/material';
import Accounts from '../../components/Accounts';
import AddAccountDialog from '../../components/AddAccountDialog';
import { useGetAccountsQuery } from '../../redux/api/accountsApi';
// import { toggleSnackbar } from '../../entities/app';
// import { snackbarSelector } from '../../entities/app/selectors';


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
  // const { isOpen, message } = useSelector(snackbarSelector);
  const isDialogOpen = useSelector((state) => state.expenseDialog.isOpen);
  const isAddAccountDialogOpen = useSelector((state) => state.accountDialog.isOpen);

  const handleClose = () => {
    // dispatch(toggleSnackbar({ isOpen: false, message: "" }));
  }
  return (
    <StyledPaper>
      <FormDialog isOpen={isDialogOpen}/>
      {isAddAccountDialogOpen && <AddAccountDialog />}
      {false && (<Snackbar open={true} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>)}
      <Accounts></Accounts>
      <ExpanseTable></ExpanseTable>
    </StyledPaper>
  );
};

export default HomeView;
