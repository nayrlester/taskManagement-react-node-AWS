import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const statusOptions = ['To Do', 'In Progress', 'Completed'];

export default function TaskPage() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '', status: 'To Do' });
    const [editingTask, setEditingTask] = useState(null);
    const [page, setPage] = useState(1);
    const pageSize = 10;

    useEffect(() => { fetchTasks(); }, []);

    const fetchTasks = async () => {
        const res = await axios.get(API_URL);
        setTasks(Array.isArray(res.data) ? res.data : []);
    };

    const addTask = async () => {
        await axios.post(API_URL, newTask);
        setNewTask({ title: '', description: '', status: 'To Do' });
        fetchTasks();
    };

    const deleteTask = async (id) => {
        if (!id) return alert('Invalid task ID');
        
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchTasks();
        } catch (error) {
            alert('Error deleting task');
        }
    };

    const startEditing = (task) => {
        setEditingTask({ ...task });
    };

    const updateTask = async () => {
        if (!editingTask) return;
        
        try {
            await axios.put(`${API_URL}/${editingTask._id}`, editingTask);
            setEditingTask(null);
            fetchTasks();
        } catch (error) {
            alert('Error updating task');
        }
    };

    const closeModal = () => {
        setEditingTask(null);
    };

    const paginatedTasks = tasks.slice((page - 1) * pageSize, page * pageSize);

    return (
        <div>
            <div className="task-form">
                <input
                    name='title'
                    placeholder="Title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
                <input
                    name='description'
                    placeholder="Description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
                <select
                    name='status'
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                >
                    {statusOptions.map((i) => <option key={i}>{i}</option>)}
                </select>
                <button className="add-btn" onClick={addTask}>Add Task</button>
            </div>

            <ul className="task-list">
                {paginatedTasks.map(task => (
                    <li key={task._id} className="task-item">
                        <div className="task-details">
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <span className={`status ${task.status.toLowerCase()}`}>{task.status}</span>
                        </div>
                        <div className="task-actions">
                            <button className="edit-btn" onClick={() => startEditing(task)}>Edit</button>
                            <button className="delete-btn" onClick={() => deleteTask(task._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="pagination">
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
                <button disabled={page * pageSize >= tasks.length} onClick={() => setPage(page + 1)}>Next</button>
            </div>

            {editingTask && (
                <div className="modal">
                    <div className="modal-content edit-form">
                        <h3>Edit Task</h3>
                        <input
                            name='title'
                            value={editingTask.title}
                            onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                        />
                        <input
                            name='description'
                            value={editingTask.description}
                            onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                        />
                        <select
                            name='status'
                            value={editingTask.status}
                            onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
                        >
                            {statusOptions.map((s) => <option key={s}>{s}</option>)}
                        </select>
                        <div className="modal-actions">
                            <button className="save-btn" onClick={updateTask}>Save</button>
                            <button className="cancel-btn" onClick={closeModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
