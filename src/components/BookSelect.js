import React from 'react'
import {useParams } from 'react-router-dom';
import  {useEffect , useState} from "react";
import axios from "axios";

export default function BookSelect({token,userId}) {
    const { id }= useParams()

    const [bookSelect, setBookSelect] = useState({})
    const [inputstart   , setInputstart] = useState("")
    const [expir  , setExpir] = useState("")
    const [bool, setBool] = useState(false)
    useEffect(() => {

        axios.get(`https://project-booking-backend.herokuapp.com/bookselect/${id}` , 
        {headers: { authorization: `Bearer ${token}` }}
        )
        .then(res => {
        const data = res.data;
        // console.log(data);
        setBookSelect(data[0]);
        }).catch(err => console.log(err))

    }, [token])

    const addBook=async(idHotel)=>{
    const respons =await axios.post("https://project-booking-backend.herokuapp.com/book", 
    {
       name: bookSelect.name ,
       startData: inputstart,
       expiryData: expir ,
       user: userId,
       hotel: idHotel,
    }
    ,
    {headers: { authorization: `Bearer ${token}` }} )

    setBool(true)
    setTimeout(()=> { 
        setBool(false)
    } , 2000)
    // console.log(respons.data);
    }

    return (
      <div className="container">
        <div class="card">
          <div class="card-header">
            <h4>{bookSelect.name}</h4>
          </div>
          <div class="card-body">
            <p class="card-text">{bookSelect.description}</p>

            <div id='card-booking'>

            <div>
            <img src={bookSelect.img} alt="" />
            <h1>{bookSelect.price} S.R</h1>
            </div>
            
            <div id='booking-ob'>
            <label htmlFor="start">بداية الحجز</label>
            <input dir="rtl" name='start' onChange={(e)=>{setInputstart(e.target.value)}} type="date" placeholder="بداية الحجز" />
            <label htmlFor="exp">نهاية الحجز</label>
            <input dir="rtl" name='exp' onChange={(e)=>{setExpir(e.target.value)}} type="date" placeholder='نهاية الحجز'/>
            <button onClick={()=>{addBook(bookSelect._id)}} href="#" class="btn btn-primary">
              احجز الان
            </button>
            </div>

            </div>


           {bool && <p id='warning-booking-select'>تم أضافة الحجز بنجاح</p>}
            
          </div>
        </div>


    


      </div>
    );
}
