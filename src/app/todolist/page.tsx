"use client"
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import Sidebar from "../../components/organisms/sidebar";
import Todolist from "../../components/templates/todolist";


const ToDoList = () => {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');
    const [isSidebarAnimated, setSidebarAnimation] = useState(false);
    const [isTodolistOpen, setTodolistOpen] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        setSidebarAnimation(true);
        setTodolistOpen(true);
      }, []); // 空の依存配列を指定して、コンポーネントの初回マウント時にのみ実行
    
      
    const handleAddTask = () => {
        if (input) {
            setTasks([...tasks, input]);
            setInput('');
        }
    };

    const handleRemoveTask = (index: number) => {
        const newTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
        setTasks(newTasks);
    };



    return (
        <div className={styles.appContainer}>
            <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} animated={isSidebarAnimated}/>
            <Todolist
            tasks={tasks}
            input={input}
            setInput={setInput}
            isOpenTodolist={isTodolistOpen} 
            handleAddTask={handleAddTask}
            handleRemoveTask={handleRemoveTask}
            />
        </div>
    );
};

export default ToDoList;
