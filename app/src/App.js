import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import {BrowserRouter,Routes, Route } from 'react-router-dom';
import Home from "./Home";
import NotFound from "./NotFound";
import AuthCheck from "./AuthCheck";
  
   
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Signup/>} />
        <Route element={<AuthCheck />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/" element={<Home/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
