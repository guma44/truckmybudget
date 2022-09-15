import { forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import CreateExpenseDialog from '../../components/CreateExpenseDialog';
import EditExpenseDialog from '../../components/EditExpenseDialog';

import Accounts from '../../components/Accounts';
import AddAccountDialog from '../../components/AddAccountDialog';
import AddGroupDialog from '../../components/AddGroupDialog';
import AddTagDialog from '../../components/AddTagDialog';
import ExpensesGrid from '../../components/ExpensesGrid';
import ExpenseTable from '../../components/ExpenseTable';
import { isMobile } from 'react-device-detect';

const StyledPaper = styled(Paper)`
  width: ${isMobile ? "100%" : "90%"};
  margin: ${isMobile ? "0rem" : "4rem"} auto;
  padding: ${isMobile ? "0rem" : "2rem"};
  background-color: #white;

  @media (min-width: 768px) {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`;

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
      {isMobile ? <ExpensesGrid></ExpensesGrid> : <ExpenseTable></ExpenseTable>}
      
    </StyledPaper>
  );
};

export default HomeView;
