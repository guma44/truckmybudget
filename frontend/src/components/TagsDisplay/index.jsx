import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Chip, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Stack } from '@mui/system';
import { useConfirm } from 'material-ui-confirm';

import { useGetTagsQuery, useDeleteTagMutation } from '../../redux/api/tagsApi';
import { openAddTagDialog } from '../../redux/features/tagsDialogSlice';
import { toast } from 'react-toastify';
import { openEditTagDialog } from '../../redux/features/editTagDialogSlice';




export default function Tags() {
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const [ deleteTag ] = useDeleteTagMutation();
  const { data: tags, isLoading } = useGetTagsQuery();
  if (isLoading) {
    return "Loading tags..."
  }

  const handleCreateTag = () => {
    dispatch(openAddTagDialog());
  }

  const handleDeleteTag = (tag) => {
    confirm({
      title: `Delete "${tag.name}" tag?`,
      description: "",
      confirmationButtonProps: {variant: "contained"},
      cancellationButtonProps: {variant: "contained"},
    })
      .then(() => {
        return deleteTag(tag._id).unwrap()
      })
      .then((response) => {
        toast.success(`Tag "${tag.name}" deleted`);
      })
      .catch((error) => {
        toast.error(error.data.detail);
      })
  }

  return (
    <Box>
    <Typography variant="h6" mb={2}>Tags</Typography>
    <Stack direction="row" spacing={1}>
      {tags.map((tag) => {
        return <Chip
          key={tag._id}
          label={tag.name}
          size="small"
          color="primary"
          onClick={() => dispatch(openEditTagDialog(tag))}
          onDelete={() => handleDeleteTag(tag)}
          style={{ backgroundColor: tag.color }}
        />
      })}
      <Chip
        key="add-tag-chip"
        label={<AddIcon></AddIcon>}
        size="small"
        color="primary"
        onClick={handleCreateTag}
      />
    </Stack>
    </Box>
  );
}