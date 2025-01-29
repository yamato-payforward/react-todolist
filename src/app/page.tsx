import Image from "next/image";
import Opening from "../components/organisms/opening";
import Welcome from "../components/templates/welcome";
import styles from './page.module.css';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div>
      <Opening />
      <Welcome/>
    </div>
  );
}
