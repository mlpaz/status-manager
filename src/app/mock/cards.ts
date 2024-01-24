import { ICard, Status } from "@/app/components/StatusManager/interfaces";
import { v4 as uuidv4 } from "uuid";

export const CARDS: ICard[] = [
  {
    id: uuidv4(),
    text: "Washing the dishes",
    status: Status.Pending,
    initStatus: Status.Pending,
  },
  {
    id: uuidv4(),
    text: "Walk the dog",
    status: Status.Pending,
    initStatus: Status.Pending,
  },
  {
    id: uuidv4(),
    text: "Do the shopping",
    status: Status.Pending,
    initStatus: Status.Pending,
  },
  {
    id: uuidv4(),
    text: "Sweep the floor",
    status: Status.Pending,
    initStatus: Status.Pending,
  },
  {
    id: uuidv4(),
    text: "Cook dinner",
    status: Status.Pending,
    initStatus: Status.Pending,
  },
  {
    id: uuidv4(),
    text: "Do the laundry",
    status: Status.Pending,
    initStatus: Status.Pending,
  },
  {
    id: uuidv4(),
    text: "Hanging clothes",
    status: Status.Pending,
    initStatus: Status.Pending,
  },
];
