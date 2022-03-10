import React, { useState } from 'react'


function EmployeeForm({emplist,setemplist}) {

    const [fname , setfname] = useState('');
    const [lname , setlname] = useState('');
    const [email , setemail] = useState('');
    const [age , setage] = useState();
    const [ bdate, setbdate] = useState('');
    const [gender , setgender] = useState('male');
    const [number , setnumber] = useState('');

    const addform =async(e)=>{
      e.preventDefault();
      const newEmp = { id: Math.random().toString(36).slice(2),fname : fname , lname :lname, email :email ,age:age , bdate:bdate , gender : gender , number : number}
      console.log(JSON.stringify(newEmp))
      let headers = new Headers({
        "Accept"       : "*/*",
        "User-Agent"   : "Thunder Client (https://www.thunderclient.com)",
        "Content-Type" : "application/json"
            });
      const addEmp = await fetch('http://localhost:3333/employee', {
        method : 'POST',
        headers : headers,
        body : JSON.stringify(newEmp)
      }).then(response => response.status==201?alert("successfully added"):alert("some error occur")).catch(error=> console.log(error));
      setemplist(()=>{
        return [...emplist , newEmp]
      })
    }

  return (
    <form className='flex-col' onSubmit={(e)=>addform(e)}>
        <p className='text-center'>First Name</p>
        <input className='border-b border-slate-400' type='text' name='fname' id='fname' value={fname} onChange={(e)=>{setfname(e.target.value)}}></input>
        <p className='text-center'>Last Name</p>
        <input className='border-b border-slate-400' type='text' name='lname' id='lname' value={lname} onChange={(e)=>{setlname(e.target.value)}} ></input>
        <p className='text-center'>Email id</p>
        <input className='border-b border-slate-400' type='email' name='email' id='email' value={email} onChange={(e)=>{setemail(e.target.value)}}></input>
        <p className='text-center'>Age</p>
        <input className='border-b border-slate-400' type='number' name='age' id='age' value={age} onChange={(e)=>{setage(e.target.value)}}></input>
        <p className='text-center'>Date of Birth</p>
        <input className='border-b border-slate-400' type='date' name='bdate' id='bdate' value={bdate} onChange={(e)=>{setbdate(e.target.value)}}></input>
        <p className='text-center'>gender</p>
        <input className='border-b border-slate-400' type='radio' name='gender' id='gender' value={gender} onChange={(e)=>{e.target.checked?setgender('male'):setgender('female')}}></input>Male
        <input className='border-b border-slate-400' type='radio' name='gender' id='gender' value={gender} onChange={(e)=>{e.target.checked?setgender('female'):setgender('male')}}></input>Female
        <p className='text-center'>contact</p>
        <input className='border-b border-slate-400' type='number' name='number' id='number' value={number} onChange={(e)=>{setnumber(e.target.value)}}></input>
        <br></br>
        <button id='addform' className='bg-sky-400 text-white p-1 rounded-sm mt-2 w-full'>Add</button>
    </form>
  )
}

export default EmployeeForm