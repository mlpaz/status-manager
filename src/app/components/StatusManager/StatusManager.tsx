"use client";
import styles from "./status-manager.module.css";
import { LayoutGroup, motion } from "framer-motion";
import { useState } from "react";
import Card from "./Card";
import { ICard, Status } from "./interfaces";
import Column from "./Column";

export default function StatusManager({ initCards }: { initCards: ICard[] }) {
  const [cards, setCards] = useState<ICard[]>(initCards);

  const pendingCards = cards?.filter((card) => card.status === Status.Pending);
  const inProgressCards = cards?.filter(
    (card) => card.status === Status.InProgress
  );
  const doneCards = cards?.filter((card) => card.status === Status.Done);
  const frozenCards = cards?.filter((card) => card.status === Status.Frozen);

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
        <Column title="Frozen" status={Status.Frozen}>
          {frozenCards?.map((c) => {
            return <Card key={c.id} card={c} processCard={processCard} />;
          })}
        </Column>
        <Column title="Pending" status={Status.Pending}>
          {pendingCards?.map((card) => {
            return (
              <Card
                key={card.id}
                cancel={true}
                card={card}
                processCard={processCard}
                nextState={Status.InProgress}
              />
            );
          })}
        </Column>
        <Column title="In Progress" status={Status.InProgress}>
          {inProgressCards?.map((c) => {
            return (
              <Card
                key={c.id}
                cancel={true}
                card={c}
                processCard={processCard}
                nextState={Status.Done}
              />
            );
          })}
        </Column>
        <Column title="Done" status={Status.Done}>
          {doneCards?.map((c) => {
            return (
              <Card
                key={c.id}
                cancel={false}
                card={c}
                processCard={processCard}
              />
            );
          })}
        </Column>
      </motion.div>
    </LayoutGroup>
  );
}
