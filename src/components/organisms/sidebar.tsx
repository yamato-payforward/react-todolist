import React from "react";
import { motion } from "framer-motion";
import styles from '../../app/todolist/page.module.css';
import Image from "next/image";
import avatar from "../../images/avatar.png";
import sidebarOpenImage from "../../images/sidebar_open.png";
import sidebarCloseImage from "../../images/sidebar_close.png";

const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
  const sidebarVariants = {
    open: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 50 } },
    closed: { x: '-100%', opacity: 0, transition: { type: 'spring', stiffness: 50 } }
  };

  // サイドバーの開閉をトグルする関数
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {isSidebarOpen && (
        <motion.aside
          className={styles.sidebar}
          variants={sidebarVariants}
          initial="closed"
          animate={isSidebarOpen ? "open" : "closed"}
        >
          <div className={styles.profileContainer}>
            <Image
              src={avatar}
              width={500}
              height={500}
              alt="Picture of the author"
              className={styles.profileImage}
            />
            <div className={styles.name}>匿名ログイン</div>
          </div>
          <button onClick={toggleSidebar}>
            <Image
              src={sidebarCloseImage}
              alt="Close Sidebar"
              width={50}
              height={50}
              className={styles.additionalImage} />
          </button>
        </motion.aside>
      )}
      {!isSidebarOpen && (
        <button onClick={toggleSidebar} className={styles.openButton}>
          <Image
            src={sidebarOpenImage}
            alt="Open Sidebar"
            width={50}
            height={50}
            className={styles.additionalImage} />
        </button>
      )}
    </>
  );
};

export default Sidebar;
