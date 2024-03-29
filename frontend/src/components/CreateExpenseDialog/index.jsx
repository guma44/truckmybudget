import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import moment from 'moment';

import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { closeExpenseDialog } from '../../redux/features/expenseDialogSlice';
import { openAddGroupDialog } from '../../redux/features/groupsDialogSlice';
import { openAddTagDialog } from '../../redux/features/tagsDialogSlice';
import { useGetTagsQuery } from '../../redux/api/tagsApi';
import { useGetGroupsQuery } from '../../redux/api/groupsApi';
import { useGetAccountsQuery } from '../../redux/api/accountsApi';
import { useCreateExpenseMutation } from '../../redux/api/expensesApi';
import { useCreateInvoiceMutation } from '../../redux/api/invoicesApi';
import { Chip, InputAdornment } from '@material-ui/core';
import { Autocomplete, Box, IconButton, Stack, Typography } from '@mui/material';



export default function FormDialog(props) {
  const {
    date: initialDate,
    name: initialName,
    price: initialPrice,
    account: initialAccount,
    group: initialGroup,
    tags: initialTags,
    description: initialDescription,
    invoice: initialInvoice,
    invoice_url: initialInvoiceUrl,
    include_in_total: initialIncludeInTotal,
    forecast: initialForecast,
    isOpen
  } = props
  const [date, setDate] = React.useState(initialDate || null);
  const [name, setName] = React.useState(initialName || "");
  const [price, setPrice] = React.useState(initialPrice || "");
  const [account, setAccount] = React.useState(initialAccount || "");
  const [group, setGroup] = React.useState(initialGroup || "");
  const [tags, setTags] = React.useState(initialTags || []);
  const [invoiceUrl, setInvoiceUrl] = React.useState(initialInvoiceUrl || null);
  const [description, setDescription] = React.useState(initialDescription || "");
  const [invoice, setInvoice] = React.useState(initialInvoice || null);
  const [include_in_total, setIncludeInTotal] = React.useState(initialIncludeInTotal || true);
  const [forecast, setForecast] = React.useState(initialForecast || false);
  const {data: preexistingTags, isTagsLoading} = useGetTagsQuery();
  const {data: preexistingGroups, isGroupsLoading} = useGetGroupsQuery();
  const {data: preexistingAccounts, isAccountsLoading} = useGetAccountsQuery();
  const [ createExpense ] = useCreateExpenseMutation();
  const [ createInvoice ] = useCreateInvoiceMutation();
  const dispatch = useDispatch();

  const openAddGroupDialogHandler = () => {
    dispatch(openAddGroupDialog());
  }

  const openAddTagDialogHandler = () => {
    dispatch(openAddTagDialog());
  }

  const onTagsChange = (event, values) => {
    setTags(values);
  };

  const onGroupChange = (event, value) => {
    setGroup(value);
  }

  const onAccountChange = (event, value) => {
    setAccount(value);
  }

  const onInvoiceChange = (event) => {
    setInvoice(event.target.files[0]);
  }

  const handleClose = () => {
    dispatch(closeExpenseDialog());
    setDate(null);
    setName("");
    setPrice("");
    setGroup("");
    setTags([]);
    setDescription("");
    setInvoice(null);
    setInvoiceUrl(null);
    setIncludeInTotal(true);
    setForecast(false);
  };

  const handleAddExpense = () => {
    if (invoice) {
      let bodyFormData = new FormData();
      bodyFormData.append("file", invoice);
      createInvoice(bodyFormData).unwrap()
      .then(function (response) {
          const data = {
            name: name,
            price: price,
            date: date,
            description: description,
            tags: tags ? tags.map((item) => item._id) : null,
            group: group ? group._id : null,
            account: account._id,
            invoice: response._id,
            invoice_url: invoiceUrl,
            include_in_total: include_in_total,
            forecast: forecast
          };
          return createExpense(data).unwrap();
        })
        .then((response) => {
          toast.success("Expense created");
          handleClose();
        })
        .catch(function (error) {
          toast.error(error.data.detail);
        });
    }
    else {
      const data = {
        name: name,
        price: price,
        date: date,
        description: description,
        tags: tags ? tags.map((item) => item._id) : null,
        group: group ? group._id : null,
        account: account._id,
        invoice_url: invoiceUrl,
        include_in_total: include_in_total,
        forecast: forecast
      };
      createExpense(data).unwrap()
        .then((response) => {
          toast.success("Expense created");
          handleClose();
        })
        .catch((error) => {
          console.log(error.data.detail[0]);
          toast.error(JSON.stringify(error.data.detail));
        })
    }

    
  }

  const getTagDisplay = (option, index, getTagProps) => {
    let tag = {}
    if (option._id === undefined) {
      tag = {
        name: option,
        color: "blue",
        _id: option
      }
    } else {
      tag = {...option}
    }
    return (<Chip
    key={tag._id}
    label={tag.name}
    size="small"
    color="primary"
    style={{backgroundColor: tag.color}} {...getTagProps({ index })} />)
  }

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Add Expense</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add an expense to your budget.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={name}
            label="Name"
            type="text"
            fullWidth
            required
            variant="outlined"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="price"
            value={price}
            label="Price"
            type="number"
            fullWidth
            variant="outlined"
            required
            InputProps={{
              endAdornment: <InputAdornment position="end">PLN</InputAdornment>
            }}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
          <Autocomplete
            options={preexistingAccounts || []}
            getOptionLabel={option => option.name || option}
            onChange={onAccountChange}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            renderInput={params => (
              <TextField
                {...params}
                required
                variant="standard"
                label="Account"
                placeholder="Select account"
                margin="dense"
                fullWidth
              />
            )}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={date}
              inputFormat="YYYY-MM-DD"
              onChange={(event) => {
                try {
                  const d = moment(event.toISOString()).utcOffset(5, false).format("YYYY-MM-DD")
                  setDate(d);
                } catch (e) {
                  console.log(e);
                }
                
              }}
              renderInput={(params) => <TextField margin="dense" required {...params} />}
            />
          </LocalizationProvider>
          <Autocomplete
            options={preexistingGroups || []}
            getOptionLabel={option => option.name || option}
            onChange={onGroupChange}
            renderInput={params => (
              <Stack direction="row">
              <TextField
                {...params}
                variant="standard"
                label="Group"
                placeholder="Add group"
                margin="dense"
                fullWidth
              />
              <IconButton sx={{marginTop: 2.5}}>
                <AddCircleOutlineIcon onClick={() => openAddGroupDialogHandler()}/>
              </IconButton>
              </Stack>
            )}
          />
          <Autocomplete
            multiple
            options={preexistingTags || []}
            getOptionLabel={option => option.name || option}
            onChange={onTagsChange}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => getTagDisplay(option, index, getTagProps))
            }
            renderInput={params => (
              <Stack direction="row">
              <TextField
                {...params}
                variant="standard"
                label="Tags"
                placeholder="Add tags"
                margin="dense"
                fullWidth
              />
              <IconButton sx={{marginTop: 2.5}}>
                <AddCircleOutlineIcon onClick={() => openAddTagDialogHandler()}/>
              </IconButton>
              </Stack>
            )}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            value={description}
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="invoiceUrl"
            label="Invoice URL"
            value={invoiceUrl}
            type="url"
            fullWidth
            variant="outlined"
            onChange={(event) => {
              setInvoiceUrl(event.target.value);
            }}
          />
          <Stack>
          <Stack direction="row" mt={1}>
          <Button variant="contained" component="label">
            Upload Invoice
            <input hidden accept="image/*" multiple type="file" onChange={onInvoiceChange}/>
          </Button>
          <Chip label={invoice ? invoice.name : "No file selected"} style={{margin: 5}}/>
          </Stack>
        </Stack>
        <Box mt={1}>
          <FormControlLabel control={<Checkbox onChange={(event) => {setIncludeInTotal(event.target.checked)}} checked={include_in_total}/>} label="Include in total" />
          <FormControlLabel control={<Checkbox onChange={(event) => {setForecast(event.target.checked)}} checked={forecast}/>} label="Forecast" />
        </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">Cancel</Button>
          <Button onClick={handleAddExpense} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
