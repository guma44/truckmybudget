import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';
import { ColorPicker } from 'mui-color';
import { useDispatch } from 'react-redux';
import { closeAddTagDialog } from '../../redux/features/tagsDialogSlice';
import { useCreateTagMutation } from '../../redux/api/tagsApi';


export default function AddTagDialog() {
  const [name, setName] = React.useState("");
  const [color, setColor] = React.useState("black");
  const open = true;

  const [ createTag ] = useCreateTagMutation();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeAddTagDialog());
    setName("");
    setColor("");
  };

  const handleSetColor = (color) => {
    console.log(color);
    setColor("#" + color);
  }

  const handleAddTag = async () => {
    const data = {
      name: name,
      color: color
    };
    try {
        await createTag(data).unwrap()
        toast.success(`Tag "${name}" created`);
      } catch (error) {
        console.log(error);
        toast.error(error.data.detail);
      }
      setName("");
      setColor("");
      dispatch(closeAddTagDialog());
  }

  return (
    <div>
      
      <Dialog open={open} onClose={handleClose}>
      
        <DialogTitle>Add Tag</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a tag to use your budget.
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
          <Button onClick={handleAddTag} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
