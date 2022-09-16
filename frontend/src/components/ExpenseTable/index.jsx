import * as React from 'react';
import { useDispatch } from 'react-redux';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import RedoIcon from '@mui/icons-material/Redo';
import { visuallyHidden } from '@mui/utils';
import { toast } from 'react-toastify';
import { useConfirm } from 'material-ui-confirm';

import { useGetExpensesQuery, useDeleteExpenseMutation } from '../../redux/api/expensesApi'
import { useDownloadInvoiceQuery } from '../../redux/api/invoicesApi';
import { openEditExpenseDialog } from '../../redux/features/editExpenseDialogSlice';
import { openExpenseDialog } from '../../redux/features/expenseDialogSlice';
import { openAddGroupDialog } from '../../redux/features/groupsDialogSlice';
import { openAddTagDialog } from '../../redux/features/tagsDialogSlice';
import { DownloadFile } from '../DownloadFile';
import { formatMoney } from '../../utils/functions';
import { Button, Chip, Link } from '@mui/material';
import { Stack } from '@mui/system';


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

// This method is created for cross-browser compatibility, if you don't
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

const calculateTotalPrice = (rows) => {
  const total = rows.reduce((partialSum, row) => partialSum + row.price, 0);
  return total
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
    id: "account",
    numeric: false,
    disablePadding: false,
    label: "Account"
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
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "Actions"
  }
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
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
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = (props) => {
  const { numSelected, totalPrice } = props;
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
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 }
      }}
    >
    <Stack
      direction="row"
      spacing={1}
      sx={{ flex: '1 1 100%' }}
    >
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
    <Typography variant='h5'>{formatMoney(totalPrice)}</Typography>
    </Toolbar>
  );
};


export default function EnhancedTable() {
  const confirm = useConfirm();
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('date');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const dense = true
  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  const {
    data: rows,
    isLoading
  } = useGetExpensesQuery();
  // const {data: file} = useDownloadInvoiceQuery();
  const [ deleteExpense ] = useDeleteExpenseMutation();
  const dispatch = useDispatch();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleEditExpense = (event, expense) => {
    dispatch(openEditExpenseDialog(expense));
  }

  const handleDeleteExpense = (event, expense) => {
    confirm({
      title: "Delete expense",
      description: "Are you sure?",
      confirmationButtonProps: {variant: "contained"},
      cancellationButtonProps: {variant: "contained"},
    })
      .then(() => {
        return deleteExpense(expense._id).unwrap()
      })
      .then((response) => {
        toast.success("Expense deleted");
      })
      .catch((error) => {
        toast.error(error.data.detail);
      })
  }


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  if (isLoading) {
    return "Loading..."
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} totalPrice={calculateTotalPrice(rows)}/>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell> */}
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        style={{color:row.group ? row.group.color : "black", fontWeight: 700}}
                      >
                        {row.group ? row.group.name : "Other"}
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.price}</TableCell>
                      <TableCell align="left">{row.date}</TableCell>
                      <TableCell align="left">{row.account.name}</TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="left">{(
                        row.tags ? row.tags.map((tag) => {
                          return <Chip
                            key={tag._id}
                            label={tag.name}
                            size="small"
                            color="primary"
                            sx={{margin: 0.2}}
                            style={{backgroundColor: tag.color}} />
                        }) : "")
                      }</TableCell>
                      <TableCell align="left">
                        {row.invoice_url ? <Link target="_blank" href={row.invoice_url}><RedoIcon></RedoIcon></Link> : ""}
                        {(row.invoice ? <DownloadFile path={`invoices/${row.invoice._id}/download`} filename={row.invoice.name}/> : "")}
                      </TableCell>

                      <TableCell>
                        <IconButton onClick={(event) => handleEditExpense(event, row)}><EditIcon/></IconButton>
                        <IconButton onClick={(event) => handleDeleteExpense(event, row)}><DeleteIcon/></IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 30, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
