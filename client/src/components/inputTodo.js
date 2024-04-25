import React, { useState} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ListTodo from "./listTodo";
import MarkdownDownloadButton from './markdown';


function InputTodo() {
    const { id, title } = useParams();
    const [todo, setTodo] = useState({ title: "", description: "" });
    const [error, setError] = useState("");
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            if (!todo.title.trim()) {
                setError("Enter your todo ");
                return;
            }
            setError("");
            const response = await axios.post("http://localhost:8080/api/todos", {
                id: id,
                title: todo.title,
                description: todo.description
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            setTodo({ title: "", description: "" });
            console.log("Todo added:", response.data);
            window.location.reload();
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className=" container">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className='mt-4'>{title}</h1>
                <MarkdownDownloadButton id={id} title={title}/>

            </div>
            <form onSubmit={onSubmitForm} className='mt-5'>
                <div className="form-group">
                    <input
                        type="text"
                        value={todo.title}
                        onChange={e => setTodo({ ...todo, title: e.target.value })}
                        className='form-control mb-3'
                        placeholder='Add todo title here...'
                    />
                    {error && <p className="text-danger">{error}</p>}
                    <textarea
                        value={todo.description}
                        onChange={e => setTodo({ ...todo, description: e.target.value })}
                        className="form-control mb-3"
                        placeholder="Add todo description here..."
                        aria-label="With textarea"
                    ></textarea>
                    <div className="d-flex ">
                        <button className='btn btn-outline-success'>Add</button>
                    </div>
                </div>
            </form>
            <ListTodo id={id} />
        </div>
    )
}

export default InputTodo