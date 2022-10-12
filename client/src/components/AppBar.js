import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import {Link} from "react-router-dom"
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

export default function ButtonAppBar() {
  const navigate=useNavigate();
  function logout(){
    Cookies.remove("token");
    navigate("/login");
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" className='text-white'>Expense Tracker</Link>
          </Typography>
          <Button color="inherit" onClick={logout}>logout</Button>
          <Link to="/login" className='text-white' >
            <Button color="inherit">Login</Button>
          </Link>
          <Link to="/register" className='text-white' >
            <Button color="inherit">Register</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
