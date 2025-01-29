"use client"
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import Sidebar from "../../components/organisms/sidebar";
import Todolist from "../../components/templates/todolist";


const ToDoList = () => {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');
    const [isTodolistOpen, setTodolistOpen] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const handleAddTask = () => {
        if (input) {
            setTasks([...tasks, input]);
            setInput('');
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
      };

    const handleRemoveTask = (index: number) => {
        const newTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
        setTasks(newTasks);
    };



    return (
        <div className={styles.appContainer}>
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
            <Todolist
            tasks={tasks}
            input={input}
            setInput={setInput}
            isSidebarOpen={isSidebarOpen}
            handleAddTask={handleAddTask}
            handleRemoveTask={handleRemoveTask}
            />
        </div>
    );
};

export default ToDoList;
