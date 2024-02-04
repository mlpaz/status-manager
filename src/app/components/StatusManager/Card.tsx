"use client";
import styles from "./status-manager.module.css";
import { motion } from "framer-motion";
import classNames from "classnames";
import { ICard, Status } from "./interfaces";
import { X, ChevronRight, RefreshCcw } from "react-feather";

export default function Card({
  card,
  processCard,
  cancel,
  nextState,
}: {
  card: ICard;
  processCard: any;
  cancel?: boolean;
  nextState?: string;
}) {
  const reload = card.status !== card.initStatus;
  return (
    <motion.div
      transition={{
        type: "spring",
        stiffness: 600,
        damping: 60,
        restDelta: 0.01,
      }}
      className={classNames(styles.card, "pr-0")}
      key={card.id}
      layoutId={card.id}
    >
      <div className="flex flex-col justify-between h-full">
        {cancel && (
          <button className="none ">
            <X
              width={15}
              height={12}
              onClick={() => processCard(card.id, Status.Frozen)}
              className="mr-1"
            />
          </button>
        )}
        {reload && (
          <button className="none ">
            <RefreshCcw
              width={15}
              height={12}
              onClick={() => processCard(card.id, card.initStatus)}
              className="mr-1"
            />
          </button>
        )}
      </div>
      <motion.div className="w-full" layout={"position"}>
        <p>{card.text}</p>
      </motion.div>
      {nextState && (
        <button className="none">
          <ChevronRight
            width={20}
            height={20}
            onClick={() => processCard(card.id, nextState)}
            className="m-auto ml-2 mr-0"
          />
        </button>
      )}
    </motion.div>
  );
}
