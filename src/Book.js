
import axios from "axios";
import React , {useEffect , useState } from "react";


export default function Book({token,userId}) {

    const [bookd, setBookd] = useState([])
    

    useEffect(() => {
        const getData = async () => {
            // console.log(token);
            const respone = await axios.get("https://project-booking-backend.herokuapp.com/book" , {headers: { authorization: `Bearer ${token}` }})
            setBookd(respone.data); 
            //  console.log(respone.data);
            //  console.log(userId);
            //  console.log(token);
        }
        getData();
    }, [token])


  const deletbook= async (id)=>{
    const respone = await axios.delete("https://project-booking-backend.herokuapp.com/book/"+id , {headers: { authorization: `Bearer ${token}` }})
        setBookd(respone.data); 
        console.log(respone.data);
       
  }

    return (
        <div className="idBook">
            

{bookd.map((elem,i)=>{
    return <div  key = {i}>


    
    {/* <div className="idBook">
        <p> {elem.name} <b>:بداية الحجز</b></p>
        <p> {elem.startData} <b>:نهاية الحجز</b></p>
        <p> {elem.expiryData} </p> 
    </div> */}
    
    {/* {elem._id} */}

    {/* <h3>{message}</h3> */}


    {userId === elem.user._id ?  <div className="card p-2" style={{width: "15rem"}}>
    <img src={elem.hotel.img} className="card-img-top" alt="" />

    <div className="card-body">
    <h5 className="card-title">{elem.name}</h5>
    {/* <p className="card-text">{elem.hotel.description
}</p> */}
    <hr />
    <p> {elem.user.name} <b>:تم حجز الفندق بأسم </b></p>
    <p> {elem.startData} <b>:بداية الحجز</b></p>
    <p> {elem.expiryData} <b>:نهاية الحجز</b></p>
    <button onClick={()=>{deletbook(elem._id)}} id="btn" class="btn btn-danger">
        الغاء الحجز
    </button>
    </div>

</div> : ""}

   
    </div>
})}

             
        </div>
    )
}
