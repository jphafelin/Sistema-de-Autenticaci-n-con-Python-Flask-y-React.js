
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const Navbar = () => {
	const { store, actions } = useContext(Context)
	const navigate = useNavigate();
	const handleClick = () => {
		actions.logout();
		navigate("/");
	}
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container col-6">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>

				<Link to="/private">
					<span className="navbar-brand mb-0 h1">Private</span>
				</Link>
				{!store.token ? (
					<div className="col-3">
						<Link to="/signup">
							<span className="navbar-brand mb-0 h1">SignUp</span>
						</Link>
						<Link to="/login">
							<span className="navbar-brand mb-0 h1">Login</span>
						</Link>
					</div>
				) : (
					<button onClick={handleClick} className="btn btn-rounded btn-primary"> Cerrar Sesión</button>
				)}

			</div>
		</nav>
	);
};
