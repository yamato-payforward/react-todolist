'use client'
import styles from './welcome.module.css';
import { motion } from 'framer-motion';

const Welcome = () => {
    return (
        <motion.main
            className={styles.container}
            initial={{ opacity: 0 }} // 初期状態を完全に透明に設定
            animate={{ opacity: 1 }} // アニメーション後は完全に不透明に設定
            transition={{ duration: 2, delay: 1 }} // トランジションの時間と遅延を設定
        >
            <h1 className={styles.thema}>あなたの予定をスマートに管理する</h1>
            <h2 className={styles.message}>さあ始めよう！</h2>
            <a className={styles.button} href='todolist'>始める(匿名ログイン)</a>
        </motion.main>
    )
}

export default Welcome;