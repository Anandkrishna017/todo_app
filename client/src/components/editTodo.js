import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditTodo({ todo }) {
  const [todoTitle, setTodoTitle] = useState(todo.todoTitle);
  const [todoDescription, setTodoDescription] = useState(todo.todoDescription);

  const { title } = useParams();

  const updateDescription = async () => {
    try {
      const body = {
        title: todoTitle,
        description: todoDescription
      };
      const response = await axios.put(`http://localhost:8080/api/todos/${todo._id}`, body, {

      });
      console.log("Todo updated:", response.data);
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };



  return (
    <>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#id${todo._id}`} onClick={() => {
        setTodoTitle(todo.todoTitle);
        setTodoDescription(todo.todoDescription);
      }}>
        Edit
      </button>

      <div className="modal fade" id={`id${todo._id}`} tabIndex="-1" aria-labelledby={`exampleModalLabel${todo._id}`} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`exampleModalLabel${todo._id}`}>Edit here...</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <input type="text" className="form-control mb-3" value={todoTitle} onChange={e => setTodoTitle(e.target.value)} />
              <textarea
                value={todoDescription}
                onChange={e => setTodoDescription(e.target.value)}
                className="form-control mb-3"
                aria-label="With textarea"
              ></textarea>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={updateDescription}>Save</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditTodo;
