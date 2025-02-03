'use client'
import styles from './welcome.module.css';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image'
import { auth } from '../../lib/firebase'
import { signInAnonymously} from 'firebase/auth'


const Welcome = () => {
    const [isLoading, setIsLoading] = useState(false);
    const handleAnonymousSignIn = async () => {
        try {
            setIsLoading(true);
            const userCredential = await signInAnonymously(auth)
            const token = await userCredential.user.getIdToken()
            document.cookie = `firebase-token=${token}; path=/`
            window.location.href = '/todolist'
            setIsLoading(false);

        } catch (error) {
            console.error('匿名認証エラー:', error)
        }
    }
    if (!isLoading) {
        debugger
        return (
            <motion.main
                className={styles.container}
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1 }} 
            >

                <h1 className={styles.thema}>あなたの予定をスマートに管理する</h1>
                <h2 className={styles.message}>さあ始めよう！</h2>
                <button className={styles.button} onClick={handleAnonymousSignIn}>始める(匿名ログイン) </button>
            </motion.main>
        )
    } else {
        return (
            <div className={styles.container}>
                <Image
                    className={styles.loadging}
                    src={"https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDhmNmJ1aTl0cDgxeTd5cWxhbjVvbWQ4MGhzczFpc2J1NjNhOTcxNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PERWEH52TyyoUsfdsx/giphy.gif"}
                    layout="absolute"
                    width={200}
                    height={200}
                    alt=""
                    unoptimized={true}
                />
            </div>
        );
    }
}

export default Welcome;