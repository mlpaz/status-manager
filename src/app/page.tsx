import StatusManager from "@/app/components/StatusManager";
import { CARDS } from "@/app/mock/cards";

export default function Home() {
  return (
    <>
      <h1 className="text-center m-8 text-3xl">Status Manager</h1>
      <StatusManager initCards={CARDS} />
    </>
  );
}
