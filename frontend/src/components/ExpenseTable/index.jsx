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
import FunctionsIcon from '@mui/icons-material/Functions';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import LaunchIcon from '@mui/icons-material/Launch';
import { visuallyHidden } from '@mui/utils';
import { toast } from 'react-toastify';
import { useConfirm } from 'material-ui-confirm';
import MaterialReactTable from 'material-react-table';

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
import { object } from 'prop-types';


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
  const total = rows.reduce((partialSum, row) => (row.include_in_total && !row.forecast) ? partialSum + row.price : partialSum, 0);
  return total
}

const calculateTotalForecastPrice = (rows) => {
  const total = rows.reduce((partialSum, row) =>  (row.forecast && row.include_in_total) ? partialSum + row.price : partialSum, 0);
  return total
}

const columns = [
  {
    id: "group",
    accessorFn: (row) => row.group ? row.group.name : "Other",
    header: "Group",
    Cell: ({ cell, row }) => {
      let group = row.original.group;
      return (
        <Typography
          sx={{
            color: group ? group.color : "black",
            fontWeight: 700
          }}
        >
          {cell.getValue()}
        </Typography>
      )
    },
  },
  {
    accessorKey: 'name',
    enableGrouping: false,
    header: 'Name'
  },
  {
    accessorKey: "price",
    header: "Price",
    enableGrouping: false,
    aggregationFn: 'sum',
    Cell: ({ cell }) => formatMoney(cell.getValue()),
    AggregatedCell: ({ cell, table }) => (
      <>
        <Box
          sx={{ color: 'info.main', display: 'inline', fontWeight: 'bold' }}
        >
          {formatMoney(cell.getValue())}
        </Box>
      </>
    ),
  },
  {
    accessorKey: "date",
    enableGrouping: false,
    header: "Date"
  },
  {
    id: "account",
    accessorFn: (row) => row.account.name,
    header: "Account"
  },
  {
    accessorKey: "description",
    enableGrouping: false,
    header: "Description",
    Cell: ({cell}) => <Box sx={{width: "100px", overflowWrap: "break-word"}}>{cell.getValue()}</Box>
  },
  {
    id: "tags",
    enableGrouping: false,
    accessorFn: (row) => row.tags ? row.tags.map((i) => i.name).join() : "",
    header: "Tags",
    Cell: ({ row }) => {
      return (
        row.original.tags ? row.original.tags.map((tag) => {
          return <Chip
            key={tag._id}
            label={tag.name}
            size="small"
            color="primary"
            sx={{ margin: 0.2 }}
            style={{ backgroundColor: tag.color }} />
        }) : "")
    },
  },
  {
    id: "invoice",
    enableGrouping: false,
    accessorFn: (row) => row.invoice ? row.invoice.name : "",
    header: "Info",
    Cell: ({ row }) => {
      return (
        <Stack direction="row" spacing={1}>
          <Tooltip title={row.original.include_in_total ? "Included in total sum" : "Not included in total sum"}>
            <Box>
              <FunctionsIcon color={row.original.include_in_total ? "success" : "error"}></FunctionsIcon>
            </Box>
          </Tooltip>
          <Tooltip title={row.original.forecast ? "Forecast" : "Real value"}>
            <Box>
              <QueryStatsIcon color={!row.original.forecast ? "secondary" : "success"}></QueryStatsIcon>
            </Box>
          </Tooltip>
          <Tooltip title="Open invoice" placement='bottom'>
            <Box>
              {row.original.invoice_url ? <Link target="_blank" href={row.original.invoice_url}><LaunchIcon ></LaunchIcon></Link> : ""}
            </Box>
            </Tooltip>
            <Tooltip title="Download invoice">
            <Box>
            {(row.original.invoice ? <DownloadFile path={`invoices/${row.original.invoice._id}/download`} filename={row.original.invoice.name} /> : "")}
              </Box>
            </Tooltip>
        </Stack>
      )
    },
  },
];

const EnhancedTableToolbar = (props) => {
  const { numSelected, totalPrice, forecastPrice } = props;
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
      <Stack direction="row" spacing={2}>
        <Typography variant='h5'>{formatMoney(totalPrice)}</Typography>
        <Typography variant='h5'>|</Typography>
        <Typography variant='h5' color="secondary">{formatMoney(forecastPrice)}</Typography>
      </Stack>

    </Toolbar>
  );
};


export default function EnhancedTable() {
  const confirm = useConfirm();
  const {
    data: rows,
    isLoading
  } = useGetExpensesQuery();
  const [deleteExpense] = useDeleteExpenseMutation();
  const dispatch = useDispatch();

  const handleEditExpense = (event, expense) => {
    dispatch(openEditExpenseDialog(expense));
  }

  const handleDeleteExpense = (event, expense) => {
    confirm({
      title: "Delete expense",
      description: "Are you sure?",
      confirmationButtonProps: { variant: "contained" },
      cancellationButtonProps: { variant: "contained" },
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

  if (isLoading) {
    return "Loading..."
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={0} totalPrice={calculateTotalPrice(rows)} forecastPrice={calculateTotalForecastPrice(rows)}/>
        <MaterialReactTable
          columns={columns}
          data={rows}
          enableRowSelection={false}
          enableGlobalFilter={true} //turn off a feature
          enableRowActions
          enableGrouping
          positionActionsColumn="last"
          enableStickyHeader={true}
          enableFullScreenToggle={false}
          enableDensityToggle={false}
          defaultColumn={{
            minSize: 20, //allow columns to get smaller than default
            maxSize: 100, //allow columns to get larger than default
            size: 50, //make columns wider by default
          }}
          muiTablePaginationProps={{
            rowsPerPageOptions: [20, 50, 100, 500, 1000]
          }}
          initialState={{ density: 'compact', pagination: {pageSize: 20}}}
          renderRowActions={({ row }) => (
            <div>
              <IconButton onClick={(event) => handleEditExpense(event, row.original)}><EditIcon /></IconButton>
              <IconButton onClick={(event) => handleDeleteExpense(event, row.original)}><DeleteIcon /></IconButton>
            </div>
          )}
        />
      </Paper>
    </Box>
  );
}
