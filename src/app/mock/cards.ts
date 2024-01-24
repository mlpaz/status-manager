import { ICard, Status } from "@/app/components/StatusManager/interfaces";
import { v4 as uuidv4 } from "uuid";

export const CARDS: ICard[] = [
  {
    id: uuidv4(),
    text: "Lavar TODOS los platos",
    status: Status.Pending,
    initStatus: Status.Pending,
  },
  {
    id: uuidv4(),
    text: "Sacar a pasear al perro",
    status: Status.Pending,
    initStatus: Status.Pending,
  },
  {
    id: uuidv4(),
    text: "Hacer las compras",
    status: Status.Pending,
    initStatus: Status.Pending,
  },
  {
    id: uuidv4(),
    text: "Barrer el piso",
    status: Status.Pending,
    initStatus: Status.Pending,
  },
  {
    id: uuidv4(),
    text: "Cocinar la cena",
    status: Status.Pending,
    initStatus: Status.Pending,
  },
  {
    id: uuidv4(),
    text: "Lavar la ropa",
    status: Status.Pending,
    initStatus: Status.Pending,
  },
  {
    id: uuidv4(),
    text: "Colgar la ropa",
    status: Status.Pending,
    initStatus: Status.Pending,
  },
];
