"use client"
import { FirebaseError } from '@firebase/util';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import Sidebar from "../../components/organisms/sidebar";
import Todolist from "../../components/templates/todolist";
import Modal from "./../../components/organisms/modal";
import { toast } from "react-toastify";
import { auth, db } from "../../lib/firebase"
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { query, where, getDocs } from 'firebase/firestore';

const ToDoList = () => {
    const [tasks, setTasks] = useState([]);
    const [onGoingtasks, setOnGoingTasks] = useState([]);
    const [removedTasks, setRemovedTasks] = useState([]);
    const [input, setInput] = useState('');
    const [isTodolistOpen, setTodolistOpen] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [taskVisible, setTaskVisible] = useState(true);
  
    const addTodoToFirebase = async (input: string) => {
        onAuthStateChanged(getAuth(), async (user) => {
            if (user) {
                try {
                    await addDoc(collection(db, "todos"), {
                        content: input,
                        completed: false,
                        createdAt: serverTimestamp(),
                        userId: user.uid, // ユーザーIDをログインしているユーザーのUIDに設定
                    });
                    console.log("Document successfully added!");
                } catch (error) {
                    console.error("Error adding document: ", error);
                }
            } else {
                console.error("No user logged in");
            }
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
            if (user) {
                const q = query(collection(db, "todos"), where("userId", "==", user.uid));
                try {
                    const snapshot = await getDocs(q);
                    const todos = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    const arr = todos.map(item => ({ id: item.id, content: item.content }));
                    setTasks(arr);
                    setOnGoingTasks(arr);
                } catch (error) {
                    console.error("Error fetching todos: ", error);
                }
            } else {
                console.error("No user logged in");
                setTasks([]); // ログインしていない場合はタスクをクリア
            }
        });

        return () => unsubscribe(); // コンポーネントのアンマウント時にリスナーを解除
    }, [auth]); // auth を依存配列に追加して、authオブジェクトの変更時にも実行されるようにする    


    const handleAddTask = () => {
        if (input) {
            addTodoToFirebase(input)
            setTasks([...tasks, input]);
            setOnGoingTasks([...tasks, input]);
            setInput('');
            toast.success("タスクを追加しました")

        }
    };

    const setRemovedTasksFromTasks = () => {
        setTasks(removedTasks);
    };

    const setTasksFromRemovedTasks = () => {
        setTasks(onGoingtasks);
    };


    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const changeTaskVisible = (visible: boolean) => {
        setTaskVisible(visible);
    };

    const handleRemoveTask = (index: number) => {
        const taskToRemove = tasks[index];
        const newTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
        setTasks(newTasks);
        setOnGoingTasks(newTasks);
        setRemovedTasks([...removedTasks, taskToRemove]);
        toast.success("タスクを完了しました")
    };

    const modalOpen = (flug: boolean) => {
        setModalIsOpen(flug);
    };

    const moveRemovedTaskToOnGoingTasks = (index: number) => {
        const taskToOnGoingTask = tasks[index];
        const newTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
        setTasks(newTasks);
        setRemovedTasks(newTasks);
        setOnGoingTasks([...onGoingtasks, taskToOnGoingTask]);
        toast.success("タスクを戻しました")
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
