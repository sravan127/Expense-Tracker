import * as React from 'react';
import dayjs from 'dayjs';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import IconButton from '@mui/material/IconButton';


export default function TransactionList({transactions, fetchTransaction, setEditTransaction}) {

    async function remove(id){
        if(!window.confirm("Are you sure?"))return;
        const res=await fetch(`${process.env.REACT_APP_API_URL}/transaction/${id}`,{
            method:"DELETE"
        });
        if(res.ok){
            window.alert("Deleted Successfully");
            fetchTransaction();
        }
    }

    function formatDate(date){
        return dayjs(date).format("DD MMM, YYYY");
    }
  return (
    <>
    <Typography sx={{ marginTop: 10 }} variant="h6">
        List of Transactions
      </Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='center'>Amount</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((trx) => (
            <TableRow
              key={trx._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">{trx.amount}</TableCell>
              <TableCell align="center">{trx.description}</TableCell>
              <TableCell align="center">{formatDate(trx.date)}</TableCell>
              <TableCell align="center">
                    <IconButton color="primary" component="label" onClick={()=>setEditTransaction(trx)}>
                        <EditSharpIcon />
                    </IconButton>
                    <IconButton color="warning" component="label" onClick={()=>remove(trx._id)}>
                        <DeleteSharpIcon/>
                    </IconButton>
                    
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
