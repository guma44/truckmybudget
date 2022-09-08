import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useDispatch } from 'react-redux';
import { useCreateAccountMutation } from '../../redux/api/accountsApi';
import { InputAdornment, Paper } from '@material-ui/core';
import { Autocomplete, Box, Stack, Typography } from '@mui/material';



const StyledPaper = styled(Paper)`
  width: 50%;
  margin: 4rem auto;
  padding: 2rem;
  background-color: #f0f0f0;

  @media (min-width: 768px) {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`;


export default function LoginDialog() {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");


  const handleClose = () => {
    console.log("closing");
    setName("");
    setPassword("");
  };

  const handleLogin = () => {
    const data = {
      name: name,
      password: password
    };
    console.log(data);
  }

  return (
    <div>
      <StyledPaper elevation={0}>
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
            id="password"
            value={password}
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            required
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        <Stack direction="row" spacing={1}>
          {/* <Button onClick={handleClose} variant="contained">Cancel</Button> */}
          <Button onClick={handleLogin} variant="contained">Login</Button>
        </Stack>

        </StyledPaper>
    </div>
  );
}