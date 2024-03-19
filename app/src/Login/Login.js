import { useState } from 'react';
import './Login.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'


const Login=()=>{
const [email,setEmail]=useState('')
const[ password,setPasword]=useState('')
const navigate = useNavigate()

const clickEmail=(e) =>{
    setEmail(e.target.value)
}
const clickPassword=(e)=>{
    setPasword(e.target.value)
}
const enter= async()=>{
    const data={
        email:email,
        password:password,
    }
    try {
        const response = await axios.post('http://localhost:4000/login', data)
        console.log({response})
        if (response.data.token){
            const expiryTime = new Date();
            expiryTime.setTime(expiryTime.getTime() + (5 * 60 * 1000)); 
            Cookies.set('token', response.data.token, { expires: expiryTime });
            alert(response.data.msg)
            navigate('/dashboard')
        } 
    } catch (error) {
        console.log(error, 'dashboard')
        alert(error.response.data)
    }
    
}

    return(
        <div>
            <h1>Login Form</h1>
            <input type="email" placeholder="Enter Email" onChange={clickEmail}/>
            <input type="password" placeholder="Enter Password" onChange={clickPassword}/>
            <button onClick={enter}>Login</button>
        </div>
    )
}


export default Login;