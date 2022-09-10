import { forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import ExpanseTable from '../../components/ExpenseTable';
import CreateExpenseDialog from '../../components/CreateExpenseDialog';
import EditExpenseDialog from '../../components/EditExpenseDialog';
import MuiAlert from '@mui/material/Alert';
import Accounts from '../../components/Accounts';
import AddAccountDialog from '../../components/AddAccountDialog';
import AddGroupDialog from '../../components/AddGroupDialog';
import AddTagDialog from '../../components/AddTagDialog';

const StyledPaper = styled(Paper)`
  width: 90%;
  margin: 4rem auto;
  padding: 2rem;
  background-color: #white;

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
  const isCreateDialogOpen = useSelector((state) => state.expenseDialog.isOpen);
  const { isOpen: isEditDialogOpen, expense: expenseToEdit } = useSelector((state) => state.editExpenseDialog);
  const isAddAccountDialogOpen = useSelector((state) => state.accountDialog.isOpen);
  const isAddGroupDialogOpen = useSelector((state) => state.groupDialog.isOpen);
  const isAddTagDialogOpen = useSelector((state) => state.tagDialog.isOpen);

  return (
    <StyledPaper elevation={0}>
      <CreateExpenseDialog isOpen={isCreateDialogOpen} />
      {isEditDialogOpen && expenseToEdit && <EditExpenseDialog isOpen={isEditDialogOpen} initialExpense={expenseToEdit}/>}
      {isAddAccountDialogOpen && <AddAccountDialog />}
      {isAddGroupDialogOpen && <AddGroupDialog />}
      {isAddTagDialogOpen && <AddTagDialog />}
      <Accounts></Accounts>
      <ExpanseTable></ExpanseTable>
    </StyledPaper>
  );
};

export default HomeView;
