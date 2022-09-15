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
import { closeEditTagDialog } from '../../redux/features/editTagDialogSlice';
import { useUpdateTagMutation } from '../../redux/api/tagsApi';
import { InputAdornment } from '@material-ui/core';
import { Box, IconButton } from '@mui/material';
import { ColorPicker } from 'mui-color';


export default function UpdateTagDialog(props) {
  const { initialTag, isOpen } = props
  const tagId = initialTag._id;
  const [name, setName] = React.useState(initialTag.name);
  const [color, setColor] = React.useState(initialTag.color);
  const [ colorPicker, setColorPicker ] = React.useState(false);

  const [ updateTag ] = useUpdateTagMutation();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeEditTagDialog());
    setName("");
    setColor("");
  };

  const handleSetColor = (color) => {
    console.log(color);
    setColor("#" + color);
  }

  const handleUpdateTag = async () => {
    const data = {
      name: name,
      color: color
    };
    try {
        await updateTag({id: tagId, tag: data}).unwrap()
        toast.success(`Tag "${name}" updated`);
      } catch (error) {
        console.log(error);
        toast.error(error.data.detail);
      }
      setName("");
      setColor("");
      dispatch(closeEditTagDialog());
  }

  return (
    <div>
      
      <Dialog open={isOpen} onClose={handleClose}>
      
        <DialogTitle>Update Tag</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update a tag to use your budget.
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
          <Button onClick={handleUpdateTag} variant="contained">Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
