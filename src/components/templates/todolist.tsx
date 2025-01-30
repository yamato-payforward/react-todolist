'use client'
import styles from './../../app/todolist/page.module.css';
import { motion } from 'framer-motion';
import Tasks from "../organisms/tasks"

const Todolist = ({ input,moveRemovedTaskToOnGoingTasks, handleRemoveTask, setInput, handleAddTask, tasks, isSidebarOpen,taskVisible }) => {


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