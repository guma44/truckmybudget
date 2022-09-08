import { forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import ExpanseTable from '../../components/ExpenseTable';
import CreateExpenseDialog from '../../components/CreateExpenseDialog';
import EditExpenseDialog from '../../components/EditExpenseDialog';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Accounts from '../../components/Accounts';
import AddAccountDialog from '../../components/AddAccountDialog';
import { closeSnackbar } from '../../redux/features/snackbarSlice';

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

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const HomeView = () => {
  const dispatch = useDispatch();
  const { isOpen: isSnackbarOpen, message, severity } = useSelector((state) => state.snackbar);
  const isCreateDialogOpen = useSelector((state) => state.expenseDialog.isOpen);
  const { isOpen: isEditDialogOpen, expense: expenseToEdit } = useSelector((state) => state.editExpenseDialog);
  const isAddAccountDialogOpen = useSelector((state) => state.accountDialog.isOpen);

  const handleClose = () => {
    dispatch(closeSnackbar());
  }
  return (
    <StyledPaper>
      <CreateExpenseDialog isOpen={isCreateDialogOpen} />
      {isEditDialogOpen && expenseToEdit && <EditExpenseDialog isOpen={isEditDialogOpen} initialExpense={expenseToEdit}/>}
      {isAddAccountDialogOpen && <AddAccountDialog />}
      {isSnackbarOpen && (
        <Snackbar
          open={true}
          autoHideDuration={2000}
          onClose={handleClose}
          anchorOrigin={{vertical: "top", horizontal: "right"}}
          >
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
      <Accounts></Accounts>
      <ExpanseTable></ExpanseTable>
    </StyledPaper>
  );
};

export default HomeView;
