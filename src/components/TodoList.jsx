import React, { useState } from 'react';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const addTask = () => {
        if (!newTask.trim()) return;
        setTasks([...tasks, { id: Date.now(), text: newTask }]);
        setNewTask('');
    };

    const editTask = (id, newText) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, text: newText } : task));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Adicionar nova tarefa"
            />
            <button onClick={addTask}>Adicionar</button>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <input
                            type="text"
                            value={task.text}
                            onChange={(e) => editTask(task.id, e.target.value)}
                        />
                        <button onClick={() => deleteTask(task.id)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
