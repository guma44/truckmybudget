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
  const total = rows.reduce((partialSum, row) => partialSum + row.price, 0);
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
    header: "Description"
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
    header: "Invoice",
    Cell: ({ row }) => {
      return (
        <Box>
          {row.original.invoice_url ? <Link target="_blank" href={row.original.invoice_url}><LaunchIcon ></LaunchIcon></Link> : ""}
          {(row.original.invoice ? <DownloadFile path={`invoices/${row.original.invoice._id}/download`} filename={row.original.invoice.name} /> : "")}
        </Box>
      )
    },
  },
];

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
        <EnhancedTableToolbar numSelected={0} totalPrice={calculateTotalPrice(rows)} />
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
          initialState={{ density: 'compact' }}
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
