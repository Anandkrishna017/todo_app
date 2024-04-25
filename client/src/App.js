import Signup from "./components/signup.js";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/home.js";
import Login from "./components/login.js";
import Todo from "./components/inputTodo.js";
function App() {
  const user = localStorage.getItem("token");
  return (

    <Routes>
      {user && <Route path="/" exact element={<Home />} />}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/todo/:id/:title" exact element={<Todo />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
