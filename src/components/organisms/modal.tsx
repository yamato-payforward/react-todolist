import { motion, AnimatePresence } from 'framer-motion';
import styles from './modal.module.css';
import Image from "next/image";
import avatar from "../../images/avatar.png";

interface ModalProps {
  modalIsOpen: boolean;
  modalOpen: (isOpen: boolean) => void;
}

const Modal = ({ modalIsOpen, modalOpen }: ModalProps) => {
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
              <Image src={avatar} width={100} height={100} alt="Avatar" className={styles.avatar} />
              <p className={styles.profileContent }>
                これはポートフォリオです。<br/>フロントをReact.js(Next.js)、サーバーをfirebaseで作成しました。
              </p>
              <button onClick={() => modalOpen(false)} className={styles.changeButton}>戻る</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modal;
