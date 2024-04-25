import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditTodo from './editTodo';

const ListTodo = (id) => {
    const [todos, setTodos] = useState([]);
    const getTodos = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/todos?id=${id.id}`);
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/todos/${id}`);
            setTodos(todos.filter(todo => todo._id !== id));
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleCheckboxChange = async (todoId, isChecked) => {
        try {
            await axios.put(`http://localhost:8080/api/todos/updateCheckbox/${todoId}`, { isChecked });
            console.log('Checkbox status updated successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error updating checkbox status:', error);
        }
    };

    return (
        <div className='mr-5 mt-5'>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th></th>
                        <th >Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <React.Fragment key={todo._id}>
                            <tr>
                                <td rowSpan={2} align='center' ><input type='checkbox' onChange={(e) => handleCheckboxChange(todo._id, e.target.checked)} checked={todo.status} /></td>
                                <td className='d-flex'><h5>{todo.todoTitle} |</h5>  <p style={{ marginLeft: '5px' }}>{todo.date.substring(0, 10)}</p></td>
                                <td><EditTodo todo={todo} /></td>
                                <td><button className='btn btn-danger' onClick={() => deleteTodo(todo._id)}>Delete</button></td>
                            </tr>
                            <tr>
                                <td colSpan={3}>{todo.todoDescription}</td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export const exportTodos = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/todos?id=${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching todos:', error);
        return [];
    }
};

export default ListTodo;
