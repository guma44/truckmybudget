import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useDispatch } from 'react-redux';
import { closeAddAccountDialog } from '../../redux/features/accountsDialogSlice';
import { useCreateAccountMutation } from '../../redux/api/accountsApi';
import { InputAdornment } from '@material-ui/core';
import { Autocomplete, Box, Stack, Typography } from '@mui/material';


export default function AddAccountDialog() {
  const [name, setName] = React.useState("");
  const [amount, setAmount] = React.useState(0);

  const [ createAccount ] = useCreateAccountMutation();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeAddAccountDialog());
    setName("");
    setAmount(0);
  };

  const handleAddAccount = () => {
    const data = {
      name: name,
      amount: amount
    };
    createAccount(data);

    setName("");
    setAmount("");
    dispatch(closeAddAccountDialog());
    
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add an expense to your budget.
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
            id="amount"
            value={amount}
            label="Amount"
            type="number"
            fullWidth
            variant="outlined"
            required
            InputProps={{
              endAdornment: <InputAdornment position="end">PLN</InputAdornment>
            }}
            onChange={(event) => {
              setAmount(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">Cancel</Button>
          <Button onClick={handleAddAccount} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
