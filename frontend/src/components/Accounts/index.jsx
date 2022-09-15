import * as React from 'react';
import { useDispatch } from 'react-redux';

import Stack from '@mui/material/Stack';
import { useGetAccountsQuery } from '../../redux/api/accountsApi';
import { Button, Card, CardContent, Typography } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { isMobile } from 'react-device-detect';

import { formatMoney } from '../../utils/functions';
import { openAddAccountDialog } from '../../redux/features/accountsDialogSlice';


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
    <Stack mb={5} direction={isMobile ? "column" : "row"}>
      {accounts && accounts.map((item) => {
        return (<AccountCard key={ item._id } item={item}/>)
      })}
      <Button variant="outlined" onClick={() => dispatch(openAddAccountDialog())}><AddBoxIcon /></Button>
    </Stack>
  );
}