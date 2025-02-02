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
    const [tasks, setTasks] = useState([]);
    const [onGoingTasks, setOnGoingTasks] = useState([]);
    const [removedTasks, setRemovedTasks] = useState([]);
    const [input, setInput] = useState('');
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [taskVisible, setTaskVisible] = useState(true);
  
    const addTodoToFirebase = async (input) => {
        const user = getAuth().currentUser; // 現在のユーザーを取得
        if (user) {
            try {
                const docRef = await addDoc(collection(db, "todos"), {
                    content: input,
                    completed: false,
                    createdAt: serverTimestamp(),
                    userId: user.uid, // ユーザーID
                });
                return docRef.id; // ドキュメントのIDを返す
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        } else {
            console.error("No user logged in");
        }
        return null; // ユーザーがログインしていない場合、またはエラーが発生した場合は null を返す
    };
    

    const handleAddTask = async () => {
        if (input) {
            const id = await addTodoToFirebase(input); 
        
            setTasks([...tasks, {id: id, content: input }]);
            setOnGoingTasks([...tasks,  {id: id, content: input }]);
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
                        ...doc.data()
                    }));
                    debugger
                    const onGoingTaskArr = onGoingTasks.map(item => ({ id: item.id, content: item.content }));
                    setTasks(onGoingTaskArr);
                    setOnGoingTasks(onGoingTaskArr);


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
                setTasks([]); // ログインしていない場合はタスクをクリア
            }
        });

        return () => unsubscribe(); // コンポーネントのアンマウント時にリスナーを解除
    }, [auth]); // auth を依存配列に追加して、authオブジェクトの変更時にも実行されるようにする    


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

    const handleRemoveTask = async (index) => {
        const taskToRemove = tasks[index];
        const newTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    debugger
        // Firestorejのドキュメントを更新
        const taskDocRef = doc(db, "todos", taskToRemove.id); // 'todos'コレクションの対象ドキュメントへの参照
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

    const moveRemovedTaskToOnGoingTasks = async (index) => {
        const taskToMove = removedTasks[index];  // 完了済みタスクリストからタスクを取得
        const newRemovedTasks = removedTasks.filter((_, taskIndex) => taskIndex !== index);  // タスクをリストから削除
        const taskDocRef = doc(db, "todos", taskToMove.id);  // 対象ドキュメントへの参照を取得
    
        try {
            await updateDoc(taskDocRef, {
                completed: false  // Firestore でのドキュメントを更新
            });
            setTasks(newRemovedTasks);
            setRemovedTasks(newRemovedTasks);  // ローカルの状態を更新
            setOnGoingTasks([...onGoingTasks, taskToMove]);  // タスクを進行中リストに追加
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
