'use client'
import styles from './welcome.module.css';
import { motion } from 'framer-motion';
import { auth } from '../../lib/firebase'
import { signInAnonymously , getAuth } from 'firebase/auth'


const Welcome = () => {
    const handleAnonymousSignIn = async () => {
        try {
            const userCredential = await signInAnonymously(auth)
            const token = await userCredential.user.getIdToken()
 
            // トークンをクッキーに保存
            document.cookie = `firebase-token=${token}; path=/`
            // ダッシュボードなどにリダイレクト
            window.location.href = '/todolist'

        } catch (error) {
            console.error('匿名認証エラー:', error)
        }
    }
    return (
        <motion.main
            className={styles.container}
            initial={{ opacity: 0 }} // 初期状態を完全に透明に設定
            animate={{ opacity: 1 }} // アニメーション後は完全に不透明に設定
            transition={{ duration: 2, delay: 1 }} // トランジションの時間と遅延を設定
        >
            <h1 className={styles.thema}>あなたの予定をスマートに管理する</h1>
            <h2 className={styles.message}>さあ始めよう！</h2>
            <button className={styles.button} onClick={handleAnonymousSignIn}>始める(匿名ログイン) </button>
        </motion.main>
    )
}

export default Welcome;