export interface ICard {
  id: string;
  text: string;
  status: Status;
  initStatus: Status;
}

export enum Status {
  Pending = "PENDINGS",
  InProgress = "IN_PROGRESS",
  Done = "DONE",
  Frozen = "FROZEN",
}
