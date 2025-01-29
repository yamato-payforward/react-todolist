import React from "react";
import { motion } from "framer-motion";
import styles from '../../app/todolist/page.module.css';
import Image from "next/image";
import avatar from "../../images/avatar.png";
import sidebarOpenImage from "../../images/sidebar_open.png";
import sidebarCloseImage from "../../images/sidebar_close.png";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {


  return (
    <>
        <motion.aside
          className={styles.sidebar}
          initial={{ x: "-80%" }} // 初期位置を画面外の左側に設定
          animate={{ x: isSidebarOpen ? "0%" : "-80%" }} //
          transition={{
            type: "tween",
            duration: 0.3,
            ease: "easeInOut",
          }}
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
      
      
      
    </>
  );
};

export default Sidebar;
