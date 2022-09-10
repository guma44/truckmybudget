import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useCreateAccountMutation } from '../../redux/api/accountsApi';
import { useLoginUserMutation } from '../../redux/api/authApi';
import { InputAdornment, Paper } from '@material-ui/core';
import { Autocomplete, Box, Stack, Typography } from '@mui/material';



const StyledPaper = styled(Paper)`
  width: 50%;
  margin: 4rem auto;
  padding: 2rem;
  background-color: #white;

  @media (min-width: 768px) {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`;



export default function LoginDialog() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { isLoading, isError, error, isSuccess }] = useLoginUserMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state ? location.state.from.pathname : '/';
  useEffect(() => {
    if (isSuccess) {
      toast.success('Login OK');
      navigate(from);
    }
    if (isError) {
      toast.error("Something went wrong");
      }
  }, [isLoading]);

  const handleClose = () => {
    console.log("closing");
    setName("");
    setPassword("");
  };

  const handleLogin = () => {
    let data = new FormData();
    data.append("username", name);
    data.append("password", password);
    loginUser(data);
  }

  return (
    <div>
      <Box width="50%" margin="auto" mt={10}>
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
          <Button onClick={handleLogin} variant="contained">Login</Button>
        </Stack>

        </Box>
    </div>
  );
}