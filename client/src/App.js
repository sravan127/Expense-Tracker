import React, {useState} from "react";

function App() {
  const [form, setForm]=useState({
    amount:0,
    description:"",
    date:null
  })

  const handleSubmit=async (e)=>{
    e.preventDefault();  
    const res= await fetch("http://localhost:4000/transaction",{
      method:"POST",
      body:form
    })
  }

  const handleInputChange=(e)=>{
     setForm({...form, [e.target.name]:e.target.value})
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="number" 
          name="amount"
          placeholder="enter the amount"
          value={form.amount}
          onChange={handleInputChange} 
        />
        <input 
          type="text" 
          name="description"
          placeholder="enter the description"
          value={form.description}
          onChange={handleInputChange}
          />
        <input 
          type="date"
          name="date"
          value={form.date}
          onChange={handleInputChange} 
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default App;
