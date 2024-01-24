import { Status } from "./StatusManager/interfaces";

export const statusMap: Map<Status, string> = new Map([
  [Status.Frozen, "frozen"],
  [Status.Pending, "pending"],
  [Status.InProgress, "inProgress"],
  [Status.Done, "done"],
]);
