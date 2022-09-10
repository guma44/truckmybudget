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
import { closeAddTagDialog } from '../../redux/features/tagsDialogSlice';
import { useCreateTagMutation } from '../../redux/api/tagsApi';
import { InputAdornment } from '@material-ui/core';
import { IconButton } from '@mui/material';


export default function AddTagDialog() {
  const [name, setName] = React.useState("");
  const [color, setColor] = React.useState("");
  const [ colorPicker, setColorPicker ] = React.useState(false);

  const [ createTag ] = useCreateTagMutation();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeAddTagDialog());
    setName("");
    setColor(0);
  };

  const handleAddTag = async () => {
    const data = {
      name: name,
      color: color
    };
    try {
        await createTag(data).unwrap()
        toast.success("Tag created");
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
          <Button onClick={handleAddTag} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
