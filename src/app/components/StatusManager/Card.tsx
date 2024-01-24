"use client";
import styles from "./status-manager.module.css";
import { motion } from "framer-motion";
import classNames from "classnames";
import { useRef, useState } from "react";
import { ICard, Status } from "./interfaces";
import { X, ChevronRight, RefreshCcw } from "react-feather";

export default function Card({
  card,
  refMap,
  draggingStatus,
  setDraggingStatus,
  processCard,
  cancel,
  nextState,
}: {
  card: ICard;
  refMap: Map<Status, any>;
  draggingStatus: Status | undefined;
  setDraggingStatus: any;
  processCard: any;
  cancel?: boolean;
  nextState?: string;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [returnToInit, setReturnToInit] = useState(false);
  const reload = card.status !== card.initStatus;
  const cardRef: any = useRef();
  const isDraggable = ![Status.Done].includes(card.status);
  return (
    <motion.div
      transition={{
        type: "spring",
        stiffness: 600,
        damping: 60,
        restDelta: 0.01,
      }}
      ref={cardRef}
      className={classNames(
        styles.card,
        "pr-0",
        isDragging ? "ring-2 ring-blue-400" : ""
      )}
      key={card.id}
      animate={{
        x: returnToInit ? 0 : undefined,
        y: returnToInit ? 0 : undefined,
      }}
      layoutId={card.id}
      drag={isDraggable ? true : undefined}
      whileTap={{ cursor: "grabbing" }}
      onDragStart={(_, info) => {
        setReturnToInit(false);
        setIsDragging(true);
      }}
      onDragEnd={() => {
        if (draggingStatus && card.status != draggingStatus) {
          processCard(card.id, draggingStatus);
        } else {
          setReturnToInit(true);
        }
        setIsDragging(false);
        setDraggingStatus(undefined);
      }}
      onDrag={(_, info) => {
        const point = {
          x: info.point.x,
          y: info.point.y,
        };
        let hasColumn: boolean = false;
        for (let [key, ref] of refMap) {
          if (
            point.x > ref?.current?.offsetLeft &&
            point.x < ref?.current?.offsetLeft + ref?.current?.clientWidth &&
            point.y > ref?.current?.offsetTop &&
            point.y < ref?.current?.offsetTop + ref?.current?.clientHeight
          ) {
            hasColumn = true;
            if (!draggingStatus || draggingStatus !== key) {
              setDraggingStatus(key);
            }
          }
        }
        if (!hasColumn) {
          setDraggingStatus(undefined);
        }
      }}
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
