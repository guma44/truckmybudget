import * as React from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useSelector, useDispatch } from 'react-redux';
import { formDialogSelector } from '../../entities/app/selectors';
import { formDialogOpened } from '../../entities/app';
import { groupsSelector } from '../../entities/app/selectors';
import { tagsSelector } from '../../entities/app/selectors';
import { loadGroupData } from '../../entities/app';
import { loadTagData } from '../../entities/app';
import { Chip, InputAdornment } from '@material-ui/core';
import { Autocomplete } from '@mui/material';


export default function FormDialog() {
  const [value, setValue] = React.useState(null);
  const open = useSelector(formDialogSelector);
  const groups = useSelector(groupsSelector);
  const tags = useSelector(tagsSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadGroupData());
    dispatch(loadTagData());
  }, []);

  const onTagsChange = (event, values) => {
    console.log(values);
  };

  const handleClose = () => {
    dispatch(formDialogOpened(false));
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Expense</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add an expense to your budget.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            required
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="price"
            label="Price"
            type="number"
            fullWidth
            variant="outlined"
            required
            InputProps={{
              endAdornment: <InputAdornment position="end">PLN</InputAdornment>
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField margin="dense" required {...params} />}
            />
          </LocalizationProvider>
          <Autocomplete
            freeSolo
            options={groups || []}
            getOptionLabel={option => option.name || "test"}
            onChange={onTagsChange}
            renderInput={params => (
              <TextField
                {...params}
                variant="standard"
                label="Group"
                placeholder="Add group"
                margin="dense"
                fullWidth
              />
            )}
          />
          <Autocomplete
            multiple
            freeSolo
            options={tags || []}
            getOptionLabel={option => option.name || "test"}
            onChange={onTagsChange}
            renderInput={params => (
              <TextField
                {...params}
                variant="standard"
                label="Tags"
                placeholder="Add tags"
                margin="dense"
                fullWidth
              />
            )}
          />
          <TextField
            margin="dense"
            id="description"
            label="Descripion"
            type="text"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">Cancel</Button>
          <Button onClick={handleClose} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
