import * as React from 'react';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Chip, Link } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import RedoIcon from '@mui/icons-material/Redo';

import { toast } from 'react-toastify';
import { useConfirm } from 'material-ui-confirm';

import { useDeleteExpenseMutation } from '../../redux/api/expensesApi'
import { useDownloadInvoiceQuery } from '../../redux/api/invoicesApi';
import { openEditExpenseDialog } from '../../redux/features/editExpenseDialogSlice';
import { DownloadFile } from '../DownloadFile';
import { formatMoney } from '../../utils/functions';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ExpenseCard({ row }) {
  const [expanded, setExpanded] = React.useState(false);
  const [deleteExpense] = useDeleteExpenseMutation();
  const dispatch = useDispatch();
  const confirm = useConfirm();

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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card variant="outlined" sx={{ maxWidth: 345 }}>
         <Chip
            label={row.group ? row.group.name : "Other"}
            size="small"
            color="primary"
            style={{ backgroundColor: row.group ? row.group.color : "black", padding: 1, margin: 10 }}
          />
        <CardHeader
        sx={{paddingBottom: "0px"}}
        action={
          <Box>
            <IconButton aria-label="edit" onClick={(event) => handleEditExpense(event, row)}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={(event) => handleDeleteExpense(event, row)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        }
        titleTypographyProps={{overflowWrap: "break-word", maxWidth: "190px"}}
        title={`${row.name}`}
        subheader={`${row.date}`}
      />
      <CardContent sx={{paddingBottom: "0"}}>
        <Typography pb="15px" variant="h6" color="text.secondary">
          {formatMoney(row.price)} | {row.account.name}
        </Typography>
        <Typography sx={{paddingBottom: "20px"}} variant="body2" color="text.secondary">
          {row.description}
        </Typography>
        <Box mt={2}>
          {(
            row.tags ? row.tags.map((tag) => {
              return <Chip
                key={tag._id}
                label={tag.name}
                size="small"
                color="primary"
                style={{ backgroundColor: tag.color, marginRight: 2 }} />
            }) : "")
          }
        </Box>
      </CardContent>
      <CardActions disableSpacing pt="1px">
        {row.invoice_url ? <IconButton><Link target="_blank" href={row.invoice_url}><RedoIcon></RedoIcon></Link> </IconButton>: <IconButton disabled><RedoIcon/></IconButton>}
        {(row.invoice ? <DownloadFile path={`invoices/${row.invoice._id}/download`} filename={row.invoice.name} /> : <IconButton disabled><DownloadIcon/></IconButton>)}
      </CardActions>
    </Card>
  );
}
