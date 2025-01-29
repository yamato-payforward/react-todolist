'use client'
import styles from './../../app/todolist/page.module.css';
import { motion } from 'framer-motion';

const Todolist = ({ input, handleRemoveTask, isOpenTodolist, setInput, handleAddTask, tasks }) => {

    const todolistVariants = {
        open: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 40 } },
        closed: { x: '100%', opacity: 0.8, transition: { type: 'spring', stiffness: 40 } }
    };

    return (
        <motion.main
            className={styles.mainContent}
            variants={todolistVariants}
            initial="closed"
            animate={isOpenTodolist ? "open" : "closed"}
        >
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
            <ul className={styles.taskList}>
                {tasks.map((task: string, index: number) => (

                    <li key={index} className={styles.task}>
                        <input
                            type="checkbox"
                            name="taskComplete"
                            onChange={() => handleRemoveTask(index)}
                            className={styles.checkbox}
                        />
                        {task}

                    </li>
                ))}
            </ul>
        </motion.main>
    )
}

export default Todolist;