import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard=()=>{
    const token = Cookies.get('token')
    const [data, setData] = useState({})
    const navigate = useNavigate()
    console.log({token})
    useEffect(() => {
        const profileData = async() => {
            
            try {
                const response = await axios.get('http://localhost:4000/dashboard', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setData(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }

        profileData()
    }, [token])

    const logout = () => {
        Cookies.remove('token')
        navigate('/login')
    }

   return(
    <div>
        <h1>Hey {data.username}</h1>
        <button onClick={logout}>Logout</button>
    </div>
   ) 
}

export default Dashboard;
