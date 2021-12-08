import React from 'react'
import { Link } from "react-router-dom";
import "../style.css"


export default function Navbar({token , setToken , setName , name , setUserId}) {

    const logout = ()=>{
        setToken("")
        setUserId("")
         localStorage.setItem("token" , JSON.stringify(""))
         localStorage.setItem("userId" , JSON.stringify(""))
        setName("")
    }

    const checkToken = ()=> {
        if (token) {
            return <>

            <ul>
                <Link id = "link-nav" to="/">الرئيسية</Link>
            </ul>
            <ul>
                <Link id = "link-nav" to="/hotels">الفنادق</Link>
            </ul>
            <ul>
                <Link id = "link-nav" to="/book">حجوزاتي</Link>
            </ul>
            <ul>
                <Link onClick={()=>{logout()}} id = "link-nav" to="/login"> logout</Link>
            </ul>
            
            </>
        }else{
            return <>
            <ul>
                <Link id = "link-nav" to="/Home">لرئيسية</Link>
            </ul>
            <ul>
                <Link id = "link-nav" to="/login">تسجيل دخول</Link>
            </ul>
            <ul>
                <Link id = "link-nav" to="/signup">تسجيل</Link>
            </ul>
            </>
        }
    }
    return (
        <div id='navbar'>
            <div className="navbaritems">
            {checkToken()}
            </div>
        </div>
    )
}
