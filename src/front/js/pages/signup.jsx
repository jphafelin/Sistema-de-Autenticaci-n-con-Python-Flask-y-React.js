import React, {useState} from "react";
import { useNavigate } from "react-router-dom"
const BACKEND_URL = process.env.BACKEND_URL
export const Register = () => {
    const [email, setEmail]= useState("")
    const [password, setPassword]= useState("")
    const navigate = useNavigate();

    
    
    const handleClick = () =>{
       var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
        
  		"email": email,
  		"password": password
 
        

		});

		var requestOptions = {
  		method: 'POST',
  		headers: myHeaders,
  		body: raw,
  		redirect: 'follow'
		};

		fetch("https://3001-jphafelin-sistemadeaute-w6fxbhtly2h.ws-eu96b.gitpod.io/api/register", requestOptions)
  		.then(response => response.text())
  		.then(result => console.log(result))
  		.catch(error => console.log('error', error));
    
    navigate("/login");

    
    }


    return (
        <div className="wrapper container col-5">
            <form className="form-signin bg-light p-3 rounded m-5"onSubmit={handleClick}>
                <h2 className="form-signin-heading m-2">Registrate</h2>
                <input type="text" className="form-control m-2" name="username" placeholder="Email"value={email} onChange={ (e)=> {setEmail(e.target.value)}} required="" autoFocus="" />
                <input type="password" className="form-control m-2" name="password" placeholder="Contraseña"value={password} onChange={ (e)=> {setPassword(e.target.value)}} required="" />

                
				
                <button className="btn btn-lg btn-primary btn-block m-2" type="submit">Registrate</button>
				
            </form>
        </div>

    );
};