import { useDispatch } from "react-redux";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from '@mui/icons-material/Add';
import { Fragment } from "react";
import { Button, Toolbar, Tooltip, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { isMobile } from 'react-device-detect';

import { formatMoney } from "../../utils/functions";
import { useGetExpensesQuery } from "../../redux/api/expensesApi";
import ExpenseCard from '../ExpenseCard';
import { openExpenseDialog } from '../../redux/features/expenseDialogSlice';
import { openAddGroupDialog } from '../../redux/features/groupsDialogSlice';
import { openAddTagDialog } from '../../redux/features/tagsDialogSlice';


const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px"
  }
});

const calculateTotalPrice = (rows) => {
  const total = rows.reduce((partialSum, row) => partialSum + row.price, 0);
  return total
}


export default function ExpensesGrid() {
  const classes = useStyles();
  const {
    data: rows,
    isLoading
  } = useGetExpensesQuery();

  const dispatch = useDispatch();

  const openAddExpenseDialogHandler = () => {
    dispatch(openExpenseDialog());
  }
  const openAddGroupDialogHandler = () => {
    dispatch(openAddGroupDialog());
  }
  const openAddTagDialogHandler = () => {
    dispatch(openAddTagDialog());
  }

  if (isLoading) {
    return "Loading grid..."
  }

  return (
    <Fragment>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 }
        }}
      >
      <Stack
        direction={isMobile ? "column" : "row"}
        spacing={1}
        sx={{ flex: '1 1 100%' }}
      >
      {isMobile && <Box sx={{border: "1px solid #1976d2", borderRadius: 1, display: "flex", justifyContent: "space-around"}}><Typography variant='h5'>{formatMoney(calculateTotalPrice(rows))}</Typography></Box>}
      <Tooltip title="Add Expense">
        <Button color="primary" variant="contained" onClick={openAddExpenseDialogHandler}>
          <AddIcon /> Add Expense
        </Button>
      </Tooltip>
      <Tooltip title="Add Group">
        <Button color="secondary" variant="contained" onClick={openAddGroupDialogHandler}>
          <AddIcon /> Add Group
        </Button>
      </Tooltip>
      <Tooltip title="Add Tag">
        <Button color="secondary" variant="contained" onClick={openAddTagDialogHandler}>
          <AddIcon /> Add Tag
        </Button>
      </Tooltip>
      </Stack>
      {!isMobile && <Typography variant='h5'>{formatMoney(calculateTotalPrice(rows))}</Typography>}
      </Toolbar>
      <Grid
        container
        spacing={4}
        className={classes.gridContainer}
        justify="center"
      >
        {rows.map((row) => {
          return (
            <Grid key={row._id} item xs={12} sm={6} md={4}>
              <ExpenseCard row={row}/>
            </Grid>
          )
        })}
      </Grid>
    </Fragment>
  );
}
