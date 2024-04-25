import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react'

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500) {
        setError(error.response.data.message);
      }

    }
  }
  return (
    <div className="container mt-5 d-inline-flex justify-content-center">
      <div className="row gx-0 justify-content-center display: flex;">
        <div className="col-md-6 ">
          <div className="card h-100 bg-info p-3">
            <div className="card-body">
              <div className="left">
                <h1>Welcome Back!</h1>
                <Link to="/login">
                  <button type='button' className="btn btn-primary btn-block">Sign in</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <div className="right">
                <form onSubmit={handleSubmit}>
                  <h1>Create Account</h1>
                  <input
                    type="text"
                    name="firstName"
                    placeholder='First Name'
                    value={data.firstName}
                    required
                    className="form-control mb-3"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder='Last Name'
                    value={data.lastName}
                    required
                    className="form-control mb-3"
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder='Email'
                    value={data.email}
                    required
                    className="form-control mb-3"
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder='Password'
                    value={data.password}
                    required
                    className="form-control mb-3"
                    onChange={handleChange}
                  />
                  {error && <div className="alert alert-danger mb-3">{error}</div>}
                  <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Signup