// import web3 from "./web3";
import axios from "axios";
import React , {useEffect , useState } from "react";
import "../style.css"
import { useHistory} from "react-router-dom";
import { FaStar } from 'react-icons/fa';




function Hotels({token ,userId , printLog}) {


  const history = useHistory()

  const [data, setData] = useState([])
  
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [img, setImg] = useState("")

  const [nameUp, setNameUp] = useState("")
  const [descriptionUp, setDescriptionUp] = useState("")
  const [imgUp, setImgUp] = useState("")

 const [RateArr, setRateArr] = useState([0,0,0,0,0])




  useEffect(() => {
    const getData = async () => {
        console.log(token);
        const respone = await axios.get("https://project-booking-backend.herokuapp.com/hotel" , {headers: { authorization: `Bearer ${token}` }})
        setData(respone.data); 
        // console.log(respone.data);
    }
    token && getData();

    
  }, [token])

  // web3.eth.getAccounts().then(console.log)


  // const AddCourse = async () => {
  //   const respone = await axios.post("http://localhost:5000/hotel" , {
  //     name: name , 
  //     description: description ,
  //     img: img
  //   },
  //   {headers: { authorization: `Bearer ${token}` }}
  //   ) 

  //   setData(respone.data)
  // }

  // const deleteCourse = async (id) =>{
  //   const respone = await axios.delete("http://localhost:5000/hotel/" + id , 
  //   {headers: { authorization: `Bearer ${token}` }})
  //   setData(respone.data)
  // }

  // const deleteAll = async () => {
  //   const respone = await axios.delete("http://localhost:5000/deleteAll")
  //   setData(respone.data)
  // }

  const updateData = async (id) => {
    // console.log(id);
    const respone = await axios.put("https://project-booking-backend.herokuapp.com/hotel/" , {
      idold : id , 
      name : nameUp , 
      description : descriptionUp , 
      img: imgUp,
    })

    setData(respone.data)
  }


  const inputUpdate = (id) => {
      return <div>
        <input onChange={(e)=>{setNameUp(e.target.value)}} type="text" placeholder="name"/>
        <input onChange={(e)=>{setDescriptionUp(e.target.value)}} type="text" placeholder="description"/>
        <input onChange={(e)=>{setImgUp(e.target.value)}} type="text" placeholder="img"/>
        <button onClick={()=>{updateData(id)}} >update now</button>
        </div>
  }

  
  const getRate = (rate)=> { 
    return <div>{
      RateArr.map((element , i) => {
        if (i+1 < rate) {
          // console.log(i+1 , rate);
          return <FaStar key = {i} style={{color : "orange"}}></FaStar>
        }
     })}
    </div>  
  }

  const bookadd =(id)=>{
    history.push("/book/" + id)
  }
  
  return (
    <div id="container">
      {/* <div className="opt">
      <input onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Name" />
      <input onChange={(e)=>{setDescription(e.target.value)}} type="text" placeholder="description" />
      <input onChange={(e)=>{setImg(e.target.value)}} type="text" placeholder="img" />
      <div className="button-opt">
      <button className="button" onClick={()=>{AddCourse()}}>ADD</button>
      <button className="button" onClick={()=>{deleteAll()}}>Delete All</button>
      </div>
      </div> */}
      
      
      {data && data.map((element , i) => {
        return <div key = {i} id="courses-all">
        <div id="courses">
        <div id="element">
        {/* <p>{element.user.name}</p> */}
        <h5>{element.name}</h5> 
        <p>{element.description}</p>
        </div>
        <img id="imghotel" src={element.img} alt="Javascript"></img>
        
      
        </div>
        <h4>{element.price} S.R</h4> 
    
        {
          getRate(element.rate)
        }
        
        <button className="btn-primary my-2" onClick={()=>{bookadd(element._id)}} >تفاصيل الفندق</button>
        
        {/* {element.user._id === userId ? <button onClick={()=>{deleteCourse(element._id)}} id="btn-x">X</button>:""} */}
        {/* <button onClick={()=>{deleteCourse(element._id)}} id="btn-u">Update</button> */}

        {/* <>{inputUpdate(element._id)}</> */}
        </div>
      })}
      
    </div>
  );
}

export default Hotels;
