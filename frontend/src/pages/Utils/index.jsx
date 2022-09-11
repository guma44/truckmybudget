import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';

import AddAccountDialog from '../../components/AddAccountDialog';
import AddGroupDialog from '../../components/AddGroupDialog';
import AddTagDialog from '../../components/AddTagDialog';
import { Box } from '@mui/system';

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

const UtilsView = () => {
  const isAddAccountDialogOpen = useSelector((state) => state.accountDialog.isOpen);
  const isAddGroupDialogOpen = useSelector((state) => state.groupDialog.isOpen);
  const isAddTagDialogOpen = useSelector((state) => state.tagDialog.isOpen);

  return (
    <StyledPaper elevation={0}>
      {isAddAccountDialogOpen && <AddAccountDialog />}
      {isAddGroupDialogOpen && <AddGroupDialog />}
      {isAddTagDialogOpen && <AddTagDialog />}
      <Box >
        Utils
      </Box>
    </StyledPaper>
  );
};

export default UtilsView;
