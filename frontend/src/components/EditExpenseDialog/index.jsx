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
import { useGetTagsQuery } from '../../redux/api/tagsApi';
import { useGetGroupsQuery } from '../../redux/api/groupsApi';
import { useGetAccountsQuery, useSubtractFromAccountMutation, useAddToAccountMutation } from '../../redux/api/accountsApi';
import { useUpdateExpenseMutation } from '../../redux/api/expensesApi';
import { useCreateInvoiceMutation } from '../../redux/api/invoicesApi';
import { Chip, InputAdornment } from '@material-ui/core';
import { Autocomplete, Box, Stack, Typography } from '@mui/material';
import { closeEditExpenseDialog } from '../../redux/features/editExpenseDialogSlice';


export default function FormDialog(props) {
  const { initialExpense, isOpen } = props
  const expenseId = initialExpense._id;
  const [date, setDate] = React.useState(initialExpense.date);
  const [name, setName] = React.useState(initialExpense.name);
  const [price, setPrice] = React.useState(initialExpense.price);
  const [account, setAccount] = React.useState(initialExpense.account);
  const [group, setGroup] = React.useState(initialExpense.group);
  const [tags, setTags] = React.useState(initialExpense.tags);
  const [description, setDescription] = React.useState(initialExpense.description);
  const [invoice, setInvoice] = React.useState(initialExpense.invoice);
  const {data: preexistingTags, isTagsLoading} = useGetTagsQuery();
  const {data: preexistingGroups, isGroupsLoading} = useGetGroupsQuery();
  const {data: preexistingAccounts, isAccountsLoading} = useGetAccountsQuery();
  const [ updateExpense ] = useUpdateExpenseMutation();
  const [ createInvoice ] = useCreateInvoiceMutation();
  const [ subtractFromAccount ] = useSubtractFromAccountMutation();
  const [ addToAccount ] = useAddToAccountMutation();
  const dispatch = useDispatch();



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
    dispatch(closeEditExpenseDialog());
    setDate(null);
    setName("");
    setPrice("");
    setGroup("");
    setTags([]);
    setDescription("");
    setInvoice(null);
  };

  const handleUpdateExpense = () => {
    if (invoice) {
      if (invoice._id) {
        const data = {
          name: name,
          price: price,
          date: date,
          description: description,
          tags: tags ? tags.map((item) => item._id) : null,
          group: group ? group._id : null,
          account: account._id,
          invoice: invoice._id
        };
        updateExpense({id: expenseId, expense: data}).unwrap().then((response) => {
          if (price > initialExpense.price) {
            subtractFromAccount({id: account._id, amount: price - initialExpense.price});
          } else if (price < initialExpense.price) {
            addToAccount({id: account._id, amount: initialExpense.price - price});
          }
        }).catch((error) => {
          console.log(error);
        });
      }
      else {
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
              invoice: response._id
            };
            updateExpense({id: expenseId, expense: data}).unwrap().then((response) => {
              if (price > initialExpense.price) {
                subtractFromAccount({id: account._id, amount: price - initialExpense.price});
              } else if (price < initialExpense.price) {
                addToAccount({id: account._id, amount: initialExpense.price - price});
              }
            }).catch((error) => {
              console.log(error);
            });
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
        account: account._id
      };
      updateExpense({id: expenseId, expense: data}).unwrap().then((response) => {
        if (price > initialExpense.price) {
          subtractFromAccount({id: account._id, amount: price - initialExpense.price});
        } else if (price < initialExpense.price) {
          addToAccount({id: account._id, amount: initialExpense.price - price});
        }
      }).catch((error) => {
        console.log(error);
      });;
    }
    setDate(null);
    setName("");
    setPrice("");
    setGroup("");
    setTags([]);
    setDescription("");
    setInvoice(null);
    dispatch(closeEditExpenseDialog());
    
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
    return (
      <Chip
        key={tag._id}
        label={tag.name}
        size="small"
        color="primary"
        style={{backgroundColor: tag.color}} {...getTagProps({ index })}
      />
    )
  }

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Edit Expense</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit an expense to in your budget.
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
            defaultValue={account}
            disabled
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
                const d = event.toISOString().split('T')[0]
                setDate(d);
              }}
              renderInput={(params) => <TextField margin="dense" required {...params} />}
            />
          </LocalizationProvider>
          <Autocomplete
            options={preexistingGroups || []}
            getOptionLabel={option => option.name || option}
            onChange={onGroupChange}
            value={group}
            isOptionEqualToValue={(option, value) => option._id === value._id}
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
            value={tags}
            isOptionEqualToValue={(option, value) => option._id === value._id}
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
          <Button onClick={handleUpdateExpense} variant="contained">Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
