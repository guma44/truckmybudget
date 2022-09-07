import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useDispatch } from 'react-redux';
import { closeExpenseDialog } from '../../redux/features/expenseDialogSlice';
import { useGetTagsQuery } from '../../redux/api/tagsApi';
import { useGetGroupsQuery } from '../../redux/api/groupsApi';
import { useCreateExpenseMutation } from '../../redux/api/expensesApi';
import { useCreateInvoiceMutation } from '../../redux/api/invoicesApi';
import { Chip, InputAdornment } from '@material-ui/core';
import { Autocomplete, Box, Stack, Typography } from '@mui/material';


export default function FormDialog(props) {
  const {
    date: initialDate,
    name: initialName,
    price: initialPrice,
    group: initialGroup,
    tags: initialTags,
    description: initialDescription,
    invoice: initialInvoice } = props
  const [date, setDate] = React.useState(initialDate || null);
  const [name, setName] = React.useState(initialName || "");
  const [price, setPrice] = React.useState(initialPrice || "");
  const [group, setGroup] = React.useState(initialGroup || "");
  const [tags, setTags] = React.useState(initialTags || []);
  const [description, setDescription] = React.useState(initialDescription || "");
  const [invoice, setInvoice] = React.useState(initialInvoice || null);
  const open = true;
  const {data: preexistingTags, isTagsLoading} = useGetTagsQuery();
  const {data: preexistingGroups, isGroupsLoading} = useGetGroupsQuery();
  const [ createExpense ] = useCreateExpenseMutation();
  const [ createInvoice ] = useCreateInvoiceMutation();
  const dispatch = useDispatch();

  const onTagsChange = (event, values) => {
    setTags(values);
  };

  const onGroupChange = (event, value) => {
    setGroup(value);
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
  };

  const handleAddExpense = () => {
    if (invoice) {
      if (invoice._id) {
        const data = {
          name: name,
          price: price,
          date: date,
          description: description,
          tags: tags ? tags.map((item) => item._id) : null,
          group: group ? group._id : null,
          invoice: invoice._id
        };
        createExpense(data);
      }
      else {
        let bodyFormData = new FormData();
        bodyFormData.append("file", invoice);
        createInvoice(bodyFormData).unwrap()
        .then(function (response) {
            console.log(response);
            const data = {
              name: name,
              price: price,
              date: date,
              description: description,
              tags: tags ? tags.map((item) => item._id) : null,
              group: group ? group._id : null,
              invoice: response._id
            };
            createExpense(data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
    else {
      const data = {
        name: name,
        price: price,
        date: date,
        description: description,
        tags: tags ? tags.map((item) => item._id) : null,
        group: group ? group._id : null,
      };
      createExpense(data);
    }
    setDate(null);
    setName("");
    setPrice("");
    setGroup("");
    setTags([]);
    setDescription("");
    setInvoice(null);
    dispatch(closeExpenseDialog());
    
  }

  const getTagDisplay = (option, index, getTagProps) => {
    let tag = {}
    if (option._id === undefined) {
      console.log(option);
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
      <Dialog open={open} onClose={handleClose}>
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={date}
              inputFormat="YYYY-MM-DD"
              onChange={(event) => {
                const d = event.toISOString().split('T')[0]
                console.log(d);
                setDate(d);
              }}
              renderInput={(params) => <TextField margin="dense" required {...params} />}
            />
          </LocalizationProvider>
          <Autocomplete
            options={preexistingGroups || []}
            getOptionLabel={option => option.name || option}
            onChange={onGroupChange}
            renderInput={params => (
              <TextField
                {...params}
                variant="standard"
                label="Group"
                placeholder="Add group"
                margin="dense"
                fullWidth
              />
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
              <TextField
                {...params}
                variant="standard"
                label="Tags"
                placeholder="Add tags"
                margin="dense"
                fullWidth
              />
            )}
          />
          <TextField
            margin="dense"
            id="description"
            label="Descripion"
            value={description}
            type="text"
            fullWidth
            variant="outlined"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
          <Stack>
          <Stack direction="row">
          <Button variant="contained" component="label">
            Upload Invoice
            <input hidden accept="image/*" multiple type="file" onChange={onInvoiceChange}/>
          </Button>
          <Chip label={invoice ? invoice.name : "No file selected"} style={{margin: 5}}/>
          </Stack>
        </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">Cancel</Button>
          <Button onClick={handleAddExpense} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
