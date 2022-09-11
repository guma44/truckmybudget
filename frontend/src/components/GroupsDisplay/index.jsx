import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Chip, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Stack } from '@mui/system';
import { useConfirm } from 'material-ui-confirm';
import { toast } from 'react-toastify';

import { useGetGroupsQuery, useDeleteGroupMutation } from '../../redux/api/groupsApi';
import { openAddGroupDialog } from '../../redux/features/groupsDialogSlice';
import { openEditGroupDialog } from '../../redux/features/editGroupDialogSlice';




export default function Groups() {
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const [ deleteGroup ] = useDeleteGroupMutation();
  const { data: groups, isLoading } = useGetGroupsQuery();
  if (isLoading) {
    return "Loading groups..."
  }

  const handleCreateGroup = () => {
    dispatch(openAddGroupDialog());
  }

  const handleDeleteGroup = (group) => {
    confirm({
      title: `Delete "${group.name}" group?`,
      description: "",
      confirmationButtonProps: {variant: "contained"},
      cancellationButtonProps: {variant: "contained"},
    })
      .then(() => {
        return deleteGroup(group._id).unwrap()
      })
      .then((response) => {
        toast.success(`Group "${group.name}" deleted`);
      })
      .catch((error) => {
        toast.error(error.data.detail);
      })
  }

  return (
    <Box>
    <Typography variant="h6" mb={2}>Groups</Typography>
    <Stack direction="row" spacing={1}>
      {groups.map((group) => {
        return <Chip
          key={group._id}
          label={group.name}
          size="small"
          color="primary"
          onClick={() => dispatch(openEditGroupDialog(group))}
          onDelete={() => handleDeleteGroup(group)}
          style={{ backgroundColor: group.color }}
        />
      })}
      <Chip
        key="add-group-chip"
        label={<AddIcon></AddIcon>}
        size="small"
        color="primary"
        onClick={handleCreateGroup}
      />
    </Stack>
    </Box>
  );
}