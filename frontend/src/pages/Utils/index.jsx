import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';

import AddAccountDialog from '../../components/AddAccountDialog';
import AddGroupDialog from '../../components/AddGroupDialog';
import AddTagDialog from '../../components/AddTagDialog';
import { Box } from '@mui/system';
import { Stack } from '@mui/material';

import TagsView from '../../components/TagsDisplay';
import GroupsView from '../../components/GroupsDisplay';
import EditTagDialog from '../../components/EditTagDialog';
import EditGroupDialog from '../../components/EditGroupDialog';

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
  const { isOpen: isEditTagDialogOpen, tag: tagToEdit } = useSelector((state) => state.editTagDialog);
  const { isOpen: isEditGroupDialogOpen, group: groupToEdit } = useSelector((state) => state.editGroupDialog);

  return (
    <StyledPaper elevation={0}>
      {isAddAccountDialogOpen && <AddAccountDialog />}
      {isAddGroupDialogOpen && <AddGroupDialog />}
      {isAddTagDialogOpen && <AddTagDialog />}
      {isEditTagDialogOpen && tagToEdit && <EditTagDialog isOpen={isEditTagDialogOpen} initialTag={tagToEdit}/>}
      {isEditGroupDialogOpen && groupToEdit && <EditGroupDialog isOpen={isEditGroupDialogOpen} initialGroup={groupToEdit}/>}
      <Box >
        <Stack direction="column" spacing={3}>
          <GroupsView></GroupsView>
          <TagsView></TagsView>
        </Stack>
      </Box>
    </StyledPaper>
  );
};

export default UtilsView;
