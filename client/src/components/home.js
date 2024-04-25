import { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/home.css"
import { Link } from 'react-router-dom';

const Home = () => {

  const email = localStorage.getItem("email");
  const [projects, setProjects] = useState([

  ]);
  const [error, setError] = useState("");
  const [projectData, setProjectData] = useState({
    projectName: '',
  });

  useEffect(() => {
    fetchProjects();
  });

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/projects?email=${encodeURIComponent(email)}`);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    window.location.reload();
  };

  const handleChange = (e) => {
    setProjectData({
      ...projectData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post('http://localhost:8080/api/projects', { ...projectData, email });
      console.log('Project added:', response.data);
      setProjectData({
        projectName: '',
      });
      setError("");
      fetchProjects();
    } catch (error) {
      console.error('Error adding project:', error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const deleteProject = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8080/api/projects/${id}`);
      console.log(res.data)
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  }
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <h1 className="" >My Projects</h1>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <div className="mt-5">
        <h2>Add New Project</h2>
        <form onSubmit={handleSubmit} className='d-flex mt-5'>
          <input
            type="text"
            className="form-control"
            id="projectName"
            name="projectName"
            placeholder='Type Project Name'
            value={projectData.projectName}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn-primary">Add Project</button>
        </form>
        {error && <p className="alert alert-danger mb-3">{error}</p>}
      </div>
      <div className="mt-5">
        <ul className="list-group">
          {projects.map(project => (
            <li key={project._id} className="list-group-item">
              <Link to={`/todo/${project._id}/${encodeURIComponent(project.projectName)}`} style={{ textDecoration: 'none', color: 'Black' }}  >
                <h1>{project.projectName}</h1>
              </Link>
              <button className='delete-button btn btn-danger' onClick={() => deleteProject(project._id)}>delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
