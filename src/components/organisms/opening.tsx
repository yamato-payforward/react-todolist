'use client'
import styles from './opening.module.css';
import Image from 'next/image'
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';


const Opening = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // 1.5秒後にフェードアウト
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 1300);
        return () => clearTimeout(timer);
    }, []);
    if (isVisible) {
        return (
            <motion.div
                className={styles.opening}
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 10, delay: 0.3 }}
            >
                <Image
                    className={styles.logo}
                    src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnhwancxeGRlNXB4cTVqbnE1MHpxeW5pMzVjM3VxZG1kY3l4eGtqZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YZrLBEnjQewI1s1hY7/giphy.gif"
                    layout="absolute"
                    width={100}
                    height={100}
                    alt=""
                    unoptimized={true}
                />
            </motion.div>
        );
    } else {
        return null; // isVisible が false の場合は何も表示しない
    }
}

export default Opening;