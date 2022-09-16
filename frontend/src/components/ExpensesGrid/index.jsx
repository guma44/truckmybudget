import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Fragment } from "react";
import { Button, Toolbar, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { isMobile } from 'react-device-detect';

import { formatMoney } from "../../utils/functions";
import { useGetExpensesQuery } from "../../redux/api/expensesApi";
import ExpenseCard from '../ExpenseCard';



const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "20px",
    paddingRight: "20px"
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

  if (isLoading) {
    return "Loading grid..."
  }

  return (
    <Fragment>

      <Grid
        spacing={4}
        className={classes.gridContainer}
        justify="center"
      >
        <Grid item>
          <Toolbar>
            <Stack
              direction={isMobile ? "column" : "row"}
              spacing={1}
              sx={{ flex: '1 1 100%' }}
            >
              {isMobile && <Box sx={{ border: "1px solid #1976d2", borderRadius: 1, display: "flex", justifyContent: "space-around" }}><Typography variant='h5'>{formatMoney(calculateTotalPrice(rows))}</Typography></Box>}
            </Stack>
            {!isMobile && <Typography variant='h5'>{formatMoney(calculateTotalPrice(rows))}</Typography>}
          </Toolbar>
        </Grid>
        {rows.map((row) => {
          return (
            <Grid key={row._id} item xs={12} sm={6} md={4}>
              <ExpenseCard row={row} />
            </Grid>
          )
        })}
      </Grid>
    </Fragment>
  );
}
