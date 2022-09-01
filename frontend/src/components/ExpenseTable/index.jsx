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

const rows = [
  {
    "_id": "6310a2c9f6c781cefd90e54b",
    "name": "Projekt - rata pierwsza",
    "price": 4000,
    "date": "2022-05-05",
    "invoice": null,
    "description": null,
    "tags": [
      {
        "_id": "6310a0e9d6817dc22b7541fd",
        "name": "Projekt",
        "color": "#6d37c4"
      }
    ],
    "group": {
      "_id": "6310a010d6817dc22b7541f4",
      "name": "Projekt domu",
      "color": "#6d37c4"
    }
  },
  {
    "_id": "6310a311f6c781cefd90e54c",
    "name": "Projekt - rata druga",
    "price": 5000,
    "date": "2022-07-05",
    "invoice": "static/invoices/0ce0b25e188c48f2af71bde4355988b3.pdf",
    "description": null,
    "tags": [
      {
        "_id": "6310a0e9d6817dc22b7541fd",
        "name": "Projekt",
        "color": "#6d37c4"
      }
    ],
    "group": {
      "_id": "6310a010d6817dc22b7541f4",
      "name": "Projekt domu",
      "color": "#6d37c4"
    }
  },
  {
    "_id": "6310a393f6c781cefd90e54d",
    "name": "ToiToi - wrzesień",
    "price": 400,
    "date": "2022-09-01",
    "invoice": null,
    "description": null,
    "tags": [
      {
        "_id": "6310a0bbd6817dc22b7541fa",
        "name": "Przygotowanie",
        "color": "#c76414"
      }
    ],
    "group": {
      "_id": "6310a01dd6817dc22b7541f6",
      "name": "ToiToi",
      "color": "#11a692"
    }
  },
  {
    "_id": "6310a3a0f6c781cefd90e54e",
    "name": "ToiToi - październik",
    "price": 400,
    "date": "2022-10-01",
    "invoice": null,
    "description": null,
    "tags": [
      {
        "_id": "6310a0bbd6817dc22b7541fa",
        "name": "Przygotowanie",
        "color": "#c76414"
      }
    ],
    "group": {
      "_id": "6310a01dd6817dc22b7541f6",
      "name": "ToiToi",
      "color": "#11a692"
    }
  },
  {
    "_id": "6310a3aaf6c781cefd90e54f",
    "name": "ToiToi - listopad",
    "price": 400,
    "date": "2022-11-01",
    "invoice": null,
    "description": null,
    "tags": [
      {
        "_id": "6310a0bbd6817dc22b7541fa",
        "name": "Przygotowanie",
        "color": "#c76414"
      }
    ],
    "group": {
      "_id": "6310a01dd6817dc22b7541f6",
      "name": "ToiToi",
      "color": "#11a692"
    }
  },
  {
    "_id": "6310a3b4f6c781cefd90e550",
    "name": "ToiToi - grudzień",
    "price": 400,
    "date": "2022-11-01",
    "invoice": null,
    "description": null,
    "tags": [
      {
        "_id": "6310a0bbd6817dc22b7541fa",
        "name": "Przygotowanie",
        "color": "#c76414"
      }
    ],
    "group": {
      "_id": "6310a01dd6817dc22b7541f6",
      "name": "ToiToi",
      "color": "#11a692"
    }
  },
  {
    "_id": "6310a487f6c781cefd90e551",
    "name": "Ekipa - etap 1",
    "price": 40000,
    "date": "2022-10-02",
    "invoice": null,
    "description": "Po skończeniu piwnicy",
    "tags": [
      {
        "_id": "6310a0add6817dc22b7541f8",
        "name": "SSO",
        "color": "#0211b3"
      }
    ],
    "group": null
  }
];

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

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 }
      }}
    >
      <Tooltip title="Add Expense">
        <Button color="primary" variant="contained">
          <AddIcon />
        </Button>
      </Tooltip>
    </Toolbar>
  );
};

export default function ExpenseTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    console.log("Row " + name + "clicked");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
              rowCount={rows.length}
            />
            <TableBody>
              {rows.slice().sort(getComparator(order, orderBy))
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

                      <TableCell><EditIcon></EditIcon></TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
