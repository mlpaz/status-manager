"use client";
import styles from "./status-manager.module.css";
import { LayoutGroup, motion } from "framer-motion";
import classNames from "classnames";
import { useRef, useState } from "react";
import Card from "./Card";
import { ICard, Status } from "./interfaces";
import Column from "./Column";

export default function StatusManager({ initCards }: { initCards: ICard[] }) {
  const [cards, setCards] = useState<ICard[]>(initCards);
  const refMap = new Map<Status, any>([
    [Status.Pending, useRef()],
    [Status.InProgress, useRef()],
    [Status.Done, useRef()],
    [Status.Frozen, useRef()],
  ]);
  const pendingCards = cards?.filter((card) => card.status === Status.Pending);
  const inProgressCards = cards?.filter(
    (card) => card.status === Status.InProgress
  );
  const doneCards = cards?.filter((card) => card.status === Status.Done);
  const frozenCards = cards?.filter((card) => card.status === Status.Frozen);
  const [draggingStatus, setDraggingStatus] = useState<Status | undefined>(
    undefined
  );

  async function processCard(id: string, status: Status) {
    const editCard: ICard | undefined = cards?.find((c) => c.id === id);
    if (!editCard) return;

    if (status) {
      const newCard: ICard = { ...editCard, id, status };
      const newCards: ICard[] | undefined = cards?.filter((c) => c.id !== id);
      newCards?.unshift(newCard);
      setCards(newCards);
    }
  }

  return (
    <LayoutGroup>
      <motion.div className={styles.wrapper} layout>
        <Column
          title="Frozen"
          status={Status.Frozen}
          refMap={refMap}
          draggingStatus={draggingStatus}
        >
          {frozenCards?.map((c) => {
            return (
              <Card
                key={c.id}
                card={c}
                refMap={refMap}
                draggingStatus={draggingStatus}
                setDraggingStatus={setDraggingStatus}
                processCard={processCard}
              />
            );
          })}
        </Column>
        <Column
          title="Pending"
          status={Status.Pending}
          refMap={refMap}
          draggingStatus={draggingStatus}
        >
          {pendingCards?.map((card) => {
            return (
              <Card
                key={card.id}
                cancel={true}
                card={card}
                refMap={refMap}
                processCard={processCard}
                draggingStatus={draggingStatus}
                setDraggingStatus={setDraggingStatus}
                nextState={Status.InProgress}
              />
            );
          })}
        </Column>
        <Column
          title="In Progress"
          status={Status.InProgress}
          refMap={refMap}
          draggingStatus={draggingStatus}
        >
          {inProgressCards?.map((c) => {
            return (
              <Card
                key={c.id}
                cancel={true}
                card={c}
                refMap={refMap}
                draggingStatus={draggingStatus}
                setDraggingStatus={setDraggingStatus}
                processCard={processCard}
                nextState={Status.Done}
              />
            );
          })}
        </Column>
        <Column
          title="Done"
          status={Status.Done}
          refMap={refMap}
          draggingStatus={draggingStatus}
        >
          {doneCards?.map((c) => {
            return (
              <Card
                key={c.id}
                cancel={false}
                card={c}
                refMap={refMap}
                draggingStatus={draggingStatus}
                setDraggingStatus={setDraggingStatus}
                processCard={processCard}
              />
            );
          })}
        </Column>
      </motion.div>
    </LayoutGroup>
  );
}
