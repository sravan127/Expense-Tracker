import {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Button from '@mui/material/Button';

const initialForm={
    amount:0,
    description:"",
    date: new Date()
}

export default function TransactionForm({fetchTransaction, editTransaction}) {
    const [form, setForm]=useState(initialForm)

    useEffect(()=>{
        if(editTransaction.amount!==undefined)
          setForm(editTransaction)
    },[editTransaction])

    function handleChange(e){
        setForm({...form, [e.target.name]:e.target.value})
    }

    function handleDateChange(newval){
        setForm({...form, date:newval})
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();  
        const res= editTransaction.amount===undefined ? create(): update();
      }

    async function create(){
      const res= await fetch(`${process.env.REACT_APP_API_URL}/transaction`,{
          method:"POST",
          body:JSON.stringify(form),
          headers:{
            'content-type':"application/json"
          }
        })
        if(res.ok){
          setForm(initialForm)
          fetchTransaction()
        }
    }

    async function update(){
      const res= await fetch(`${process.env.REACT_APP_API_URL}/transaction/${editTransaction._id}`,{
          method:"PATCH",
          body:JSON.stringify(form),
          headers:{
            'content-type':"application/json"
          }
        })
        if(res.ok){
          setForm(initialForm)
          fetchTransaction()
        }
    }
  return (
    <Card sx={{ minWidth: 275 , marginTop: 10}}>
      <CardContent>
      <Typography variant="h6">Add New Expense</Typography>
        <form onSubmit={handleSubmit}>
        <TextField 
            size="small" 
            sx={{marginRight:5}} 
            id="outlined-basic" 
            name="amount" 
            variant="outlined"
            value={form.amount}
            onChange={handleChange} 
        />
        <TextField 
            size="small" 
            sx={{marginRight:5}} 
            id="outlined-basic" 
            name="description" 
            variant="outlined" 
            value={form.description}
            onChange={handleChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
                name="date"
                inputFormat="MM/DD/YYYY"
                value={form.date} 
                onChange={handleDateChange}
                renderInput={(params) => 
                    <TextField 
                        size="small" 
                        sx={{marginRight:5}}
                        {...params} 
                    />}
            />
        </LocalizationProvider>
        {editTransaction.amount!==undefined && (
          <Button type="submit" variant="contained">Update</Button>
        )}
        {editTransaction.amount===undefined && (
          <Button type="submit" variant="contained">Submit</Button>
        )}
        </form>
      </CardContent>
    </Card>
  );
}
