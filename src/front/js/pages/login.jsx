import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail]= useState("")
    const [password, setPassword]= useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();

    
    
    const handleClick = async (e) => {
        e.preventDefault()
        try {
          const loginSuccesful = await actions.login(email, password);
          if (loginSuccesful) {
            navigate("/private");
          } else {
            setError("Correo electrónico o contraseña incorrectos");
          }
        } catch (error) {
          console.log(error);
          setError("Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo.");
        }
      }


    return (
        <div className="wrapper container col-5">
            <form className="form-signin bg-light p-3 rounded m-5"onSubmit={handleClick}>
                <h2 className="form-signin-heading m-2">Login</h2>
                <input type="text" className="form-control m-2" name="username" placeholder="Email"value={email} onChange={ (e)=> {setEmail(e.target.value)}} required="" autoFocus="" />
                <input type="password" className="form-control m-2" name="password" placeholder="Contraseña"value={password} onChange={ (e)=> {setPassword(e.target.value)}} required="" />

                
				
                <button className="btn btn-lg btn-primary btn-block m-2" type="submit">Login</button>
				
            </form>
        </div>

    );
};