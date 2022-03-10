import React, { useEffect,useState } from "react";
import EmpoyeeList from "./EmpoyeeList";
import "../App.css";
import EmployeeForm from "./EmployeeForm";
import $ from "jquery";

const Body = () => {
  let headers = new Headers({
    "Accept"       : "*/*",
    "User-Agent"   : "Thunder Client (https://www.thunderclient.com)",
    "Content-Type" : "application/json"
        });
  const [emplist, setemplist] = useState([])
  useEffect(async() => {
    const list = await fetch('http://localhost:3333/employee').then(Response=> Response.json()).then(data=>setemplist(data)).catch((error)=>console.log(error));
  } , [setemplist])
  

        
      
  document.addEventListener("DOMContentLoaded",function(){
    var btn = document.getElementById("myBtn");
              var modal = document.getElementById("myModal");
              var span = document.getElementsByClassName("close1")[0];
              btn.onclick = function () {
                modal.style.display = "block";
              };
              span.onclick = function () {
                modal.style.display = "none";
              };
              window.onclick = function (event) {
                if (event.target == modal) {
                  modal.style.display = "none";
                }
              };
  });
  
  return (
    <>
      <div className="container px-28">
        <p className="text-center font-bold text-4xl">Employees List</p>
        <button className="bg-sky-500 text-white p-2 rounded-md" id="myBtn">
          Add Employee
        </button>
        <EmpoyeeList emplist={emplist} setemplist={setemplist} />
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close1">&times;</span>
            <div className="flex justify-center">
              <EmployeeForm emplist={emplist} setemplist={setemplist}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Body;

// function Body() {

//       let myName = 'test';
//       console.log("Form----",myName);
//       // alert("Hello world")
//         var btn = document.getElementById("myBtn");
//     var modal = document.getElementById("myModal");
//     var span = document.getElementsByClassName("close")[0];
//     btn.onclick = function() {
//         modal.style.display = "block";
//       }
//     span.onclick = function() {
//         modal.style.display = "none";
//       }
//       window.onclick = function(event) {
//         if (event.target == modal) {
//           modal.style.display = "none";
//         }
//       }

//   return (
//    <>
//    <div className='container px-28'>
//         <p className='text-center font-bold text-4xl'>Employees List</p>
//         <button className='bg-sky-500 text-white p-2 rounded-md' id="myBtn">Add Employee</button>
//         <EmpoyeeList/>
//         <div id="myModal" className="modal">
//             <div className="modal-content">
//                 <span className="close">&times;</span>
//                 <div className='flex justify-center'>
//                     <EmployeeForm/>
//                 </div>
//             </div>
//         </div>
//       </div></>
//   )
// }

// export default Body
