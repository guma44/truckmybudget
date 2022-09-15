import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';
// import { SketchPicker } from 'react-color';
import { useDispatch } from 'react-redux';
import PaletteIcon from '@mui/icons-material/Palette';
import { closeEditGroupDialog } from '../../redux/features/editGroupDialogSlice';
import { useUpdateGroupMutation } from '../../redux/api/groupsApi';
import { InputAdornment } from '@material-ui/core';
import { Box, IconButton } from '@mui/material';
import { ColorPicker } from 'mui-color';


export default function UpdateGroupDialog(props) {
  const { initialGroup, isOpen } = props
  const groupId = initialGroup._id;
  const [name, setName] = React.useState(initialGroup.name);
  const [color, setColor] = React.useState(initialGroup.color);

  const [ updateGroup ] = useUpdateGroupMutation();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeEditGroupDialog());
    setName("");
    setColor("");
  };

  const handleSetColor = (color) => {
    console.log(color);
    setColor("#" + color);
  }

  const handleUpdateGroup = async () => {
    const data = {
      name: name,
      color: color
    };
    try {
        await updateGroup({id: groupId, group: data}).unwrap()
        toast.success(`Group "${name}" updated`);
      } catch (error) {
        console.log(error);
        toast.error(error.data.detail);
      }
      setName("");
      setColor("");
      dispatch(closeEditGroupDialog());
  }

  return (
    <div>
      
      <Dialog open={isOpen} onClose={handleClose}>
      
        <DialogTitle>Update Group</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update a group to use your budget.
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
          <Button onClick={handleUpdateGroup} variant="contained">Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
