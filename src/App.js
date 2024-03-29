import axios from 'axios'
import { useState } from 'react';
import './App.css';
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import * as XLSX from 'xlsx' 

function App() {

  const [msg,setmsg]=useState("")
  const [status,setstatus] =useState(false)
  const [emaillist,setemaillist]=useState([])

  const handlemsg=(event)=>{
    setmsg(event.target.value)
  }

  const handlefile=(event)=>{
    const file=event.target.files[0]

    const reader=new FileReader()

    reader.onload=(event)=>{
        
        const data=event.target.result
        const workbook=XLSX.read(data,{type:"binary"})
        const sheetname=workbook.SheetNames[0]
        const worksheet=workbook.Sheets[sheetname]
        const emaillist=XLSX.utils.sheet_to_json(worksheet,{header:'A'})
        const totalemail=emaillist.map((item)=>{
          return (item.A)
        })
        setemaillist(totalemail)
        console.log(totalemail)
        console.log(emaillist.length)
    }

    reader.readAsBinaryString(file)
  }

  const send=()=>{
    setstatus(true)
    axios.post("https://bulk-mail-backend-5o7r.onrender.com/sendemail",{msg:msg,emaillist:emaillist})
    .then((data)=>{
      if(data.data===true){
        alert("Email Sent Sucessfully")
        setstatus(false)
      }
      else{
        alert("Failed")
      }
    })
  }
  return (
    <div className=' h-[100vh] overflow-hidden'>
          <div className=" bg-blue-900 text-white text-center">
            <h1 className="text-2xl font-bold px-5 py-3">Bulk Mail</h1>
          </div>
          <div className=" bg-blue-800 text-white text-center">
            <h1 className="text-2xl font-bold px-5 py-3">We can help your business with sending multiple emails at once</h1>
          </div>
          <div className=" bg-blue-600 text-white text-center">
            <h1 className="text-2xl font-bold px-5 py-3">Drag and Drop</h1>
          </div>
          <div className=" bg-blue-400 flex flex-col items-center text-black px-5 py-3">
            <textarea value={msg} onChange={handlemsg} className=" w-[80%] h-32 py-2 px-2 outline-none border border-black rounded-md" placeholder="Enter the Email text"></textarea>
            <div>
            <input type="file" onChange={handlefile} className=" border-4 border-dashed py-4 px-4 mt-10 mb-10"/>
          </div>
          <p>Total Emails in the file: {emaillist.length} </p>
          <button onClick={send} className=" bg-blue-950 text-white px-2 py-2 rounded-lg w-fit">{status? ("Sending..."):("Send")}</button>
          </div>


          <div className=" bg-blue-800 text-white flex justify-evenly pb-14 pt-14">
          <div>
           <p>Created by:</p>
           <p> Joseph sam Immanuel</p>
           <p>Email: josesamimmanuel@gmail.com</p>
           <p>Contact me: +91 638 175 4592</p>
           </div>
           <div>
           <p>Designed with React, Node, Express</p>
            <p>Database used: MongoDB</p>
            <div className=" text-white text-center flex justify-center gap-6 pt-3">
           <a href="https://www.instagram.com/josesamimmanuel/">
           <FaInstagramSquare className=' text-xl'/></a>
          <a href="https://www.linkedin.com/in/josephsamimmanuel/"> <FaLinkedin className=' text-xl'/></a>
          <a href="https://www.facebook.com/joseph.immanuel.12/"> <FaFacebook className=' text-xl'/></a>
          <a href="https://github.com/josephsamimmanuel"> <FaGithub className=' text-xl'/></a>
         <a href="https://josephsamimmanuel.netlify.app/"> <ImProfile className=' text-xl'></ImProfile></a>
          </div>
           </div>
          </div>

    </div>
  );
}

export default App;
