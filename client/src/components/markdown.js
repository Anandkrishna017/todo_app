
import React, { useState } from 'react';
import { exportTodos } from './listTodo';

function MarkdownDownloadButton({ onClick, id, title }) {
    const [incompleteTodos, setIncompleteTodos] = useState([]);
    const [completeTodos, setCompleteTodos] = useState([]);

    const handleDownload = async () => {
        try {
            const todos = await exportTodos(id);
            console.log('Fetched todos:', todos);


            const incomplete = todos.filter(todo => !todo.status);
            const complete = todos.filter(todo => todo.status);


            setIncompleteTodos(incomplete);
            setCompleteTodos(complete);


            const totalTodos = todos.length;
            const completedCount = complete.length;

            const markdownContent = `
# ${title}

**Summary:** ${completedCount}/${totalTodos} todos completed\n\n
**Pending:**
${incomplete.map(todo => `- [ ] ${todo.todoTitle}`).join('\n')}

**Completed:**
${complete.map(todo => `- [x] ${todo.todoTitle}`).join('\n')}
`;


            const blob = new Blob([markdownContent], { type: 'text/markdown' });


            const url = URL.createObjectURL(blob);

          
            const link = document.createElement('a');
            link.href = url;
            link.download = `${title}.md`;

           
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error fetching todos data:', error);
        }
    };

    return (
        <button onClick={onClick || handleDownload} className="btn btn-outline-primary">Export</button>
    );
}

export default MarkdownDownloadButton;
