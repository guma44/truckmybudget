import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { closeAddGroupDialog } from '../../redux/features/groupsDialogSlice';
import { useCreateGroupMutation } from '../../redux/api/groupsApi';
import { InputAdornment } from '@material-ui/core';
import { IconButton } from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';


export default function AddGroupDialog() {
  const [name, setName] = React.useState("");
  const [color, setColor] = React.useState("");

  const [ createGroup ] = useCreateGroupMutation();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeAddGroupDialog());
    setName("");
    setColor(0);
  };

  const handleAddGroup = async () => {
    const data = {
      name: name,
      color: color
    };
    try {
      await createGroup(data).unwrap()
      toast.success("Group created");
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
          <TextField
            margin="dense"
            id="color"
            value={color}
            label="Color"
            type="text"
            fullWidth
            variant="outlined"
            required
            onChange={(event) => {
              setColor(event.target.value);
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">
                  <IconButton onClick={() => setColorPicker(true)}>
                    <PaletteIcon color="inherit"></PaletteIcon>
                  </IconButton>
              </InputAdornment>
            }}
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
