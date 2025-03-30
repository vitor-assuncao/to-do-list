import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingText, setEditingText] = useState('');

    const addTask = () => {
        if (!newTask.trim()) return;
        setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
        setNewTask('');
    };

    const editTask = (id, text) => {
        setEditingTaskId(id);
        setEditingText(text);
    };

    const saveEditTask = (id) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, text: editingText } : task));
        setEditingTaskId(null);
        setEditingText('');
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const toggleCompleteTask = (id) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    };

    return (
        <div className="container">
            <h1>To-Do List</h1>

            <div className="input-group">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Adicionar nova tarefa"
                />
                <button className="add-button" onClick={addTask}>Adicionar</button>
            </div>

            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className={task.completed ? "completed" : ""}>
                        {editingTaskId === task.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingText}
                                    onChange={(e) => setEditingText(e.target.value)}
                                />
                                <button className="edit-button" onClick={() => saveEditTask(task.id)}>Salvar</button>
                            </>
                        ) : (
                            <>
                                <span>{task.text}</span>
                                <button className="complete-button" onClick={() => toggleCompleteTask(task.id)}>
                                    {task.completed ? "Desfazer" : "Completar"}
                                </button>
                                <button className="edit-button" onClick={() => editTask(task.id, task.text)}>Editar</button>
                                <button className="delete-button" onClick={() => deleteTask(task.id)}>Excluir</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
