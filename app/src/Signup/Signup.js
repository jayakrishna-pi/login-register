import './Signup.css';

import axios from 'axios'

import {useState} from 'react'
const Signup=()=>{

    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPasword] = useState('')

    const saveUserName = (e) => {
        setUserName(e.target.value)
    }

    const saveEmail = (e) => {
        setEmail(e.target.value)
    }

    const savePassword = (e) => {
        setPasword(e.target.value)
    }

    const submit =() => {
       console.log({username, email, password})

       const data = {
        username: username,
        email: email,
        password: password
       }
       const response = axios.post('http://localhost:4000/register', data ) 
       alert(response.data)
    }
   


    return(
        <div className='signup-container'>
            <h1>Register Form</h1>
            <input type='text'  placeholder='Enter Username' name='username' onChange={saveUserName} />
            <input type='email' placeholder='Enter Email' name='email' onChange={saveEmail} />
            <input type='password' placeholder='Enter Password' name='password' onChange={savePassword} />
            <button onClick={submit}>Register</button>
        </div>
    )

    

}
export default Signup;