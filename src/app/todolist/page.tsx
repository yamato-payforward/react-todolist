"use client"
import { FirebaseError } from '@firebase/util';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import Sidebar from "../../components/organisms/sidebar";
import Todolist from "../../components/templates/todolist";
import Modal from "./../../components/organisms/modal";
import { toast } from "react-toastify";
import { auth, db } from "../../lib/firebase"
import { collection, addDoc, serverTimestamp, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { query, where, getDocs, updateDoc } from 'firebase/firestore';

const ToDoList = () => {

    interface Task {
        id: string |  null;
        content: string;
    }

    const [tasks, setTasks] = useState<Task[]>([]);
    const [onGoingTasks, setOnGoingTasks] = useState<Task[]>([]);
    const [removedTasks, setRemovedTasks] = useState<Task[]>([]);
    const [input, setInput] = useState('');
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [taskVisible, setTaskVisible] = useState(true);

    const addTodoToFirebase = async (input: string) => {
        const user = getAuth().currentUser; 
        if (user) {
            try {
                const docRef = await addDoc(collection(db, "todos"), {
                    content: input,
                    completed: false,
                    createdAt: serverTimestamp(),
                    userId: user.uid, 
                });
                return docRef.id; 
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        } else {
            console.error("No user logged in");
        }
        return null;
    };


    const handleAddTask = async () => {
        if (input) {
            const id = await addTodoToFirebase(input);

            setTasks([...tasks, { id: id, content: input }]);
            setOnGoingTasks([...tasks, { id: id, content: input }]);
            setInput('');
            toast.success("タスクを追加しました")

        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
            if (user) {
                const onGoingTsksQuery = query(
                    collection(db, "todos"),
                    where("userId", "==", user.uid),
                    where("completed", "==", false)
                );
                const removedTsksQuery = query(
                    collection(db, "todos"),
                    where("userId", "==", user.uid),
                    where("completed", "==", true)
                );

                try {
                    const onGoingTaskSnapshot = await getDocs(onGoingTsksQuery)
                    const onGoingTasks = onGoingTaskSnapshot.docs.map(doc => ({
                        id: doc.id,
                        content: doc.data().content
                    }));
                    setTasks(onGoingTasks);
                    setOnGoingTasks(onGoingTasks);
                    debugger


                    const removedTaskSnapshot = await getDocs(removedTsksQuery)
                    const removedTasks = removedTaskSnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    const removedTaskArr = removedTasks.map(item => ({ id: item.id, content: item.content }));
                    setRemovedTasks(removedTaskArr);

                } catch (error) {
                    console.error("Error fetching todos: ", error);
                }
            } else {
                console.error("No user logged in");
                setTasks([]); 
            }
        });

        return () => unsubscribe();
    }, [auth]);    


    const setRemovedTasksFromTasks = () => {
        setTasks(removedTasks);
    };

    const setTasksFromRemovedTasks = () => {
        setTasks(onGoingTasks);
    };


    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const changeTaskVisible = (visible: boolean) => {
        setTaskVisible(visible);
    };

    const handleRemoveTask = async (index: number) => {
        const taskToRemove = tasks[index];
        const newTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
        let taskDocRef;
        
        if (taskToRemove.id !== null) {
             taskDocRef = doc(db, "todos", taskToRemove.id);
            
          } else {
            console.error('Task ID is null and cannot retrieve document reference.');
            return null;
          }
        try {
            await updateDoc(taskDocRef, {
                completed: true
            });
            setTasks(newTasks);
            setOnGoingTasks(newTasks);
            setRemovedTasks([...removedTasks, taskToRemove]);
            toast.success("タスクを完了しました");
        } catch (error) {
            console.error("Error updating document: ", error);
            toast.error("タスクの完了に失敗しました");
        }
    };

    const modalOpen = (flug: boolean) => {
        setModalIsOpen(flug);
    };

    const moveRemovedTaskToOnGoingTasks = async (index: number) => {
        const taskToMove = removedTasks[index]; 
        const newRemovedTasks = removedTasks.filter((_, taskIndex) => taskIndex !== index); 
        let taskDocRef;
        if (taskToMove.id !== null) {
           taskDocRef = doc(db, "todos", taskToMove.id);
        } else {
            console.error('Task ID is null and cannot retrieve document reference.');
            return null;
          }

        try {
            await updateDoc(taskDocRef, {
                completed: false  
            });
            setTasks(newRemovedTasks);
            setRemovedTasks(newRemovedTasks);  
            setOnGoingTasks([...onGoingTasks, taskToMove]); 
            toast.success("タスクを戻しました");
        } catch (error) {
            console.error("Error updating document: ", error);
            toast.error("タスクの移動に失敗しました");
        }
    };


    const logOut = async () => {
        try {
            await auth.signOut();
            window.location.href = '/'
        } catch (e) {
            if (e instanceof FirebaseError) {
                console.log(e)
            }
        }
    }



    return (
        <div className={styles.appContainer}>
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                modalOpen={modalOpen}
                setRemovedTasksFromTasks={setRemovedTasksFromTasks}
                setTasksFromRemovedTasks={setTasksFromRemovedTasks}
                changeTaskVisible={changeTaskVisible}
                logOut={logOut}
            />
            <Todolist
                moveRemovedTaskToOnGoingTasks={moveRemovedTaskToOnGoingTasks}
                taskVisible={taskVisible}
                tasks={tasks}
                input={input}
                setInput={setInput}
                isSidebarOpen={isSidebarOpen}
                handleAddTask={handleAddTask}
                handleRemoveTask={handleRemoveTask}
            />
            <Modal modalIsOpen={modalIsOpen} modalOpen={modalOpen} />
        </div>
    );
};

export default ToDoList;
