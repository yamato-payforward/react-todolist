'use client'
import styles from './../../app/todolist/page.module.css';

interface Task {
	id: string | null;
	content: string;
}

interface TasksProps {
	tasks: Task[];
	handleRemoveTask: (index: number) => void;
	taskVisible: boolean;
	moveRemovedTaskToOnGoingTasks: (index: number) => void;
}

const Tasks = ({
	tasks,
	handleRemoveTask,
	taskVisible,
	moveRemovedTaskToOnGoingTasks
}: TasksProps) => {

	const handleTask = (index: number) => {
		if (taskVisible) {
			handleRemoveTask(index);
		} else {
			moveRemovedTaskToOnGoingTasks(index);
		}
	};
	return (
		<ul className={styles.taskList}>
			{tasks.map((task, index) => (
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