'use client'
import styles from './../../app/todolist/page.module.css';
import { motion } from 'framer-motion';
import Tasks from "../organisms/tasks";

interface Task {
    id: string |  null;
    content: string;
  }
  
  interface TodolistProps {
    input: string; 
    moveRemovedTaskToOnGoingTasks: (index: number) => void; 
    handleRemoveTask: (index: number) => void; 
    setInput: (input: string) => void;
    handleAddTask: () => void; 
    tasks: Task[]; 
    isSidebarOpen: boolean; 
    taskVisible: boolean; 
  }

const Todolist = ({ input,moveRemovedTaskToOnGoingTasks, handleRemoveTask, setInput, handleAddTask, tasks, isSidebarOpen,taskVisible }: TodolistProps) => {
    return (
        <motion.main
            className={styles.mainContent}
            initial={{ x: "100%" }} 
            animate={{ x: isSidebarOpen ? "0%" : "-20%" }} 
            transition={{
                type: "tween",
                duration: 0.3,
                ease: "easeInOut",
            }}
        >
            {taskVisible ? (
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        placeholder="Add a new task..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className={styles.input}
                    />
                    <button onClick={handleAddTask} className={styles.addButton}>Add</button>
                </div>
            ) : (
                    <h2 className={styles.removedTasksTitle}>削除済みのタスク</h2>
            )}
            <Tasks
            tasks={tasks}
            handleRemoveTask={handleRemoveTask}
            taskVisible={taskVisible}
            moveRemovedTaskToOnGoingTasks={moveRemovedTaskToOnGoingTasks}
            />
        </motion.main>
    )
}

export default Todolist;