import React from "react";
import { motion } from "framer-motion";
import styles from '../../app/todolist/page.module.css';
import Image from "next/image";
import avatar from "../../images/avatar.png";
import sidebarOpenImage from "../../images/sidebar_open.png";
import sidebarCloseImage from "../../images/sidebar_close.png";
import user from "../../images/user.png";
import exit from "../../images/exit.png";
import checked from "../../images/checked.png";
import task from "../../images/task.png";

interface SidebarProps {
  logOut: () => void;
  setTasksFromRemovedTasks: () => void; 
  changeTaskVisible: (visible: boolean) => void; 
  isSidebarOpen: boolean; // 
  toggleSidebar: () => void;
  modalOpen: (isOpen: boolean) => void;
  setRemovedTasksFromTasks: () => void; 
}

interface NavItem{
  id: number,
  imcSrc: string,
  name: string
}

const Sidebar = ({
  logOut,
  setTasksFromRemovedTasks,
  changeTaskVisible,
  isSidebarOpen,
  toggleSidebar,
  modalOpen,
  setRemovedTasksFromTasks
}:SidebarProps) => {

  const navItems = [
    { id: 1, imgSrc: user, name: "ポートフォリオ概要" },
    { id: 2, imgSrc: task, name: "タスク" },
    { id: 3, imgSrc: checked, name: "完了したタスク" },
    { id: 4, imgSrc: exit, name: "ログアウト" }
  ];

  const handleItemClick = (item: NavItem ) => {
    if(item.name == "ポートフォリオ概要"){
      modalOpen(true);
    }else if (item.name == "完了したタスク"){
      setRemovedTasksFromTasks();
      changeTaskVisible(false)
      modalOpen(false);
    }else if (item.name == "タスク"){
      setTasksFromRemovedTasks();
      changeTaskVisible(true)
      modalOpen(false);
    }else{
      logOut();
    }
  };

  return (
    <>
      <motion.aside
        className={styles.sidebar}
        initial={{ x: "-80%" }} 
        animate={{ x: isSidebarOpen ? "0%" : "-80%" }} 
        transition={{
          type: "tween",
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        <div className={styles.profileContainer}>
          <div className={styles.avatarContainer}>
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
              src={isSidebarOpen ? sidebarCloseImage : sidebarOpenImage} 
              alt="Close Sidebar"
              width={50}
              height={50}
              className={styles.additionalImage} />
          </button>
        </div>
        <nav className={styles.navigation}>
          <ul>
            {navItems.map(item => (
              <li key={item.id} className={styles.navItemContainer} onClick={() => handleItemClick(item)}>
                <Image
                  src={item.imgSrc}
                  width={500}
                  height={500}
                  alt="Picture of the author"
                  className={styles.iconImage}
                />
                <div className={styles.name}>{item.name}</div>
              </li>
            ))}

          </ul>
        </nav>
      </motion.aside>



    </>
  );
};

export default Sidebar;
