'use client'
import styles from './../../app/todolist/page.module.css';
import { motion } from 'framer-motion';

const Todolist = ({ input, handleRemoveTask, setInput, handleAddTask, tasks, isSidebarOpen }) => {

   
    const todolistVariants = {
        open: { 
            x: 0, 
            width: 'calc(100% - 250px)', // サイドバーが開いている時の幅
            opacity: 1, 
            transition: { type: 'spring', stiffness: 40 }
        },
        closed: { 
            x: 0, // ここを調整して閉じたときにどの程度左に移動するか
            width: '100%', // サイドバーが閉じている時の幅
            opacity: 1, 
            transition: { type: 'spring', stiffness: 40 }
        }
    };

    return (
        <motion.main
        className={styles.mainContent}
        initial={{ x: "100%" }} // 初期位置を画面外の左側に設定
          animate={{ x: isSidebarOpen ? "0%" : "-20%" }} //
          transition={{
            type: "tween",
            duration: 0.3,
            ease: "easeInOut",
          }}
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