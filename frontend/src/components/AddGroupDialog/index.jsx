import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { closeAddGroupDialog } from '../../redux/features/groupsDialogSlice';
import { useCreateGroupMutation } from '../../redux/api/groupsApi';

import { ColorPicker } from 'mui-color';


export default function AddGroupDialog() {
  const [name, setName] = React.useState("");
  const [color, setColor] = React.useState("black");

  const [ createGroup ] = useCreateGroupMutation();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeAddGroupDialog());
    setName("");
    setColor("");
  };

  const handleSetColor = (color) => {
    console.log(color);
    setColor("#" + color);
  }

  const handleAddGroup = async () => {
    const data = {
      name: name,
      color: color
    };
    try {
      await createGroup(data).unwrap()
      toast.success(`Group "${name}" created`);
    } catch (error) {
      toast.error(error.data.detail);
    }
    setName("");
    setColor("");
    dispatch(closeAddGroupDialog());
  }

  return (
    <div>
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>Add Group</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a group to use your budget.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={name}
            label="Name"
            type="text"
            fullWidth
            required
            variant="outlined"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <ColorPicker
            value={color}
            deferred={false}
            onChange={(event) => handleSetColor(event.hex)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">Cancel</Button>
          <Button onClick={handleAddGroup} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
