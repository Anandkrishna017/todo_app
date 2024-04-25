import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data.token);
			localStorage.setItem("email", res.data.email);
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className="container mt-5 d-inline-flex justify-content-center">
			<div className="row gx-0 justify-content-center display: flex;">
				<div className="col-md-4">
					<div className="card h-100">
						<div className="card-body ">
							<form onSubmit={handleSubmit} className="justify-content-center">
								<h1>Login to Your Account</h1>
								<input
									type="email"
									placeholder="Email"
									name="email"
									onChange={handleChange}
									value={data.email}
									required
									className="form-control mb-3"
								/>
								<input
									type="password"
									placeholder="Password"
									name="password"
									onChange={handleChange}
									value={data.password}
									required
									className="form-control mb-3"
								/>
								{error && <div className="alert alert-danger mb-3">{error}</div>}
								<button type="submit" className="btn btn-primary btn-block">Sign In</button>
							</form>
						</div>
					</div>
				</div>
				<div className="col-md-4 mt-3 mt-md-0 ">
					<div className="card h-100 bg-info p-3">
						<div className="card-body justify-content-center">
							<h1>New Here ?</h1>
							<Link to="/signup">
								<button type="button" className="btn btn-primary btn-block">Sign Up</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;



