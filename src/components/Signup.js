import React from 'react'
import axios from "axios";
import  {useState} from "react";
import { useHistory } from 'react-router-dom';

export default function Signup() {

    const [inputUsername, setInputUsername] = useState("")
    const [inputEmail, setInputEmail] = useState("")
    const [inputPassword, setInputPassword] = useState("")
    const [bool, setBool] = useState(false)
    const [message, setMessage] = useState("تم تسجيل حسابك بنجاح سوف يتم نقلك لصفحة تسجيل الدخول , شكرا لك")

    const hestory = useHistory()
    const onclickSignup = async()=> {
       try {
        const response = await axios.post("http://project-booking-backend.herokuapp.com/signUp" , {
            name: inputUsername ,
            email: inputEmail ,
            password: inputPassword
        })
            setBool(true)
            setTimeout(()=> { 
                hestory.push("/login")
                setBool(false)
            } , 2500)
            
        
       } catch (error) {
           console.log(error);
       }
       

    
    }
    return (
        <div id='login'>
        {!bool ? <><input onChange={(e)=>{setInputUsername(e.target.value)}} type="text" placeholder='username' />  
        <input onChange={(e)=>{setInputEmail(e.target.value)}} type="text" placeholder='email' />
        <input onChange={(e)=>{setInputPassword(e.target.value)}} type="password" placeholder='password'/>
        <button onClick={()=> {onclickSignup()}}>signup</button></> : <div className='p-3' style={{fontSize: "20px"}} id='warning-booking-select'>{message}</div>}
        </div>
    )
}
