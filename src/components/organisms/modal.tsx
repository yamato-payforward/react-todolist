import { motion, AnimatePresence } from 'framer-motion';
import styles from './modal.module.css';
import Image from "next/image";
import avatar from "../../images/avatar.png";

const Modal = ({ modalIsOpen, modalOpen, username }) => {

    const handleUsernameChange = () => {
    };


    const handleSubmit = () => {
    };



  return (
    <>
      <AnimatePresence>
        {modalIsOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={styles.modal}
          >
          <div className={styles.modalContent}>
              <button className={styles.close} onClick={() => modalOpen(false)}>✖️</button>
              <Image src={avatar} width={100} height={100} alt="Avatar" className={styles.avatar} />
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className={styles.usernameInput}
              />
              <button onClick={handleSubmit} className={styles.changeButton}>変更</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modal;
