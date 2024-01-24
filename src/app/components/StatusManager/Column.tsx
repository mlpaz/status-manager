"use client";
import styles from "./status-manager.module.css";
import { motion } from "framer-motion";
import classNames from "classnames";
import { Status } from "./interfaces";
import { statusMap } from "../constants";

export default function Column({
  status,
  title,
  children,
}: {
  status: Status;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={classNames(styles.box, styles[`${statusMap.get(status)}Bg`])}
    >
      <motion.h1
        layout="position"
        className={classNames(
          styles.boxTitle,
          styles[`${statusMap.get(status)}Title`]
        )}
      >
        {title}
      </motion.h1>
      {children}
    </div>
  );
}
