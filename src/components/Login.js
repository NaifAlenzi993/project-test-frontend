import React from 'react'
import axios from "axios";
import  { useState} from "react";
import { useHistory } from 'react-router-dom';
import { FaExclamationCircle } from 'react-icons/fa';

export default function Login({setToken , token , setName,setUserId}) {

    const [email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const hestory = useHistory()

    const [stateLogin, setStateLogin] = useState("")

    const [ShowWartinig, setShowWartinig] = useState(false)

    const [loginIsOkey, setLoginIsOkey] = useState("")



    const onClickLogin = async ()=> {
        try {
            const response =  await axios.post("http://project-booking-backend.herokuapp.com/login" , {
                email : email , 
                password : Password
            })
            setToken(response.data.token)
            setUserId(response.data.userId)
            // setName(email)
            localStorage.setItem("token",JSON.stringify(response.data.token))
            localStorage.setItem("userId",JSON.stringify(response.data.userId))
            console.log(response.data.token);
            
            setStateLogin("login Done !")
            setLoginIsOkey("تم تسجيل دخولك وسوف يتم تحويلك الى صفحة الفنادق")
            setTimeout(()=> {
                setLoginIsOkey("")
                hestory.push("/hotels")
            },2500)
        } catch (error) {
            if (error.response.status === 404) {
                console.log(error.response);
                setStateLogin("خطا في اسم المستخدم او كلمة المرور")
                setShowWartinig(true)
                setTimeout(()=>{
                    setStateLogin("")
                    setShowWartinig(false)
                } , 1500)

            }else if(error.response.status === 403){
                console.log(error.response);
                setStateLogin("خطا في اسم المستخدم او كلمة المرور")
                setShowWartinig(true)
                setTimeout(()=>{
                    setStateLogin("")
                    setShowWartinig(false)
                } , 1500)
               
            }
        }
       

     
        
    }

    return (
    <div id='form'>
        {
            loginIsOkey === "" ? <>
            <div id='login'>
            
            <input onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder='email' />
            <input onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder='password' />
            <button onClick={()=> {onClickLogin()}}>Login</button>
            </div>

            {ShowWartinig ? <div style={{display : "flex", justifyContent : "center" }} className="warning">
                <FaExclamationCircle style={{fontSize : "27px"}}/>
                     <p style={{ textAlign : "center" }}>{stateLogin}</p>
            </div> : ""}
            </> : 
            <div className='p-5' style={{fontSize: "20px"}} id='warning-booking-select'>
                {loginIsOkey}
            </div>}
        
    </div>
    )
}
