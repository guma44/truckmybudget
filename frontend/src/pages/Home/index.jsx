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
import AddIcon from '@mui/icons-material/Add';
import ExpenseTable from '../../components/ExpenseTable';
import { openExpenseDialog } from '../../redux/features/expenseDialogSlice';
import { openAddGroupDialog } from '../../redux/features/groupsDialogSlice';
import { openAddTagDialog } from '../../redux/features/tagsDialogSlice';

import { isMobile } from 'react-device-detect';
import { Fab } from '@mui/material';

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

  const openAddExpenseDialogHandler = () => {
    dispatch(openExpenseDialog());
  }
  const openAddGroupDialogHandler = () => {
    dispatch(openAddGroupDialog());
  }
  const openAddTagDialogHandler = () => {
    dispatch(openAddTagDialog());
  }

  return (
    <StyledPaper elevation={0}>
      <CreateExpenseDialog isOpen={isCreateDialogOpen} />
      {isEditDialogOpen && expenseToEdit && <EditExpenseDialog isOpen={isEditDialogOpen} initialExpense={expenseToEdit} />}
      {isAddAccountDialogOpen && <AddAccountDialog />}
      {isAddGroupDialogOpen && <AddGroupDialog />}
      {isAddTagDialogOpen && <AddTagDialog />}
      <Accounts></Accounts>
      {isMobile ? <ExpensesGrid></ExpensesGrid> : <ExpenseTable></ExpenseTable>}
      {isMobile && <Fab
        sx={
          {
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed',
          }
        }
        onClick={openAddExpenseDialogHandler}
        color="primary"><AddIcon></AddIcon></Fab>}
      {isMobile && <Fab
        sx={
          {
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 80,
            left: 'auto',
            position: 'fixed',
          }
        }
        onClick={openAddGroupDialogHandler}
        color="secondary">G</Fab>}
      {isMobile && <Fab
        sx={
          {
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 140,
            left: 'auto',
            position: 'fixed',
          }
        }
        onClick={openAddTagDialogHandler}
        color="secondary">T</Fab>}
    </StyledPaper>
  );
};

export default HomeView;
