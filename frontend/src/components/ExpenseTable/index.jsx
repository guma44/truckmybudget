import * as React from 'react';
import { PropTypes } from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { Button, Chip, IconButton, Tooltip } from '@material-ui/core';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'
import FormDialog from '../FormDialog';
import { expensesSelector } from '../../entities/app/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadExpenseData } from '../../entities/app';
import { formDialogOpened } from '../../entities/app';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-bexpenseser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "group",
    numeric: false,
    disablePadding: false,
    label: "Group"
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name'
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price [PLN]"
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Date"
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Description"
  },
  {
    id: "tags",
    numeric: false,
    disablePadding: false,
    label: "Tags"
  },
  {
    id: "invoice",
    numeric: false,
    disablePadding: false,
    label: "Invoice"
  }
];

function ExpenseTableHead(props) {
  const { order, orderBy, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
}

ExpenseTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const ExpenseTableToolbar = () => {

  const dispatch = useDispatch();

  const openDialogHandler = () => {
    dispatch(formDialogOpened(true));
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 }
      }}
    >
      <Tooltip title="Add Expense">
        <Button color="primary" variant="contained" onClick={openDialogHandler}>
          <AddIcon />
        </Button>
      </Tooltip>
    </Toolbar>
  );
};

export default function ExpenseTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const expenses = useSelector(expensesSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadExpenseData());
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    console.log("Row " + name + "clicked");
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <ExpenseTableToolbar />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <ExpenseTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={expenses.length}
            />
            <TableBody>
              {expenses.slice().sort(getComparator(order, orderBy))
                .map((row, index) => {

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      tabIndex={-1}
                      key={row._id}
                    >
                      <TableCell style={{color:row.group ? row.group.color : "black", fontWeight: 700}} align="left">
                        {row.group ? row.group.name : "Default"}
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.price}</TableCell>
                      <TableCell align="left">{row.date}</TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="left">{(
                        row.tags ? row.tags.map((tag) => {
                          return <Chip
                            key={tag._id}
                            label={tag.name}
                            size="small"
                            color="primary"
                            style={{backgroundColor: tag.color}} />
                        }) : "")
                      }</TableCell>
                      <TableCell align="left">{(
                        row.invoice ? <Button><DownloadIcon/></Button> : ""
                        )}
                      </TableCell>

                      <TableCell>
                        <IconButton><EditIcon/></IconButton>
                        <IconButton><DeleteIcon/></IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
