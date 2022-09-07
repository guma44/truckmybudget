import * as React from 'react';

import Stack from '@mui/material/Stack';
import { useGetAccountsQuery } from '../../redux/api/accountsApi';
import { Button, Card, CardContent, Typography } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { openAddAccountDialog } from '../../redux/features/accountsDialogSlice';
import { useDispatch } from 'react-redux';

function formatMoney(number) {
  return number.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' });
}

const AccountCard = ({ item }) => {
  return (
  <Card sx={{ minWidth: 200 }} variant="outlined">
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {item.name}
      </Typography>
      <Typography variant="h5" component="div">
        {formatMoney(item.amount)}
      </Typography>
    </CardContent>
  </Card>);
}

export default function Accounts() {
  const dispatch = useDispatch();
  const { data: accounts, isGroupsLoading } = useGetAccountsQuery();
  return (
    <Stack mb={5} direction="row">
      {accounts && accounts.map((item) => {
        return (<AccountCard key={ item._id } item={item}/>)
      })}
      <Button variant="outlined" onClick={() => dispatch(openAddAccountDialog())}><AddBoxIcon /></Button>
    </Stack>
  );
}