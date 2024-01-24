"use client";
import styles from "./status-manager.module.css";
import { motion } from "framer-motion";
import classNames from "classnames";
import { Status } from "./interfaces";
import { statusMap } from "../constants";

export default function Column({
  status,
  refMap,
  draggingStatus,
  title,
  children,
}: {
  status: Status;
  refMap: Map<Status, any>;
  draggingStatus: Status | undefined;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={classNames(
        styles.box,
        styles[`${statusMap.get(status)}Bg`],
        draggingStatus === status ? "ring-[3px] ring-blue-500" : ""
      )}
      ref={refMap.get(status)}
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
