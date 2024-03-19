import { Link } from "react-router-dom"


const NotFound = () => {
    return(
        <div>
            <h1>Woops!!, you're on wrong path</h1>
            <Link to={'/'}>
               <button>back to Home</button>
            </Link>
        </div>
    )
}

export default NotFound