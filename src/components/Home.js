import React from 'react'
import { useHistory } from 'react-router-dom';

import Collapse from './Collapse';



export default function Home() {
    const hestory = useHistory()
    const login=()=>{
        hestory.push("/login")
    }
    return (
        <div>
           
             <Collapse></Collapse>
            <div className="home">
               <p> اهلا بك  , نقوم بمساعدتك لايجاد سكنك الخاص في وقت بسيط </p>
            </div>
        </div>
    )
}
