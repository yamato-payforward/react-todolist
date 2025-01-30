'use client'
import styles from './../../app/todolist/page.module.css';

const Tasks = ({ tasks,handleRemoveTask,taskVisible,moveRemovedTaskToOnGoingTasks}) => {

    const handleTask = (index: number) => {
        if (taskVisible) {
          handleRemoveTask(index);
        }else{
          moveRemovedTaskToOnGoingTasks(index);
        }
    };
    return (
        <ul className={styles.taskList}>
            {tasks.map((task: string, index: number) => (
                <li key={index} className={styles.task}>
                    <input
                        type="checkbox"
                        name="taskComplete"
                        onChange={() => handleTask(index)}
                        className={styles.checkbox}
                    />
                    {task.content}

                </li>
            ))}
        </ul>
    )
}

export default Tasks;