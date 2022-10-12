import React, {useState, useEffect} from 'react';
import TransactionList from "../components/TransactionList"
import TransactionForm from "../components/TransactionForm";
import { Container } from '@mui/material';
import Cookies from "js-cookie";

function Home() {
    const [transactions,setTransactions]=useState([]);
  const [editTransaction, setEditTransaction]=useState({});

  useEffect(()=>{
    fetchTransaction();
  },[])

  async function fetchTransaction(){
    const token=Cookies.get("token");
    const res=await fetch(`${process.env.REACT_APP_API_URL}/transaction`,{
      headers:{
        Authorization : `Bearer ${token}`
      }
    })
    const {data}=await res.json();
    setTransactions(data);
  }

  return (
    <>
    <Container>
          <TransactionForm  
              fetchTransaction={fetchTransaction}
              editTransaction={editTransaction}
          />
          <TransactionList 
              transactions={transactions} 
              fetchTransaction={fetchTransaction} 
              setEditTransaction={setEditTransaction} />
      </Container>
    </>
  )
}

export default Home