import { render } from '@testing-library/react';
import React, {Component, useEffect, useState} from 'react'

const EmpoyeeList=({emplist ,setemplist })=>{

  const getuser =async()=>{
    const list = await fetch('http://localhost:3333/employee').then(Response=> Response.json()).then(data=>setemplist(data)).catch((error)=>console.log(error));
   
  }

  const [user, setuser] = useState({});

  let headers = new Headers({
    "Accept"       : "*/*",
    "User-Agent"   : "Thunder Client (https://www.thunderclient.com)",
    "Content-Type" : "application/json"
        });
        function view_emp(id){
                      var modal = document.getElementById("myModal1");
                      var span = document.getElementsByClassName("close")[1];
                        modal.style.display = "block";
                        let emp = emplist.filter((e)=> e.id==id);
                        document.getElementById('emp_details').innerHTML = `<tr>
                        <td class="font-bold">First Name</td>
                        <td>${emp[0].fname}</td>
                      </tr>
                      <tr>
                        <td class="font-bold">Last Name</td>
                        <td>${emp[0].lname}</td>
                      </tr>
                      <tr>
                        <td class="font-bold">Email</td>
                        <td>${emp[0].email}</td>
                      </tr>
                      <tr>
                        <td class="font-bold">Age</td>
                        <td>${emp[0].age}</td>
                      </tr>
                      <tr>
                        <td class="font-bold">Birthdate</td>
                        <td>${emp[0].bdate}</td>
                      </tr>
                      <tr>
                        <td class="font-bold">Gender</td>
                        <td>${emp[0].gender}</td>
                      </tr>
                      <tr>
                        <td class="font-bold">Number</td>
                        <td>${emp[0].number}</td>
                      </tr>`
                      span.onclick = function () {
                        modal.style.display = "none";
                      };
                      window.onclick = function (event) {
                        if (event.target == modal) {
                          modal.style.display = "none";
                        }
                      };
        }
       
        function delet_emp(id){
          fetch(`http://localhost:3333/employee/${id}` , {method:"DELETE"}).then(Response=>Response.json).then(()=>getuser()).catch((error)=>console.log(error));
          }
          function update(id){
            var modal = document.getElementById("myModal2");
                      var span = document.getElementsByClassName("close3")[0];
                        modal.style.display = "block";
                       
                        let emp = emplist.filter((e)=> e.id==id);
                        setuser({ id : emp[0].id});
                        document.getElementById('emp_detail').innerHTML = `
                        <p class="font-bold">First Name</p>
                        <input class='border border-slate-400' type='text' name='fname' id='fname' value="${emp[0].fname}" }></input>
                        <p class="font-bold">Last Name</p>
                        <input class='border border-slate-400' type='text' name='lname' id='lname' value="${emp[0].lname}" ></input>
                        <p class="font-bold">Email</p>
                       <input class='border border-slate-400' type='email' name='email' id='email' value="${emp[0].email}" ></input>
                        <p class="font-bold">Age</p>
                        <input class='border-b border-slate-400' type='number' name='age' id='age' value="${emp[0].age}" ></input>
                     
                      
                        <p class="font-bold">Birthdate</p>
                      <input class='border-b border-slate-400' type='date' name='bdate' id='bdate' value="${emp[0].bdate}" ></input>

                        <p class="font-bold">Gender</p>
                        <input class='border-b border-slate-400' type='text' name='gender' id='gender' value="${emp[0].gender}" ></input>
                        <p class="font-bold">Number</p>
                        <td><input class='border-b border-slate-400' type='number' name='number' id='lname' value="${emp[0].number}" ></input>
                      `
                      span.onclick = function () {
                        modal.style.display = "none";
                      };
                      window.onclick = function (event) {
                        if (event.target == modal) {
                          modal.style.display = "none";
                        }
                      };
                      
                    }
          async function update_emp_real(e){
                      let usere = {}
                      let element = document.getElementById('emp_detail');
                      for(let i=0;i<element.length;i++){
                          // setuser({...user,[element[i].name]: element[i].value })
                          usere = {...usere, [element[i].name] : element[i].value}
                      }
                      let new_emp = {...user , ...usere}
                      
                      const update = await fetch(`http://localhost:3333/employee/${new_emp.id}`, {
                          method : "PUT",
                          headers : headers,
                          body : JSON.stringify(new_emp)
                        }).then(Response=> Response.json).then(()=>getuser()).catch((error)=>console.log(error));
                      
                    
           }
          
 
    return(
      <>
    <table className='w-full mt-5 border table-auto border-collapse border-b-gray-400'>
          <thead className='w-full'>
            <tr>
            <th className='w-3/12 py-3 text-left border border-slate-400'>Emloyee First Name</th>
            <th className='w-3/12 py-3 text-left border border-slate-400'>Emloyee Last Name</th>
            <th className='w-2/12 py-3 text-left border border-slate-400'>Emloyee Email id</th>
            <th className='w-4/12 py-3 text-left border border-slate-400'>Actions</th>
            </tr>
          </thead>
          <tbody> 
            {emplist.map((element)=>{
             return(
              <tr key={element.id} className='font-semibold'>
              <td className='border-x border-slate-400'>{element.fname}</td>
              <td className='border-x border-slate-400'>{element.lname}</td>
              <td className='border-x border-slate-400'>{element.email}</td>
              <td className='border-x border-slate-400'>
              <button  name={element.id} className=' bg-cyan-500 text-white p-2 rounded-md ml-2' onClick={(event)=>update(event.target.name)}>Update</button>
              <button  name={element.id} className=' bg-red-600 text-white p-2 rounded-md ml-2' onClick={(event)=>delet_emp(event.target.name)}>Delete</button>
              <button  name={element.id} className=' bg-cyan-500 text-white p-2 rounded-md ml-2'onClick={(event)=>view_emp(event.target.name)}>View</button>
              </td>
            </tr>)
            })}
          </tbody>
        </table>
        <div id="myModal1" className="modal">
          <div className="modal-content">
            <span className="clos2">&times;</span>
            <div className="flex justify-center">
              <table id='emp_details'  className="w-1/2 border table-auto border-collapse border-b-gray-400">
              </table>
            </div>
          </div>
        </div>
        <div id="myModal2" className="modal">
          <div className="modal-content">
            <span className="clos3">&times;</span>
            <div className="flex-col justify-center">
            <form id='emp_detail' className='flex-col'>
              </form>
              <button id='update_emp'  className='bg-sky-400 text-white p-1 rounded-sm mt-2' onClick={(e)=>update_emp_real(e)}>Update</button>
            </div>
          </div>
        </div>
        </>
    )
}

export default EmpoyeeList

