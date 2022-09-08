import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import ExpanseTable from '../../components/ExpenseTable';
import CreateExpenseDialog from '../../components/CreateExpenseDialog';
import EditExpenseDialog from '../../components/EditExpenseDialog';
import { Alert, Snackbar } from '@mui/material';
import Accounts from '../../components/Accounts';
import AddAccountDialog from '../../components/AddAccountDialog';

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
  const isCreateDialogOpen = useSelector((state) => state.expenseDialog.isOpen);
  const { isOpen: isEditDialogOpen, expense: expenseToEdit } = useSelector((state) => state.editExpenseDialog);
  const isAddAccountDialogOpen = useSelector((state) => state.accountDialog.isOpen);

  const handleClose = () => {
    // dispatch(toggleSnackbar({ isOpen: false, message: "" }));
  }
  return (
    <StyledPaper>
      <CreateExpenseDialog isOpen={isCreateDialogOpen} />
      {isEditDialogOpen && expenseToEdit && <EditExpenseDialog isOpen={isEditDialogOpen} initialExpense={expenseToEdit}/>}
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
